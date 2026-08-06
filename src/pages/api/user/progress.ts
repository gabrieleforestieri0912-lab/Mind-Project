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

  const { workoutProgress, mindsetLevel } = req.body;
  const updates: Record<string, number> = {};
  if (workoutProgress !== undefined) {
    updates.workout_progress = Math.min(Math.max(Number(workoutProgress), 0), 100);
  }
  if (mindsetLevel !== undefined) {
    updates.mindset_level = Math.min(Math.max(Number(mindsetLevel), 0), 5);
  }

  const { data: updatedUser } = await supabase
    .from('users')
    .update(updates)
    .eq('id', session.user.id)
    .select('id, name, email, bio, role, mindset_level, workout_progress')
    .single();

  return res.status(200).json({
    message: 'Progresso aggiornato',
    user: updatedUser ?? null,
  });
}
