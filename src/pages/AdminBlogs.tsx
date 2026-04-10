import { useMemo, useState } from "react";
import {
  CalendarDays,
  ExternalLink,
  FileText,
  Filter,
  FolderOpen,
  Search,
} from "lucide-react";
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
            Blog yazilari panelden degil, repo icindeki MDX dosyalarindan
            yonetiliyor. Bu ekran operasyon takibi ve hizli kontrol amacli.
          </p>
        </div>
        <a
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          <FolderOpen className="w-5 h-5" />
          Yeni Yazi Akisi
        </a>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-950">
        <div className="flex items-start gap-3">
          <FolderOpen className="mt-0.5 h-5 w-5 text-blue-700" />
          <div className="text-sm leading-6">
            <p className="font-semibold mb-1">Repo-first MDX duzeni aktif</p>
            <p>
              Kaynak klasor <code>src/content/blog/*.mdx</code>. Burada slug,
              kategori, status, guncelleme tarihi ve public onizleme durumunu
              takip edebilirsin.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Baslik, slug veya excerpt icinde ara..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-8 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {filteredBlogs.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <FileText className="mx-auto mb-3 h-12 w-12 opacity-50" />
            <p>Aramana uyan blog yazisi bulunamadi.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Baslik
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Son Guncelleme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Dosya
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                    Onizleme
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="h-12 w-12 rounded object-cover"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">
                            {blog.title}
                          </div>
                          <div className="text-sm text-slate-500">{blog.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
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
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        {new Date(blog.updated_at).toLocaleDateString("tr-TR")}
                      </div>
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
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                          >
                            <ExternalLink className="h-4 w-4" />
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
