import BlogSection from "../components/BlogSection";
import { useBlogs } from "../hooks/useBlogs";
export default function Blog() {
  const { blogs, loading } = useBlogs();
  return (
    <BlogSection
      content={{}}
      blogs={blogs}
      loading={loading}
      isMobile={false}
      getBlogBadgeColor={() => "bg-primary"}
    />
  );
}
