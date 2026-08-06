import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase-server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const supabase = createClient(req, res);
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    return res.status(401).json({ message: 'Utente non autenticato' });
  }

  const { name, bio } = req.body;
  const updates: Record<string, string> = {};
  if (name !== undefined) updates.name = name;
  if (bio !== undefined) updates.bio = bio;

  const { data: updatedUser } = await supabase
    .from('users')
    .update(updates)
    .eq('id', session.user.id)
    .select('id, name, email, bio, role, mindset_level, workout_progress')
    .single();

  return res.status(200).json({
    message: 'Profilo aggiornato',
    user: updatedUser ?? null,
  });
}
