import { Link } from "react-router-dom";

export default function BlogSidebar({ blogs, currentCategory }: any) {
  return (
    <div className="sticky top-24 space-y-6">
      {/* İlgili Yazılar */}
      <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-primary-dark mb-4">
          İlgili Yazılar
        </h3>

        <div className="space-y-4">
          {blogs?.slice(0, 3).map((blog: any) => (
            <Link key={blog.id} to={`/blog/${blog.slug}`} className="block">
              <p className="text-sm font-medium text-gray-900 hover:text-primary transition">
                {blog.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Kategoriler */}
      <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-primary-dark mb-4">
          Kategoriler
        </h3>

        <div className="space-y-2">
          {["Web Tasarım", "Dijital Pazarlama", "SEO", "Genel"].map((cat) => (
            <Link
              key={cat}
              to="/blog"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                cat === currentCategory
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
