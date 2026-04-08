import BlogSection from "../components/BlogSection";
import { useBlogs } from "../hooks/useBlogs";
import Footer from "../components/Footer";
export default function Blog() {
  const { blogs, loading } = useBlogs();
  return (
    <>
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sol alan - blog listesi */}
            <div className="lg:col-span-8">
              <BlogSection
                content={{}}
                blogs={blogs}
                loading={loading}
                isMobile={false}
                getBlogBadgeColor={() => "bg-primary"}
              />
            </div>

            {/* Sağ alan - sidebar */}
            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-white/10 p-6 sticky top-24">
                Sidebar gelecek
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
