import { useEffect, useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Blog } from '../lib/supabase';
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

  // eski sistem
  content: '',
  image_url: '',

  // yeni sistem
  content_json: null as any,
  featured_image_url: '',
  meta_title: '',
  meta_description: '',
  og_image_url: '',
  status: 'draft' as 'draft' | 'published',

  category: '',
  published_at: null as string | null,
});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(true);
  const [blocks, setBlocks] = useState<
  Array<
    | { type: 'paragraph'; text: string }
    | { type: 'heading'; text: string }
    | { type: 'image'; url: string }
  >
>([
  { type: 'paragraph', text: '' },
]);

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
useEffect(() => {
  setFormData((prev) => ({
    ...prev,
    content_json: blocks,
  }));
}, [blocks]);
 const fetchBlog = async () => {
  try {
    setLoading(true);
    setError('');

    const response = await fetch(`/api/blog?id=${id}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Blog getirilemedi');
    }

    const data = result.blog;

    if (!data) {
      throw new Error('Blog not found');
    }

   setFormData({
  title: data.title || '',
  slug: data.slug || '',
  excerpt: data.excerpt || '',

  // eski sistem
  content: data.content || '',
  image_url: data.image_url || '',

  // yeni sistem
  content_json: data.content_json || null,
  featured_image_url: data.featured_image_url || '',
  meta_title: data.meta_title || '',
  meta_description: data.meta_description || '',
  og_image_url: data.og_image_url || '',
  status: data.status || 'draft',

  category: data.category || '',
  published_at: data.published_at || null,
});
// JSON varsa blocks'a aktar 
if (data.content_json) {
  try {
    const parsed =
      typeof data.content_json === 'string'
        ? JSON.parse(data.content_json)
        : data.content_json;

    if (Array.isArray(parsed)) {
      setBlocks(parsed);
    } else {
      setBlocks([parsed]);
    }
  } catch (err) {
    console.error('JSON parse hatası:', err);
  }
}
    setAutoGenerateSlug(false);
  } catch (err: any) {
    setError(err.message || 'Blog yüklenirken hata oluştu');
  } finally {
    setLoading(false);
  }
};

const handleSubmit = async (e: FormEvent, publish = false) => {
  e.preventDefault();
  setError('');
  setLoading(true);

try {
 const blogData = {
  ...formData,

  status: publish ? 'published' : formData.status,
  published_at: publish ? new Date().toISOString() : formData.published_at,

  // eski sistem şimdilik kalsın
  content: formData.content,
  image_url: formData.image_url,

  // yeni sistem
  content_json: formData.content_json,
  featured_image_url: formData.featured_image_url,
  meta_title: formData.meta_title,
  meta_description: formData.meta_description,
  og_image_url: formData.og_image_url,
};

  const res = await fetch('/api/blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      blogData,
      isEdit,
    }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error);
  }

  navigate('/admin/blogs');

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
        </div>
<div className="mt-6">
  <label className="block text-sm font-medium text-slate-700 mb-3">
    İçerik Editörü
  </label>
  <div className="space-y-4">
    {blocks.map((block, index) => (
      <div key={index} className="border border-slate-300 rounded-lg p-4 bg-slate-50">
        <div className="flex items-center gap-2 mb-3">
          <select
            value={block.type}
            onChange={(e) => {
              const newBlocks = [...blocks];
              const value = e.target.value as 'paragraph' | 'heading' | 'image';

              if (value === 'image') {
                newBlocks[index] = { type: 'image', url: '' };
              } else {
                newBlocks[index] = { type: value, text: 'text' in block ? block.text : '' };
              }

              setBlocks(newBlocks);
            }}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="paragraph">Paragraf</option>
            <option value="heading">Başlık</option>
            <option value="image">Görsel</option>
          </select>

          <button
            type="button"
            onClick={() => {
              const newBlocks = blocks.filter((_, i) => i !== index);
              setBlocks(newBlocks.length ? newBlocks : [{ type: 'paragraph', text: '' }]);
            }}
            className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
          >
            Sil
          </button>
        </div>

        {block.type === 'image' ? (
          <input
            type="text"
            value={block.url}
            onChange={(e) => {
              const newBlocks = [...blocks];
              newBlocks[index] = { ...block, url: e.target.value };
              setBlocks(newBlocks);
            }}
            placeholder="Görsel URL"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white"
          />
        ) : block.type === 'heading' ? (
          <input
            type="text"
            value={block.text}
            onChange={(e) => {
              const newBlocks = [...blocks];
              newBlocks[index] = { ...block, text: e.target.value };
              setBlocks(newBlocks);
            }}
            placeholder="Başlık metni"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-xl font-semibold"
          />
        ) : (
          <textarea
            value={block.text}
            onChange={(e) => {
              const newBlocks = [...blocks];
              newBlocks[index] = { ...block, text: e.target.value };
              setBlocks(newBlocks);
            }}
            rows={5}
            placeholder="Paragraf metni"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white"
          />
        )}
      </div>
    ))}
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
