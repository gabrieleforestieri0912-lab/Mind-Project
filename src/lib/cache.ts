import type { NextApiResponse } from 'next';

export function setCacheHeaders(
  res: NextApiResponse,
  maxAge = 60,
  staleWhileRevalidate = 300
) {
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`
  );
}

export function setNoCacheHeaders(res: NextApiResponse) {
  res.setHeader(
    'Cache-Control',
    'private, no-cache, no-store, must-revalidate'
  );
}
