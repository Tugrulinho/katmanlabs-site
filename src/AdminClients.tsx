import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
interface Client {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  is_active: boolean;
  sort_order: number;
}

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Clients fetch error:", error);
      return;
    }

    setClients(data || []);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("clients").insert([
      {
        name,
        logo_url: logoUrl,
        website_url: websiteUrl || null,
        is_active: isActive,
        sort_order: sortOrder,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Client add error:", error);
      return;
    }

    setName("");
    setLogoUrl("");
    setWebsiteUrl("");
    setSortOrder(0);
    setIsActive(true);

    fetchClients();
  };
  const addClient = handleAddClient;
  const updateClient = async () => {
    if (!editingId) return;

    setLoading(true);

    const { error } = await supabase
      .from("clients")
      .update({
        name,
        logo_url: logoUrl,
        website_url: websiteUrl || null,
        sort_order: sortOrder,
        is_active: isActive,
      })
      .eq("id", editingId);

    if (error) {
      console.error("Update error:", error);
      setLoading(false);
      return;
    }

    setEditingId(null);
    setName("");
    setLogoUrl("");
    setWebsiteUrl("");
    setSortOrder(0);
    setIsActive(true);

    await fetchClients();
    setLoading(false);
  };
  const handleDeleteClient = async (id: string) => {
    const { error } = await supabase.from("clients").delete().eq("id", id);

    if (error) {
      console.error("Client delete error:", error);
      return;
    }

    fetchClients();
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Referanslar</h1>

        <form onSubmit={handleAddClient} className="grid gap-4 max-w-2xl">
          <input
            type="text"
            placeholder="Firma adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />

          <input
            type="text"
            placeholder="Logo URL"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />

          <input
            type="text"
            placeholder="Website URL (opsiyonel)"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Sıra"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="border rounded-lg px-4 py-2"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Aktif
          </label>

          <button
            type="button"
            onClick={editingId ? updateClient : addClient}
            disabled={loading}
            className="bg-black text-white rounded-lg px-4 py-2"
          >
            {loading
              ? "Kaydediliyor..."
              : editingId
                ? "Güncelle"
                : "Referans Ekle"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Mevcut Referanslar</h2>

        <div className="space-y-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className="border rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div>
                <div className="font-semibold">{client.name}</div>
                <div className="text-sm text-gray-500">{client.logo_url}</div>
                <div className="text-sm text-gray-500">
                  Sıra: {client.sort_order} |{" "}
                  {client.is_active ? "Aktif" : "Pasif"}
                </div>
              </div>

              <button
                onClick={() => handleDeleteClient(client.id)}
                className="bg-red-500 text-white rounded-lg px-3 py-2"
              >
                Sil
              </button>
              <button
                onClick={() => {
                  setEditingId(client.id);
                  setName(client.name);
                  setLogoUrl(client.logo_url);
                  setWebsiteUrl(client.website_url || "");
                  setSortOrder(client.sort_order);
                  setIsActive(client.is_active);
                }}
              >
                Düzenle
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
