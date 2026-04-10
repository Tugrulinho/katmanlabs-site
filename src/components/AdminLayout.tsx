import { useState, useEffect } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { signOut } from "../lib/auth";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Package,
  Grid3x3,
  LogOut,
  Menu,
  X,
  Mail,
  FolderKanban,
  Briefcase,
} from "lucide-react";
import type { ContactMessage } from "../types/site";

type MenuGroup = {
  title: string;
  items: Array<{
    path: string;
    icon: typeof LayoutDashboard;
    label: string;
  }>;
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const unreadCount = messages.filter((message) => message.is_read === false).length;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadMessages = () => {
      fetch("/api/messages")
        .then((response) => response.json())
        .then((data) => setMessages(Array.isArray(data) ? data : []))
        .catch(() => setMessages([]));
    };

    loadMessages();
    window.addEventListener("focus", loadMessages);

    return () => {
      window.removeEventListener("focus", loadMessages);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const isMenuItemActive = (path: string) => {
    if (path === "/admin/blogs") {
      return location.pathname.startsWith("/admin/blogs");
    }

    return location.pathname === path;
  };

  const menuGroups: MenuGroup[] = [
    {
      title: "Genel",
      items: [
        {
          path: "/admin/dashboard",
          icon: LayoutDashboard,
          label: "Genel Bakis",
        },
        { path: "/admin/content", icon: Settings, label: "Site Icerigi" },
      ],
    },
    {
      title: "Icerik",
      items: [
        { path: "/admin/blogs", icon: FileText, label: "Bloglar" },
        { path: "/admin/messages", icon: Mail, label: "Mesajlar" },
        { path: "/admin/clients", icon: FolderKanban, label: "Referanslar" },
      ],
    },
    {
      title: "Kartlar",
      items: [
        { path: "/admin/services", icon: Grid3x3, label: "Hizmet Kartlari" },
        { path: "/admin/pricing", icon: Package, label: "Fiyat Kartlari" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="fixed left-0 right-0 top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg p-2 transition-colors hover:bg-slate-100 lg:hidden"
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6 text-slate-700" />
                ) : (
                  <Menu className="h-6 w-6 text-slate-700" />
                )}
              </button>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-800">Yonetim Paneli</h1>
                  <p className="text-xs text-slate-500">Operasyon ve icerik merkezi</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Cikis Yap</span>
            </button>
          </div>
        </div>
      </nav>

      <aside
        className={`
          fixed bottom-0 left-0 top-16 z-20 w-72 border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <nav className="space-y-6 p-4">
          {menuGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = isMenuItemActive(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 font-medium transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </div>

                      {item.path === "/admin/messages" && unreadCount > 0 ? (
                        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-2 text-xs font-semibold text-white">
                          {unreadCount}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-10 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <main className="pt-16 lg:pl-72">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
