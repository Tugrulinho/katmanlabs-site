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
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
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
