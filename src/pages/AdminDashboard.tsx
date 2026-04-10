import { Link } from "react-router-dom";
import { FileText, Eye, Calendar, TrendingUp, FolderOpen } from "lucide-react";
import { getAllBlogs } from "../lib/blogContent";

interface DashboardStats {
  total: number;
  published: number;
  drafts: number;
  thisMonth: number;
}

export default function AdminDashboard() {
  const blogs = getAllBlogs();
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const stats: DashboardStats = {
    total: blogs.length,
    published: blogs.filter((blog) => blog.status === "published").length,
    drafts: blogs.filter((blog) => blog.status === "draft").length,
    thisMonth: blogs.filter(
      (blog) => new Date(blog.published_at || blog.created_at) >= startOfMonth,
    ).length,
  };

  const recentBlogs = blogs.slice(0, 5);
  const statCards = [
    {
      label: "Toplam Yazi",
      value: stats.total,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Yayinda",
      value: stats.published,
      icon: Eye,
      color: "bg-green-500",
    },
    {
      label: "Taslak",
      value: stats.drafts,
      icon: Calendar,
      color: "bg-yellow-500",
    },
    {
      label: "Bu Ay",
      value: stats.thisMonth,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Genel Bakis</h1>
        <p className="text-slate-600">
          Bloglar artik repo icindeki MDX dosyalarindan yonetiliyor.
        </p>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-950">
        <div className="flex items-start gap-3">
          <FolderOpen className="w-5 h-5 mt-0.5 text-blue-700" />
          <div>
            <h2 className="font-semibold mb-1">Yeni blog akisi aktif</h2>
            <p className="text-sm leading-6">
              Blog govdeleri artik panel yerine <code>src/content/blog</code>{" "}
              klasorundeki <code>.mdx</code> dosyalarindan geliyor. Panel bu
              ilk fazda yalnizca takip ve kontrol icin read-only calisiyor.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Son Yazilar</h2>
            <Link
              to="/admin/blogs"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Tumunu Gor
            </Link>
          </div>
        </div>
        <div className="divide-y divide-slate-200">
          {recentBlogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Henuz blog yazisi yok.</p>
            </div>
          ) : (
            recentBlogs.map((blog) => (
              <div key={blog.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">{blog.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(blog.published_at).toLocaleDateString("tr-TR")}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">
                        {blog.category}
                      </span>
                      <span
                        className={
                          blog.status === "published"
                            ? "text-green-600 font-medium"
                            : "text-yellow-600 font-medium"
                        }
                      >
                        {blog.status === "published" ? "Yayinda" : "Taslak"}
                      </span>
                    </div>
                  </div>
                  {blog.status === "published" ? (
                    <a
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Onizle
                    </a>
                  ) : (
                    <span className="px-4 py-2 text-sm font-medium text-slate-400">
                      Taslak
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
