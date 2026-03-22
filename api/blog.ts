import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, blogData, isEdit } = req.body;

  try {
    if (isEdit) {
      const { error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', id);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('blogs')
        .insert([blogData]);

      if (error) throw error;
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
