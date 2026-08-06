import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase-server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const supabase = createClient(req, res);
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    return res.status(200).json({ authenticated: false });
  }

  const { data: user } = await supabase
    .from('users')
    .select('id, name, email, bio, role, subscription_type, is_vip, image, mindset_level, workout_progress')
    .eq('id', session.user.id)
    .single();

  if (!user) {
    return res.status(200).json({ authenticated: false });
  }

  return res.status(200).json({ authenticated: true, user });
}
