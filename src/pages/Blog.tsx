import { useBlogs } from "../hooks/useBlogs";
export default function Blog() {
  const { blogs, loading } = useBlogs();
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1>Blog</h1>

      {loading ? (
        <p>yükleniyor...</p>
      ) : (
        blogs.map((b) => (
          <a
            key={b.id}
            href={`/blog/${b.slug}`}
            className="block mb-3 text-lg text-gray-900 hover:text-primary"
          >
            {b.title}
          </a>
        ))
      )}
    </div>
  );
}
