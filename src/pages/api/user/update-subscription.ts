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

  const { service } = req.body;
  if (!service) {
    return res.status(400).json({ message: 'Servizio non specificato' });
  }

  const serviceName = String(service).toUpperCase();
  const updates: Record<string, unknown> = {};
  if (serviceName.includes('VIP')) {
    updates.subscription_type = 'vip';
    updates.is_vip = true;
  } else if (serviceName.includes('BUSINESS')) {
    updates.subscription_type = 'vip';
    updates.is_vip = true;
  } else {
    updates.subscription_type = 'standard';
    updates.is_vip = false;
  }

  const { data: updatedUser } = await supabase
    .from('users')
    .update(updates)
    .eq('id', session.user.id)
    .select('id, name, email, bio, role, subscription_type, is_vip, mindset_level, workout_progress, image')
    .single();

  return res.status(200).json({
    message: 'Abbonamento aggiornato',
    user: updatedUser ?? null,
  });
}
