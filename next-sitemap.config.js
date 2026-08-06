/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mind-project.com',
  generateRobotsTxt: true, // (optional)
  exclude: ['/api/*', '/settings'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://mind-project.com/sitemap.xml', // <==== Add here
    ],
  },
}
