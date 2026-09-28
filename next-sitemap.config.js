// Paths guarded by src/proxy.ts: anonymous visitors are redirected to /login
// (which is noindex). Redirected URLs must never be listed in a sitemap, so
// they are excluded here.
//
// They are deliberately NOT blocked in robots.txt: several of them are linked
// from the public navbar, so Google discovers them anyway. Blocking them would
// hide the 307 -> /login (noindex) signal and produce "Indexed, though blocked
// by robots.txt". Letting them be crawled and redirected is the cleaner way to
// keep them out of the index.
const PRIVATE_PATHS = [
  '/profile',
  '/settings',
  '/academy/*',
  '/mind-project/*',
  '/habit/*',
  '/payment/*',
];

// Crawl priorities per route. Routes not listed here fall back to the
// top-level changefreq/priority below.
const ROUTE_HINTS = {
  '/': { priority: 1.0, changefreq: 'weekly' },
  '/services': { priority: 0.9, changefreq: 'monthly' },
  '/services/mind-project': { priority: 0.9, changefreq: 'monthly' },
  '/services/mind-project-vip': { priority: 0.9, changefreq: 'monthly' },
  '/services/business-protocol': { priority: 0.9, changefreq: 'monthly' },
  '/contacts': { priority: 0.7, changefreq: 'monthly' },
  '/privacy-policy': { priority: 0.3, changefreq: 'yearly' },
  '/terms-of-service': { priority: 0.3, changefreq: 'yearly' },
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mind-prjct.vercel.app',
  generateRobotsTxt: true, // (optional)
  changefreq: 'monthly',
  priority: 0.5,
  autoLastmod: true,
  exclude: [
    '/api/*',
    '/auth/*',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/onboarding',
    // 301-redirects to /privacy-policy (see next.config.mjs)
    '/terms',
    // Rendered with noIndex in src/pages/services/hell-room.tsx
    '/services/hell-room',
    ...PRIVATE_PATHS,
  ],
  transform: async (config, path) => {
    const hints = ROUTE_HINTS[path] ?? {};
    return {
      loc: path,
      changefreq: hints.changefreq ?? config.changefreq,
      priority: hints.priority ?? config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/profile',
          '/settings',
          '/login',
          '/signup',
          '/forgot-password',
          '/reset-password',
          '/onboarding',
        ],
      },
      { userAgent: 'GPTBot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'OAI-SearchBot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'ClaudeBot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'anthropic-ai', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'PerplexityBot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'Google-Extended', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'cohere-ai', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'meta-externalagent', allow: ['/', '/llms.txt', '/llms-full.txt'] },
    ],
    // No additionalSitemaps: this generated sitemap is the single source of
    // truth for /sitemap.xml. The former /api/sitemap route was unreachable
    // (public/sitemap.xml shadows the afterFiles rewrite) and has been removed.
  },
}
