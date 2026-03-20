import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Blog } from '../lib/supabase';
import { FileText, Eye, Calendar, TrendingUp } from 'lucide-react';

interface DashboardStats {
  total: number;
  published: number;
  drafts: number;
  thisMonth: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    published: 0,
    drafts: 0,
    thisMonth: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: blogs, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const total = blogs?.length || 0;
        const published = blogs?.filter((b) => b.published_at !== null).length || 0;
        const drafts = total - published;
        const thisMonth =
          blogs?.filter((b) => new Date(b.created_at) >= startOfMonth).length || 0;

        setStats({ total, published, drafts, thisMonth });
        setRecentBlogs(blogs?.slice(0, 5) || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      label: 'Total Blogs',
      value: stats.total,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      label: 'Published',
      value: stats.published,
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      label: 'Drafts',
      value: stats.drafts,
      icon: Calendar,
      color: 'bg-yellow-500',
    },
    {
      label: 'This Month',
      value: stats.thisMonth,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's an overview of your content.</p>
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
                <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Blogs</h2>
            <Link
              to="/admin/blogs"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="divide-y divide-slate-200">
          {recentBlogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No blogs yet. Create your first blog to get started!</p>
            </div>
          ) : (
            recentBlogs.map((blog) => (
              <div key={blog.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">{blog.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(blog.created_at).toLocaleDateString('tr-TR')}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">
                        {blog.category}
                      </span>
                      {blog.published_at ? (
                        <span className="text-green-600 font-medium">Published</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">Draft</span>
                      )}
                    </div>
                  </div>
                  <Link
                    to={`/admin/blogs/edit/${blog.id}`}
                    className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
