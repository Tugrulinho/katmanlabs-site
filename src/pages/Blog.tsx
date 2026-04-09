import Navbar from "../components/Navbar";
import BlogSection from "../components/BlogSection";
import { useBlogs } from "../hooks/useBlogs";
import BlogSidebar from "../components/BlogSidebar";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import BlogCTA from "../components/BlogCTA";
export default function Blog() {
  const { categorySlug } = useParams();
  const { blogs, loading } = useBlogs();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 4;
  const navigate = useNavigate();
  const slugifyCategory = (value: string) =>
    value
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/\s+/g, "-");

  const categoryColors: Record<string, string> = {
    seo: "from-[#17385f] via-[#494880] to-[#9062ae]",
    "dijital-pazarlama": "from-[#f97316] via-[#fb7185] to-[#f43f5e]",
    "web-tasarim": "from-[#1e3a8a] via-[#3b82f6] to-[#93c5fd]",
    "sosyal-medya-yonetimi": "from-[#7e22ce] via-[#a855f7] to-[#e9d5ff]",
  };
  const currentGradient =
    categorySlug && categoryColors[categorySlug]
      ? categoryColors[categorySlug]
      : "from-[#17385f] via-[#494880] to-[#9062ae]";

  const activeCategory = categorySlug
    ? blogs.find(
        (blog: any) =>
          slugifyCategory(blog.category) === decodeURIComponent(categorySlug),
      )?.category || null
    : null;
  const filteredBlogs = categorySlug
    ? blogs.filter(
        (blog: any) =>
          slugifyCategory(blog.category) === decodeURIComponent(categorySlug),
      )
    : blogs;
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + postsPerPage,
  );
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  useEffect(() => {
    if (categorySlug) {
      const decoded = decodeURIComponent(categorySlug);
      setSelectedCategory(decoded);
    } else {
      setSelectedCategory(null);
    }
  }, [categorySlug]);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);
  useEffect(() => {
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  }, [currentPage]);
  return (
    <>
      <Navbar />

      <section className="relative pb-16 overflow-hidden">
        {/* Hero background */}
        <div
          className={`absolute inset-0 top-0 h-[340px] bg-gradient-to-br ${currentGradient}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(242,131,228,0.18),transparent_24%),radial-gradient(circle_at_bottom_center,rgba(255,255,255,0.08),transparent_30%)]" />
        </div>

        {/* Hero spacing */}
        <div className="relative z-10 pt-32">
          <div className="container mx-auto px-4">
            <div className="h-[300px]" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                SEO, Web ve Dijital Pazarlama Hakkında Blog İçerikleri
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                SEO, dijital pazarlama, web tasarım ve içerik stratejileri
                üzerine güncel yazılarımızla dijital dünyada öne çıkın.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8">
                <BlogSection
                  content={{}}
                  blogs={paginatedBlogs}
                  loading={loading}
                  isMobile={false}
                  getBlogBadgeColor={() => "bg-primary"}
                  hideHeader={true}
                />
                <div className="flex justify-center mt-10 gap-2 items-center">
                  {/* Önceki */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={`px-3 py-2 rounded-lg text-sm ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    ←
                  </button>

                  {/* Sayılar */}
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  {/* Sonraki */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={`px-3 py-2 rounded-lg text-sm ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    →
                  </button>
                </div>
                <BlogCTA gradient="from-[#17385f] to-[#9062ae]" />
              </div>

              <aside className="lg:col-span-4 self-start">
                <BlogSidebar
                  blogs={blogs}
                  currentCategory={activeCategory}
                  onCategorySelect={(category: string | null) => {
                    if (category) {
                      navigate(`/blog/kategori/${slugifyCategory(category)}`);
                    } else {
                      navigate("/blog");
                    }
                  }}
                />
              </aside>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
