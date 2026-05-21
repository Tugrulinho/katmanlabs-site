import { getPublishedBlogs } from "../lib/blogContent";

export function useBlogs() {
  return {
    blogs: getPublishedBlogs(),
    loading: false,
    error: null,
  };
}
