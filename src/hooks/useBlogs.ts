import { getPublishedBlogIndex } from "../lib/publicSite";

export function useBlogs() {
  return {
    blogs: getPublishedBlogIndex(),
    loading: false,
    error: null,
  };
}
