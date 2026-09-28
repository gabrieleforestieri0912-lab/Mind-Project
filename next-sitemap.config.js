// Paths guarded by src/proxy.ts: anonymous visitors are redirected to /login.
// Redirected URLs must never be listed in a sitemap, so they are excluded
// here and disallowed in robots.txt.
const PRIVATE_PATHS = [
  '/profile',
  '/settings',
  '/academy/*',
  '/mind-project/*',
  '/habit/*',
  '/payment/*',
];

// Prefixes for the robots.txt Disallow rules (no glob support).
const PRIVATE_PREFIXES = [
  '/profile',
  '/settings',
  '/academy',
  '/mind-project',
  '/habit',
  '/payment',
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mind-prjct.vercel.app',
  generateRobotsTxt: true, // (optional)
  exclude: [
    '/api/*',
    '/auth/*',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/onboarding',
    // Rendered with noIndex in src/pages/services/hell-room.tsx
    '/services/hell-room',
    ...PRIVATE_PATHS,
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/login',
          '/signup',
          '/forgot-password',
          '/reset-password',
          '/onboarding',
          ...PRIVATE_PREFIXES,
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
    // No additionalSitemaps here: the only candidate was this same index
    // (https://mind-prjct.vercel.app/sitemap.xml), which made the generated
    // sitemapindex reference itself. The /api/sitemap route is shadowed by the
    // generated public/sitemap.xml, so it cannot be listed as an extra sitemap.
  },
}
