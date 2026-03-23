import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useBlogBySlug } from '../hooks/useBlogBySlug';
import { useBlogs } from '../hooks/useBlogs';

function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blog, loading, error } = useBlogBySlug(slug);
  const { blogs } = useBlogs();

  const getCategoryColors = (category: string) => {
    const colorSchemes: Record<string, { gradient: string; border: string; tag: string; text: string }> = {
      'Web Tasarım': {
        gradient: 'from-primary via-primary-dark to-zinc-900',
        border: 'border-primary',
        tag: 'bg-primary/20 text-primary border-primary/30',
        text: 'text-primary'
      },
      'Dijital Pazarlama': {
        gradient: 'from-secondary via-purple-800 to-zinc-900',
        border: 'border-secondary',
        tag: 'bg-secondary/20 text-secondary border-secondary/30',
        text: 'text-secondary'
      },
      'SEO': {
        gradient: 'from-accent via-purple-700 to-zinc-900',
        border: 'border-accent',
        tag: 'bg-accent/20 text-accent border-accent/30',
        text: 'text-accent'
      },
      'Genel': {
        gradient: 'from-gray-700 via-gray-800 to-zinc-900',
        border: 'border-gray-600',
        tag: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
        text: 'text-gray-600'
      }
    };
    return colorSchemes[category] || colorSchemes['Genel'];
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Tarih belirtilmemiş';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const calculateReadingTime = (content: string | null) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
          <h1 className="text-4xl font-bold text-primary-dark mb-4">Blog yazısı bulunamadı</h1>
          <p className="text-gray-600 mb-8">{error || 'Bu blog yazısı mevcut değil.'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  const colors = getCategoryColors(blog.category);
  const readingTime = calculateReadingTime(blog.content);
  const relatedBlogs = blogs.filter(b => b.id !== blog.id && b.category === blog.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className={`bg-gradient-to-br ${colors.gradient} text-white py-20 pt-32`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-accent-light hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Ana Sayfaya Dön
          </button>

          <div className="max-w-4xl">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-6 ${colors.tag}`}>
              <Tag className="w-4 h-4" />
              <span className="text-sm font-medium">{blog.category}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                {blog.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.published_at)}</span>
              </div>
              {readingTime > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} dk okuma süresi</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {blog.image_url && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <div className={`rounded-2xl overflow-hidden shadow-2xl border-4 ${colors.border}`}>
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
             {blog.content_json ? (
  <div className="text-gray-700 leading-relaxed space-y-6">
    <p className="text-lg leading-relaxed">
      {typeof blog.content_json === 'string'
        ? JSON.parse(blog.content_json).text
        : blog.content_json.text}
    </p>
  </div>
) : blog.content ? (
  <div className="text-gray-700 leading-relaxed space-y-6">
    {blog.content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="text-lg leading-relaxed">
        {paragraph}
      </p>
    ))}
  </div>
) : (
  <div className="text-center py-12 bg-gray-50 rounded-xl">
    <p className="text-gray-500">İçerik henüz eklenmemiş.</p>
  </div>
)}
            </article>

            <div className={`mt-12 p-8 bg-gradient-to-br ${colors.gradient} rounded-2xl text-white`}>
              <h3 className="text-2xl font-bold mb-4">Bu içerik size yardımcı oldu mu?</h3>
              <p className="text-gray-200 mb-6">
                Dijital dünyada başarılı olmak için profesyonel destek alın.
              </p>
              <button
                onClick={() => navigate('/#contact')}
                className="px-8 py-4 bg-white text-primary rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Bizimle İletişime Geçin
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {relatedBlogs.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className={`text-xl font-bold mb-6 ${colors.text}`}>İlgili Yazılar</h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((relatedBlog) => (
                      <Link
                        key={relatedBlog.id}
                        to={`/blog/${relatedBlog.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-4 p-3 rounded-lg hover:bg-white transition-colors">
                          <img
                            src={relatedBlog.image_url}
                            alt={relatedBlog.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-primary-dark group-hover:text-primary transition-colors line-clamp-2 mb-1">
                              {relatedBlog.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatDate(relatedBlog.published_at)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className={`p-6 rounded-2xl border-2 ${colors.border}`}>
                <h3 className="text-lg font-bold text-primary-dark mb-4">Kategoriler</h3>
                <div className="space-y-2">
                  {['Web Tasarım', 'Dijital Pazarlama', 'SEO', 'Genel'].map((cat) => (
                    <Link
                      key={cat}
                      to="/#blog-gallery"
                      className={`block px-4 py-2 rounded-lg transition-colors ${
                        cat === blog.category
                          ? `${colors.tag}`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BlogDetail;
