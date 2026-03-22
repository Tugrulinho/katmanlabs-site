import { useEffect, useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, Blog } from '../lib/supabase';
import { generateSlug } from '../lib/blogUtils';
import { Save, X, Eye, FileText } from 'lucide-react';

export default function AdminBlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    image_url: '',
    published_at: null as string | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Blog not found');

      setFormData({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        content: data.content || '',
        category: data.category,
        image_url: data.image_url,
        published_at: data.published_at,
      });
      setAutoGenerateSlug(false);
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Failed to load blog');
    }
  };

 const handleSubmit = async (e: FormEvent, publish = false) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const blogData = {
      ...formData,
      published_at: publish ? new Date().toISOString() : formData.published_at,
    };

    if (isEdit) {
      console.log('ID:', id);

      const { data, error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', id)
        .select();

      console.log('UPDATE RESULT:', data, error, id);

      if (error) {
        throw error;
      }
    } else {
      const { error } = await supabase
        .from('blogs')
        .insert([blogData]);

      if (error) {
        throw error;
      }
    }

    // navigate('/admin/blogs');
  } catch (err) {
    console.error('Error saving blog:', err);
    setError(err instanceof Error ? err.message : 'Failed to save blog');
  } finally {
    setLoading(false);
  }
};

  const categories = [
    'Sosyal Medya Yönetimi',
    'Web Tasarim',
    'SEO',
    'Dijital Pazarlama',
    'İçerik Üretimi',
    'Analitik',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {isEdit ? 'Edit Blog' : 'New Blog'}
          </h1>
          <p className="text-slate-600">
            {isEdit ? 'Update your blog post' : 'Create a new blog post'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/blogs')}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="slug" className="block text-sm font-medium text-slate-700">
                Slug *
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={autoGenerateSlug}
                  onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                  className="rounded"
                />
                Auto-generate
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
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-slate-700 mb-2">
              Image URL *
            </label>
            <input
              id="image_url"
              type="url"
              required
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="Preview"
                className="mt-3 rounded-lg max-h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Short description of the blog post"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={12}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              placeholder="Write your blog content here..."
            />
          </div>
        </div>

        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            {formData.published_at ? (
              <span className="flex items-center gap-2 text-green-600 font-medium">
                <Eye className="w-5 h-5" />
                Published
              </span>
            ) : (
              <span className="flex items-center gap-2 text-yellow-600 font-medium">
                <FileText className="w-5 h-5" />
                Draft
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
              {loading ? 'Saving...' : 'Save as Draft'}
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
            >
              <Eye className="w-5 h-5" />
              {loading ? 'Publishing...' : isEdit ? 'Update & Publish' : 'Publish'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
