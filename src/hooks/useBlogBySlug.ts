import { useState, useEffect } from 'react';
import { supabase, Blog } from '../lib/supabase';

export function useBlogBySlug(slug: string | undefined) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) throw error;

        setBlog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [slug]);

  return { blog, loading, error };
}
