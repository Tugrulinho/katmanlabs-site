import Navbar from "../components/Navbar";
import BlogSection from "../components/BlogSection";
import { useBlogs } from "../hooks/useBlogs";
import { useState } from "react";
import BlogSidebar from "../components/BlogSidebar";
import Footer from "../components/Footer";

export default function Blog() {
  const { blogs, loading } = useBlogs();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog: any) => blog.category === selectedCategory)
    : blogs;

  return (
    <>
      <Navbar />

      <section className="relative pb-16 overflow-hidden">
        {/* Hero background */}
        <div className="absolute inset-x-0 top-0 h-[340px] bg-gradient-to-br from-[#17385f] via-[#494880] to-[#9062ae]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(242,131,228,0.18),transparent_24%),radial-gradient(circle_at_bottom_center,rgba(255,255,255,0.08),transparent_30%)]" />
        </div>

        {/* Hero spacing */}
        <div className="relative z-10 pt-32">
          <div className="container mx-auto px-4">
            <div className="h-[140px]" />
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
                  blogs={filteredBlogs}
                  loading={loading}
                  isMobile={false}
                  getBlogBadgeColor={() => "bg-primary"}
                  hideHeader={true}
                />
              </div>

              <aside className="lg:col-span-4 self-start">
                <BlogSidebar
                  blogs={blogs}
                  currentCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
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
