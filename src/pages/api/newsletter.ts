import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { rateLimit } from '@/lib/rate-limit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown';
  const { ok } = rateLimit(`newsletter:${ip}`, 3, 60_000);
  if (!ok) {
    return res.status(429).json({ message: 'Troppi tentativi. Riprova tra 1 minuto.' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email richiesta.' });
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email })
    .single();

  if (error?.message?.includes('duplicate') || error?.code === '23505') {
    return res.status(200).json({ message: 'Sei già iscritto!' });
  }

  if (error) {
    console.error('Newsletter subscribe error:', error);
    return res.status(500).json({ message: 'Errore durante l\'iscrizione.' });
  }

  return res.status(200).json({ message: 'Iscrizione confermata! Riceverai novità e aggiornamenti.' });
}
