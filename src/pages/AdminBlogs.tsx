import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Blog } from "../lib/supabase";
import {
  Search,
  Filter,
  Trash2,
  CreditCard as Edit,
  Eye,
  EyeOff,
  Calendar,
  PlusCircle,
} from "lucide-react";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [blogs, searchTerm, categoryFilter]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      setBlogs(result.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((blog) => blog.category === categoryFilter);
    }

    setFilteredBlogs(filtered);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/blog", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();

      console.log("DELETE API RESULT:", result);

      if (!res.ok) throw new Error(result.error);

      setBlogs(blogs.filter((blog) => blog.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const isPublished = (blog: Blog) =>
    blog.status === "published" || blog.published_at !== null;

  const togglePublish = async (blog: Blog) => {
    try {
      const nextPublishedState = !isPublished(blog);
      const newPublishedAt = nextPublishedState
        ? blog.published_at || new Date().toISOString()
        : null;
      const newStatus: Blog["status"] = nextPublishedState ? "published" : "draft";

      const { error } = await supabase
        .from("blogs")
        .update({ published_at: newPublishedAt, status: newStatus })
        .eq("id", blog.id);

      if (error) throw error;

      setBlogs(
        blogs.map((b) =>
          b.id === blog.id
            ? { ...b, published_at: newPublishedAt, status: newStatus }
            : b,
        ),
      );
    } catch (error) {
      console.error("Error toggling publish status:", error);
      alert("Failed to update blog status");
    }
  };

  const categories = ["all", ...new Set(blogs.map((b) => b.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Yazilar yukleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Bloglar</h1>
          <p className="text-slate-600">Tum blog yazilarini buradan yonetebilirsin.</p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Yeni Yazi
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Yazilarda ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Tum kategoriler" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p>Aramana uyan blog yazisi bulunamadi.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Baslik
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Islemler
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        {blog.image_url && (
                          <img
                            src={blog.image_url}
                            alt={blog.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div>
                          <div className="font-semibold text-slate-900">
                            {blog.title}
                          </div>
                          <div className="text-sm text-slate-500 line-clamp-1">
                            {blog.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {isPublished(blog) ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                          <Eye className="w-4 h-4" />
                          Yayinda
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-yellow-600 text-sm font-medium">
                          <EyeOff className="w-4 h-4" />
                          Taslak
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(blog.created_at).toLocaleDateString("tr-TR")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublish(blog)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          title={isPublished(blog) ? "Taslak yap" : "Yayinla"}
                        >
                          {isPublished(blog) ? (
                            <EyeOff className="w-4 h-4 text-slate-600" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-600" />
                          )}
                        </button>
                        <Link
                          to={`/admin/blogs/edit/${blog.id}`}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Duzenle"
                        >
                          <Edit className="w-4 h-4 text-slate-600" />
                        </Link>
                        {deleteConfirm === blog.id ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDelete(blog.id)}
                              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                            >
                              Onayla
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-3 py-1 bg-slate-200 text-slate-700 text-sm rounded hover:bg-slate-300"
                            >
                              Vazgec
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(blog.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
