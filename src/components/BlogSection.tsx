import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import type { ContentBlog } from "../lib/blogContent";
import type { ContentMap } from "../types/site";

type BlogSectionProps = {
  content: ContentMap;
  blogs: ContentBlog[];
  loading: boolean;
  isMobile: boolean;
  getBlogBadgeColor: (category: string) => string;
  hideHeader?: boolean;
};

export default function BlogSection({
  content,
  blogs,
  loading,
  isMobile,
  getBlogBadgeColor,
  hideHeader,
}: BlogSectionProps) {
  return (
    <section
      id="blog-gallery"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideHeader && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light/20 rounded-full text-primary mb-4">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">
                {content.blog_badge || "Blog & İçerikler"}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.blog_title || "Son Blog Yazılarımız"}
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.blog_description ||
                "Dijital dünyadan güncel içerikler, trendler ve ipuçları"}
            </p>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.slice(0, isMobile ? 2 : 4).map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  <span
                    className={`absolute bottom-4 left-4 px-3 py-1 text-white text-xs font-semibold rounded-full ${getBlogBadgeColor(blog.category)}`}
                  >
                    {blog.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center text-primary font-semibold">
                    Devamını Oku
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p>Henüz blog yazısı bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </section>
  );
}
