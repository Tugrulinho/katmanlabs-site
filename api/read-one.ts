import { createClient } from '@supabase/supabase-js';
import type { ApiRequest, ApiResponse } from './_types';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: ApiRequest<{ id?: string }>,
  res: ApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.body || {};

    if (!id) {
      return res.status(400).json({ error: 'Message id required' });
    }

    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Update error' });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
}
