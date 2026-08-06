import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase-server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createClient(req, res);
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    return res.status(401).json({ message: 'Utente non autenticato' });
  }

  if (req.method === 'GET') {
    const { data: user } = await supabase
      .from('users')
      .select('challenge_logs, created_at')
      .eq('id', session.user.id)
      .single();

    return res.status(200).json({
      challengeLogs: user?.challenge_logs || {},
      startDate: user?.created_at
        ? new Date(user.created_at).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
    });
  }

  if (req.method === 'POST') {
    const { logs } = req.body;
    await supabase
      .from('users')
      .update({ challenge_logs: logs || {} })
      .eq('id', session.user.id);

    return res.status(200).json({
      message: 'Sfida salvata su cloud',
      challengeLogs: logs || {},
    });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
