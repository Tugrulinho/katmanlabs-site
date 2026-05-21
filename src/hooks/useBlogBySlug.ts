import { useEffect, useState } from "react";
import { getBlogBySlug, isSummaryFallback, loadBlogBySlug, type ContentBlog } from "../lib/blogContent";

export function useBlogBySlug(slug: string | undefined) {
  const [blog, setBlog] = useState<ContentBlog | null>(() =>
    slug ? getBlogBySlug(slug) : null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentLoading, setContentLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!slug) {
      setBlog(null);
      setLoading(false);
      setContentLoading(false);
      setError(null);
      return () => {
        isMounted = false;
      };
    }

    const cachedBlog = getBlogBySlug(slug);
    if (cachedBlog && !isSummaryFallback(cachedBlog)) {
      setBlog(cachedBlog);
      setError(null);
      setLoading(false);
      setContentLoading(false);
      return () => {
        isMounted = false;
      };
    }

    if (cachedBlog && isSummaryFallback(cachedBlog)) {
      setBlog(cachedBlog);
      setContentLoading(true);
      setError(null);
    } else {
      setLoading(true);
    }

    loadBlogBySlug(slug)
      .then((resolvedBlog) => {
        if (!isMounted) {
          return;
        }

        if (resolvedBlog) {
          setBlog(resolvedBlog);
          setError(null);
        } else {
          setError("Blog bulunamadi.");
        }
      })
      .catch((loadError) => {
        if (!isMounted) {
          return;
        }

        console.error(loadError);
        setError("Icerik yuklenemedi, sayfayi yenilemeyi deneyin.");
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
          setContentLoading(false);
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
      contentLoading: false,
    };
  }

  return {
    blog,
    loading,
    error,
    contentLoading,
  };
}
