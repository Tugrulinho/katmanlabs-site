import { useEffect, useState } from "react";
import { getBlogBySlug, loadBlogBySlug, type ContentBlog } from "../lib/blogContent";

export function useBlogBySlug(slug: string | undefined) {
  const [blog, setBlog] = useState<ContentBlog | null>(() =>
    slug ? getBlogBySlug(slug) : null,
  );
  const [loading, setLoading] = useState(Boolean(slug) && !blog);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!slug) {
      setBlog(null);
      setLoading(false);
      setError(null);
      return () => {
        isMounted = false;
      };
    }

    const cachedBlog = getBlogBySlug(slug);
    if (cachedBlog) {
      setBlog(cachedBlog);
      setError(null);

      if (cachedBlog.Content && cachedBlog.content) {
        setLoading(false);
        return () => {
          isMounted = false;
        };
      }
    }

    setLoading(!cachedBlog);
    loadBlogBySlug(slug)
      .then((resolvedBlog) => {
        if (!isMounted) {
          return;
        }

        setBlog(resolvedBlog);
        setError(resolvedBlog ? null : "Blog bulunamadi.");
      })
      .catch((loadError) => {
        if (!isMounted) {
          return;
        }

        console.error(loadError);
        setBlog(null);
        setError("Blog yuklenemedi.");
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!slug) {
    return {
      blog: null,
      loading: false,
      error: null,
    };
  }

  return {
    blog,
    loading,
    error,
  };
}
