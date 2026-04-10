import { useEffect, useMemo, useState } from "react";
import {
  ImagePlus,
  Loader2,
  PencilLine,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { supabase } from "./lib/supabase";
import type { ClientRecord } from "./types/site";

type ClientFormState = {
  name: string;
  websiteUrl: string;
  sortOrder: number;
  isActive: boolean;
  logoUrl: string;
};

const initialFormState: ClientFormState = {
  name: "",
  websiteUrl: "",
  sortOrder: 0,
  isActive: true,
  logoUrl: "",
};

export default function AdminClients() {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [formState, setFormState] = useState<ClientFormState>(initialFormState);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const sortedClients = useMemo(
    () =>
      [...clients].sort(
        (leftClient, rightClient) => leftClient.sort_order - rightClient.sort_order,
      ),
    [clients],
  );

  const fetchClients = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Clients fetch error:", error);
      setFetching(false);
      return;
    }

    setClients((data as ClientRecord[]) || []);
    setFetching(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const resetForm = () => {
    setFormState(initialFormState);
    setLogoFile(null);
    setEditingId(null);
  };

  const updateFormField = <K extends keyof ClientFormState>(
    field: K,
    value: ClientFormState[K],
  ) => {
    setFormState((previousState) => ({
      ...previousState,
      [field]: value,
    }));
  };

  const uploadLogoIfNeeded = async () => {
    if (!logoFile) {
      return formState.logoUrl;
    }

    const fileName = `${Date.now()}-${logoFile.name}`;
    const filePath = `clients/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("assets")
      .upload(filePath, logoFile, {
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from("assets").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formState.name.trim()) {
      return;
    }

    setLoading(true);

    try {
      const resolvedLogoUrl = await uploadLogoIfNeeded();

      if (!resolvedLogoUrl) {
        throw new Error("Lutfen once bir logo secin.");
      }

      const payload = {
        name: formState.name.trim(),
        logo_url: resolvedLogoUrl,
        website_url: formState.websiteUrl.trim() || null,
        is_active: formState.isActive,
        sort_order: formState.sortOrder,
      };

      const query = editingId
        ? supabase.from("clients").update(payload).eq("id", editingId)
        : supabase.from("clients").insert([payload]);

      const { error } = await query;

      if (error) {
        throw error;
      }

      resetForm();
      await fetchClients();
    } catch (error) {
      console.error("Client save error:", error);
      alert(error instanceof Error ? error.message : "Referans kaydedilemedi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (id: string) => {
    const shouldDelete = window.confirm("Bu referansi silmek istiyor musun?");
    if (!shouldDelete) {
      return;
    }

    const { error } = await supabase.from("clients").delete().eq("id", id);

    if (error) {
      console.error("Client delete error:", error);
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    fetchClients();
  };

  const startEditing = (client: ClientRecord) => {
    setEditingId(client.id);
    setLogoFile(null);
    setFormState({
      name: client.name,
      websiteUrl: client.website_url || "",
      sortOrder: client.sort_order,
      isActive: client.is_active,
      logoUrl: client.logo_url,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentPreview = logoFile ? URL.createObjectURL(logoFile) : formState.logoUrl;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Referanslar</h1>
          <p className="text-slate-600 mt-2">
            Ana sayfadaki logo alanlarini, sira bilgisini ve aktif durumunu buradan
            yonetebilirsin.
          </p>
        </div>
        <button
          onClick={fetchClients}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Yenile
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {editingId ? "Referansi Duzenle" : "Yeni Referans Ekle"}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Logo upload-first akisi ile calisir. Duzenlemede yeni logo
                yuklemezsen mevcut logo korunur.
              </p>
            </div>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
                Vazgec
              </button>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Firma Adi</label>
            <input
              type="text"
              value={formState.name}
              onChange={(event) => updateFormField("name", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Website URL</label>
            <input
              type="url"
              value={formState.websiteUrl}
              onChange={(event) =>
                updateFormField("websiteUrl", event.target.value)
              }
              placeholder="https://ornek.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">
                Gosterim Sirasi
              </label>
              <input
                type="number"
                value={formState.sortOrder}
                onChange={(event) =>
                  updateFormField("sortOrder", Number(event.target.value))
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <label className="flex items-end gap-3 rounded-lg border border-slate-200 px-4 py-3">
              <input
                type="checkbox"
                checked={formState.isActive}
                onChange={(event) =>
                  updateFormField("isActive", event.target.checked)
                }
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                <span className="block text-sm font-semibold text-slate-900">
                  Aktif
                </span>
                <span className="block text-xs text-slate-500">
                  Ana sayfada gorunsun
                </span>
              </span>
            </label>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-900">Logo</label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm font-medium text-slate-600 hover:border-blue-400 hover:bg-blue-50">
              <ImagePlus className="w-5 h-5" />
              <span>PNG veya SVG yukle</span>
              <input
                type="file"
                accept="image/png,image/svg+xml"
                onChange={(event) => setLogoFile(event.target.files?.[0] || null)}
                className="hidden"
              />
            </label>

            {currentPreview ? (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-3">
                  Onizleme
                </div>
                <div className="flex h-24 items-center justify-center rounded-lg bg-slate-50 p-4">
                  <img
                    src={currentPreview}
                    alt={formState.name || "Logo onizleme"}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Kaydediliyor...
              </>
            ) : editingId ? (
              <>
                <Save className="w-4 h-4" />
                Referansi Guncelle
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Referans Ekle
              </>
            )}
          </button>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Mevcut Referanslar
            </h2>
          </div>

          {fetching ? (
            <div className="flex items-center justify-center p-10">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          ) : sortedClients.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              Henuz referans eklenmemis.
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {sortedClients.map((client) => (
                <div
                  key={client.id}
                  className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-slate-50 p-3">
                      <img
                        src={client.logo_url}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-900">
                          {client.name}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            client.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {client.is_active ? "Aktif" : "Pasif"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        Sira: {client.sort_order}
                      </p>
                      {client.website_url ? (
                        <a
                          href={client.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-sm text-blue-600 hover:text-blue-700"
                        >
                          {client.website_url}
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEditing(client)}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <PencilLine className="w-4 h-4" />
                      Duzenle
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClient(client.id)}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
