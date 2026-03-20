import { useState, useEffect } from 'react';
import { supabase, Blog } from '../lib/supabase';

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('updated_at', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) throw error;

        setBlogs(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
}
