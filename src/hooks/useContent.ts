import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SiteContent {
  id: string;
  key: string;
  value: string;
  type: string;
  page: string;
  label: string;
  description: string | null;
  updated_at: string;
  created_at: string;
}

export function useContent(page?: string) {
  const [content, setContent] = useState<Record<string, string>>({});
  const [allContent, setAllContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, [page]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      let query = supabase.from('site_content').select('*');

      if (page) {
        query = query.eq('page', page);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      if (data) {
        setAllContent(data);
        const contentMap: Record<string, string> = {};
        data.forEach((item) => {
          contentMap[item.key] = item.value;
        });
        setContent(contentMap);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (key: string, value: string) => {
    try {
      const { error: updateError } = await supabase
        .from('site_content')
        .update({ value })
        .eq('key', key);

      if (updateError) throw updateError;

      setContent((prev) => ({ ...prev, [key]: value }));
      await fetchContent();
      return { success: true };
    } catch (err) {
      console.error('Error updating content:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update content' };
    }
  };

  const getContent = (key: string, fallback: string = '') => {
    return content[key] || fallback;
  };

  return {
    content,
    allContent,
    loading,
    error,
    updateContent,
    getContent,
    refetch: fetchContent,
  };
}
