import type { NextApiRequest, NextApiResponse } from 'next';

// NextAuth removed — using Supabase Auth exclusively.
export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.status(404).json({ error: 'NextAuth is no longer in use. Use Supabase Auth instead.' });
}
