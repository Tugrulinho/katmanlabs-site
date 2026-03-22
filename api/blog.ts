import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  // 🔹 GET → blog getir
  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Blog id gerekli' });
      }

      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        return res.status(404).json({ error: 'Blog bulunamadı' });
      }

      return res.status(200).json({ blog: data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // 🔹 POST → create / update
  if (req.method === 'POST') {
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

  // 🔹 diğer methodlar
  return res.status(405).json({ error: 'Method not allowed' });
}
