import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://mind-prjct.vercel.app';

const pages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/services', priority: '0.9', changefreq: 'monthly' },
  { url: '/services/mind-project', priority: '0.9', changefreq: 'monthly' },
  { url: '/services/mind-project-vip', priority: '0.9', changefreq: 'monthly' },
  { url: '/services/business-protocol', priority: '0.9', changefreq: 'monthly' },
  { url: '/services/hell-room', priority: '0.4', changefreq: 'monthly' },
  { url: '/habit/challenge', priority: '0.8', changefreq: 'weekly' },
  { url: '/mind-project/chiamate', priority: '0.7', changefreq: 'weekly' },
  { url: '/contacts', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { url: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const lastmod = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.status(200).send(sitemap);
}
