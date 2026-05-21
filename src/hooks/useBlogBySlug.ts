import { getBlogBySlug } from "../lib/blogContent";

export function useBlogBySlug(slug: string | undefined) {
  if (!slug) {
    return {
      blog: null,
      loading: false,
      error: null,
    };
  }

  const blog = getBlogBySlug(slug);

  return {
    blog,
    loading: false,
    error: blog ? null : "Blog bulunamadi.",
  };
}
