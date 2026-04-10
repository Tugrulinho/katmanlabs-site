import RichTextEditor from "../RichTextEditor";
import { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateSlug } from "../lib/blogUtils";
import { Save, X, Eye, FileText } from "lucide-react";

export default function AdminBlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    featured_image_url: "",
    meta_title: "",
    meta_description: "",
    og_image_url: "",
    status: "draft" as "draft" | "published",
    category: "",
    published_at: null as string | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(true);

  useEffect(() => {
    if (isEdit) {
      fetchBlog();
    }
  }, [id]);

  useEffect(() => {
    if (autoGenerateSlug && formData.title) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
    }
  }, [formData.title, autoGenerateSlug]);

  const isPublished =
    formData.status === "published" || formData.published_at !== null;

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/blog?id=${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Blog getirilemedi");
      }

      const data = result.blog;

      if (!data) {
        throw new Error("Blog bulunamadi");
      }

      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        image_url: data.image_url || "",
        featured_image_url: data.featured_image_url || "",
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        og_image_url: data.og_image_url || "",
        status: data.status || (data.published_at ? "published" : "draft"),
        category: data.category || "",
        published_at: data.published_at || null,
      });

      setAutoGenerateSlug(false);
    } catch (err: any) {
      setError(err.message || "Blog yuklenirken bir hata olustu");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    e: FormEvent,
    nextStatus: "draft" | "published" = "draft",
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const publishedAt =
        nextStatus === "published"
          ? formData.published_at || new Date().toISOString()
          : null;

      const blogData = {
        ...formData,
        status: nextStatus,
        published_at: publishedAt,
        content: formData.content,
        image_url: formData.image_url,
        featured_image_url: formData.featured_image_url,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        og_image_url: formData.og_image_url,
      };

      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          blogData,
          isEdit,
        }),
      });

      const text = await res.text();
      const result = text ? JSON.parse(text) : {};

      if (!res.ok) {
        throw new Error(result.error);
      }

      navigate("/admin/blogs");
    } catch (err) {
      console.error("Error saving blog:", err);
      setError(err instanceof Error ? err.message : "Blog kaydedilemedi");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Sosyal Medya Yonetimi",
    "Web Tasarim",
    "SEO",
    "Dijital Pazarlama",
    "Icerik Uretimi",
    "Analitik",
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {isEdit ? "Blogu Duzenle" : "Yeni Blog Yazisi"}
          </h1>
          <p className="text-slate-600">
            {isEdit
              ? "Blog yazisini guncelle."
              : "Yeni bir blog yazisi olustur."}
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/blogs")}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
          Geri Don
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e, "draft")} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Baslik *
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Blog basligini gir"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-slate-700"
              >
                Slug *
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={autoGenerateSlug}
                  onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                  className="rounded"
                />
                Otomatik olustur
              </label>
            </div>
            <input
              id="slug"
              type="text"
              required
              value={formData.slug}
              onChange={(e) => {
                setFormData({ ...formData, slug: e.target.value });
                setAutoGenerateSlug(false);
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="blog-url-slug"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Kategori *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Kategori sec</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="image_url"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Gorsel URL *
            </label>
            <input
              id="image_url"
              type="url"
              required
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="Preview"
                className="mt-3 rounded-lg max-h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>

          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Ozet
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Blog yazisi icin kisa bir aciklama"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Icerik
            </label>
            <RichTextEditor
              content={formData.content}
              onChange={(value: string) =>
                setFormData({ ...formData, content: value })
              }
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">SEO Ayarlari</h2>
            <p className="text-sm text-slate-500 mt-1">
              Bu alanlar bos kalirsa sistem blog basligi ve excerpt bilgisini
              kullanir.
            </p>
          </div>

          <div>
            <label
              htmlFor="meta_title"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Meta Title
            </label>
            <input
              id="meta_title"
              type="text"
              value={formData.meta_title}
              onChange={(e) =>
                setFormData({ ...formData, meta_title: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Google sonucunda gorunecek baslik"
            />
            <p className="mt-2 text-xs text-slate-500">
              {formData.meta_title.length}/60 karakter
            </p>
          </div>

          <div>
            <label
              htmlFor="meta_description"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Meta Description
            </label>
            <textarea
              id="meta_description"
              value={formData.meta_description}
              onChange={(e) =>
                setFormData({ ...formData, meta_description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Google sonucunda gorunecek aciklama"
            />
            <p className="mt-2 text-xs text-slate-500">
              {formData.meta_description.length}/160 karakter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="featured_image_url"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Featured Image URL
              </label>
              <input
                id="featured_image_url"
                type="url"
                value={formData.featured_image_url}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    featured_image_url: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Opsiyonel kapak veya SEO gorseli"
              />
            </div>

            <div>
              <label
                htmlFor="og_image_url"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                OG Image URL
              </label>
              <input
                id="og_image_url"
                type="url"
                value={formData.og_image_url}
                onChange={(e) =>
                  setFormData({ ...formData, og_image_url: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sosyal paylasim gorseli"
              />
            </div>
          </div>

          {(formData.og_image_url || formData.featured_image_url) && (
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">
                SEO Gorsel Onizlemesi
              </p>
              <img
                src={formData.og_image_url || formData.featured_image_url}
                alt="SEO preview"
                className="rounded-lg max-h-48 object-cover border border-slate-200"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            {isPublished ? (
              <span className="flex items-center gap-2 text-green-600 font-medium">
                <Eye className="w-5 h-5" />
                Yayinda
              </span>
            ) : (
              <span className="flex items-center gap-2 text-yellow-600 font-medium">
                <FileText className="w-5 h-5" />
                Taslak
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 text-white font-medium rounded-lg transition-colors"
            >
              <Save className="w-5 h-5" />
              {loading ? "Kaydediliyor..." : "Taslak Kaydet"}
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit(e, "published")}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
            >
              <Eye className="w-5 h-5" />
              {loading
                ? "Yayina aliniyor..."
                : isEdit
                  ? "Guncelle ve Yayinla"
                  : "Yayinla"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
