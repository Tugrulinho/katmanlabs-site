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
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              SEO, Web ve Dijital Pazarlama Hakkında Blog İçerikleri
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl text-center mx-auto">
              SEO, dijital pazarlama, web tasarım ve içerik stratejileri üzerine
              güncel yazılarımızla dijital dünyada öne çıkın.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sol alan - blog listesi */}
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

            {/* Sağ alan - sidebar */}
            <aside className="lg:col-span-4 self-start">
              <BlogSidebar
                blogs={blogs}
                currentCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
