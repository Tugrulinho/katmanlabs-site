import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Eye,
  FileText,
  FolderOpen,
  Mail,
  TrendingUp,
} from "lucide-react";
import { getAllBlogs } from "../lib/blogContent";
import type { ContactMessage } from "../types/site";

interface DashboardStats {
  total: number;
  published: number;
  drafts: number;
  thisMonth: number;
}

export default function AdminDashboard() {
  const blogs = getAllBlogs();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  useEffect(() => {
    fetch("/api/messages")
      .then((response) => response.json())
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch(() => setMessages([]));
  }, []);

  const stats: DashboardStats = {
    total: blogs.length,
    published: blogs.filter((blog) => blog.status === "published").length,
    drafts: blogs.filter((blog) => blog.status === "draft").length,
    thisMonth: blogs.filter(
      (blog) => new Date(blog.published_at || blog.created_at) >= startOfMonth,
    ).length,
  };

  const recentBlogs = blogs.slice(0, 5);
  const recentMessages = messages.slice(0, 5);
  const unreadCount = messages.filter((message) => !message.is_read).length;

  const seoWarnings = useMemo(() => {
    return blogs.filter(
      (blog) =>
        !blog.meta_title?.trim() ||
        !blog.meta_description?.trim() ||
        !blog.og_image_url?.trim() ||
        !blog.image_url?.trim(),
    );
  }, [blogs]);

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
      icon: FolderOpen,
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
          Bloglar repo icindeki MDX dosyalarindan, operasyon verileri ise
          Supabase uzerinden yonetiliyor.
        </p>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-950">
        <div className="flex items-start gap-3">
          <FolderOpen className="w-5 h-5 mt-0.5 text-blue-700" />
          <div>
            <h2 className="font-semibold mb-1">Yeni blog akisi aktif</h2>
            <p className="text-sm leading-6">
              Blog govdeleri panel yerine <code>src/content/blog</code> icindeki{" "}
              <code>.mdx</code> dosyalarindan geliyor. Panel bu asamada
              operasyon, kontrol ve hizli rehber gorevi goruyor.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="mb-1 text-sm font-medium text-slate-600">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900">Son Yazilar</h2>
            <Link
              to="/admin/blogs"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Tumunu Gor
            </Link>
          </div>
          <div className="divide-y divide-slate-200">
            {recentBlogs.map((blog) => (
              <div key={blog.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {blog.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                      {blog.excerpt}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span>{new Date(blog.updated_at).toLocaleDateString("tr-TR")}</span>
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium">
                        {blog.category}
                      </span>
                      <span
                        className={
                          blog.status === "published"
                            ? "font-medium text-green-600"
                            : "font-medium text-yellow-600"
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
                      className="rounded-lg px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                    >
                      Onizle
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900">Son Mesajlar</h2>
              <Link
                to="/admin/messages"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Mesajlara Git
              </Link>
            </div>
            <div className="space-y-4 p-6">
              <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">{unreadCount}</span>{" "}
                okunmamis mesaj var.
              </div>
              {recentMessages.length === 0 ? (
                <p className="text-sm text-slate-500">Henuz mesaj bulunmuyor.</p>
              ) : (
                recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="rounded-lg border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">
                          {message.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {message.email}
                        </div>
                      </div>
                      <Mail
                        className={`h-4 w-4 ${
                          message.is_read ? "text-slate-300" : "text-blue-600"
                        }`}
                      />
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                      {message.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 shadow-sm">
            <div className="border-b border-amber-200 p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-amber-950">
                <AlertTriangle className="h-5 w-5" />
                SEO / Frontmatter Uyarilari
              </h2>
            </div>
            <div className="space-y-3 p-6">
              {seoWarnings.length === 0 ? (
                <p className="text-sm text-amber-950">
                  Tum bloglarda temel SEO alanlari dolu gorunuyor.
                </p>
              ) : (
                seoWarnings.slice(0, 5).map((blog) => (
                  <div
                    key={blog.id}
                    className="rounded-lg border border-amber-200 bg-white p-4"
                  >
                    <div className="font-semibold text-slate-900">{blog.title}</div>
                    <p className="mt-1 text-sm text-slate-600">{blog.slug}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
