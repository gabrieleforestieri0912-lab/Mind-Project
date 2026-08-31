import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { createClient } from '@/lib/supabase-server';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(readable: NodeJS.ReadableStream): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : (chunk as Buffer));
  }
  return Buffer.concat(chunks);
}

function extractUser(payload: any) {
  if (!payload || typeof payload !== 'object') return { id: null };
  const record = payload.record ?? payload.user ?? payload;
  const meta = record.raw_user_meta_data ?? record.user_metadata ?? {};
  const id = record.id ?? payload.user_id ?? payload.id ?? null;
  const email = record.email ?? meta.email ?? payload.user_email ?? null;
  const name =
    meta.name ??
    meta.full_name ??
    meta.preferred_username ??
    (email ? String(email).split('@')[0] : null);
  const image = meta.avatar_url ?? meta.picture ?? record.image ?? null;
  return { id, email, name, image };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const rawBody = await getRawBody(req);
  const sig = req.headers['x-supabase-signature'] as string | undefined;
  const hookSecret = process.env.SUPABASE_AUTH_HOOK_SECRET;

  let user: { id: string | null; email?: string | null; name?: string | null; image?: string | null } | null = null;

  try {
    if (hookSecret && sig) {
      const expected = crypto
        .createHmac('sha256', hookSecret)
        .update(rawBody)
        .digest('hex');
      const provided = String(sig).replace('sha256=', '');
      const valid =
        expected.length === provided.length &&
        crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(provided));
      if (!valid) {
        return res.status(401).json({ message: 'Invalid signature' });
      }
      const payload = JSON.parse(rawBody.toString('utf8') || '{}');
      user = extractUser(payload);
    } else {
      // Client-called mode: derive the user from the session cookie (never trust the body).
      const supabase = createClient(req, res);
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const u = data.user;
        user = {
          id: u.id,
          email: u.email,
          name:
            (u.user_metadata?.name as string | undefined) ??
            (u.email ? u.email.split('@')[0] : null),
          image: (u.user_metadata?.avatar_url as string | undefined) ?? null,
        };
      }
    }
  } catch (err) {
    console.error('auth/sync error:', err);
    return res.status(400).json({ message: 'Bad request' });
  }

  if (!user?.id || !user.email) {
    return res.status(400).json({ message: 'Missing user id or email' });
  }

  const { error } = await supabaseAdmin.from('users').upsert(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );

  if (error) {
    console.error('auth/sync upsert failed:', error);
    return res.status(500).json({ message: 'Failed to sync user' });
  }

  return res.status(200).json({ status: 'ok' });
}
