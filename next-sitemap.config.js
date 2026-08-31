/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mind-project.com',
  generateRobotsTxt: true, // (optional)
  exclude: ['/api/*', '/settings', '/profile', '/login', '/signup', '/forgot-password', '/reset-password', '/onboarding', '/payment/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/profile', '/settings', '/login', '/signup', '/forgot-password', '/reset-password', '/onboarding'],
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
    additionalSitemaps: [
      'https://mind-project.com/sitemap.xml',
    ],
  },
}
