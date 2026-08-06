import { createServerClient } from '@supabase/ssr';
import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export function createClient(req: NextApiRequest, res: NextApiResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const entries = Object.entries(req.cookies);
          const result: { name: string; value: string }[] = [];
          for (const [name, value] of entries) {
            if (value !== undefined) {
              result.push({ name, value });
            }
          }
          return result;
        },
        setAll(cookiesToSet, _headers) {
          const setCookies: string[] = [];
          for (const { name, value, options } of cookiesToSet) {
            setCookies.push(serialize(name, value, options));
          }
          if (setCookies.length > 0) {
            res.setHeader('Set-Cookie', setCookies);
          }
        },
      },
    }
  );
}

export async function getSession(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createClient(req, res);
  const { data } = await supabase.auth.getSession();
  return data.session;
}
