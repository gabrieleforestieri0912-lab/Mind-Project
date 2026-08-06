import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from './supabase-server';

export async function getAuthIdentifiers(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{ userId: string | null; userEmail: string | null }> {
  const supabase = createClient(req, res);
  const { data } = await supabase.auth.getSession();
  if (data.session?.user) {
    return { userId: data.session.user.id, userEmail: data.session.user.email || null };
  }
  return { userId: null, userEmail: null };
}
