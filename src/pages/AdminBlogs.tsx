import { useMemo, useState } from "react";
import { Search, Filter, ExternalLink, FolderOpen, FileText } from "lucide-react";
import { getAllBlogs } from "../lib/blogContent";

export default function AdminBlogs() {
  const blogs = getAllBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = useMemo(
    () => ["all", ...new Set(blogs.map((blog) => blog.category))],
    [blogs],
  );

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        !searchTerm ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.slug.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || blog.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, categoryFilter, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Bloglar</h1>
          <p className="text-slate-600">
            Blog yazilari artik panelden degil, repo icindeki MDX dosyalarindan
            yonetiliyor.
          </p>
        </div>
        <a
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <FolderOpen className="w-5 h-5" />
          Yeni Yazi Rehberi
        </a>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-950">
        <div className="flex items-start gap-3">
          <FolderOpen className="w-5 h-5 mt-0.5 text-blue-700" />
          <div className="text-sm leading-6">
            <p className="font-semibold mb-1">Read-only moda gecildi</p>
            <p>
              Aktif dosya kaynagi <code>src/content/blog/*.mdx</code>. Bu
              ekranda listeyi kontrol edebilir, public onizlemeyi acabilir ve
              kategori/slug durumlarini takip edebilirsin.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Yazilarda ara..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "Tum kategoriler" : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
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
                    Dosya
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Onizleme
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">
                            {blog.title}
                          </div>
                          <div className="text-sm text-slate-500 line-clamp-1">
                            {blog.slug}
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
                      <span
                        className={`inline-flex items-center gap-1 text-sm font-medium ${
                          blog.status === "published"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {blog.status === "published" ? "Yayinda" : "Taslak"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {blog.filePath.replace("../content/blog/", "src/content/blog/")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        {blog.status === "published" ? (
                          <a
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Ac
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400">
                            Taslak
                          </span>
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
