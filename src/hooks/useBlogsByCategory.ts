import { getPublishedBlogs } from "../lib/blogContent";

export function useBlogsByCategory(category: string) {
  const blogs = getPublishedBlogs().filter((blog) =>
    blog.category.toLowerCase().includes(category.trim().toLowerCase()),
  );

  return {
    blogs,
    loading: false,
    error: null,
  };
}
