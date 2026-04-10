import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;

  // ESKİ (geri uyumluluk için kalıyor)
  content: string | null;
  image_url: string;

  // YENİ SİSTEM
  content_json: unknown | null;
  featured_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  status: 'draft' | 'published';

  category: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
