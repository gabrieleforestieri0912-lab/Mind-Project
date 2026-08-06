import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase-server';
import { rateLimit } from '@/lib/rate-limit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown';
  const { ok, remaining } = rateLimit(`login:${ip}`, 5, 60_000);
  if (!ok) {
    res.setHeader('X-RateLimit-Remaining', String(remaining));
    return res.status(429).json({ message: 'Troppi tentativi. Riprova tra 1 minuto.' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e password richieste' });
  }

  const supabase = createClient(req, res);
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ message: error.message });
  }

  return res.status(200).json({
    message: 'Login effettuato',
    user: data.user,
  });
}
