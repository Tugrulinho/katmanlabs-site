import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { signOut } from '../lib/auth';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Settings,
  Package,
  Grid3x3,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
  fetch('/api/messages')
    .then(res => res.json())
    .then(data => setMessages(data));
}, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/blogs', icon: FileText, label: 'Blog Management' },
    { path: '/admin/blogs/new', icon: PlusCircle, label: 'New Blog' },
    { path: '/admin/content', icon: Settings, label: 'Site Content' },
    { path: '/admin/services', icon: Grid3x3, label: 'Service Cards' },
    { path: '/admin/pricing', icon: Package, label: 'Pricing Cards' },
    { path: '/admin/messages', icon: FileText, label: 'Mesajlar' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b border-slate-200 fixed top-0 left-0 right-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {sidebarOpen ? (
                  <X className="w-6 h-6 text-slate-700" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-700" />
                )}
              </button>
              <h1 className="text-xl font-bold text-slate-800">Admin Panel</h1>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      <aside
        className={`
          fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-20 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium
                  ${isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="pt-16 lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <>
          <Outlet />

<div style={{ padding: '20px' }}>
  <h2>Mesajlar</h2>

 {messages.length === 0 ? (
  <p>Henüz mesaj yok</p>
) : (
  messages.map((msg) => (
    <div key={msg.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
      <p><b>İsim:</b> {msg.name}</p>
      <p><b>Email:</b> {msg.email}</p>
      <p><b>Telefon:</b> {msg.phone}</p>
      <p><b>Hizmet:</b> {msg.service}</p>
      <p><b>Mesaj:</b> {msg.message}</p>
    </div>
  ))
)}
</div>
            </>
        </div>
      </main>
    </div>
  );
}
