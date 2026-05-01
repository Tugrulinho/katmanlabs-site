import { getPublishedBlogIndex } from "../lib/publicSite";

export function useBlogsByCategory(category: string) {
  const blogs = getPublishedBlogIndex().filter((blog) =>
    blog.category.toLowerCase().includes(category.trim().toLowerCase()),
  );

  return {
    blogs,
    loading: false,
    error: null,
  };
}
