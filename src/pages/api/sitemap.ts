import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://mind-project.com';

const pages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/mind-project/chiamate', priority: '0.8', changefreq: 'weekly' },
  { url: '/homepage/services', priority: '0.9', changefreq: 'monthly' },
  { url: '/homepage/contacts', priority: '0.7', changefreq: 'monthly' },
  { url: '/homepage/faq', priority: '0.6', changefreq: 'monthly' },
  { url: '/homepage/login', priority: '0.5', changefreq: 'yearly' },
  { url: '/homepage/signup', priority: '0.5', changefreq: 'yearly' },
  { url: '/habit/challenge', priority: '0.8', changefreq: 'weekly' },
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
