/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // /terms was a byte-identical duplicate of /privacy-policy (only the
        // canonical differed) and was linked from nowhere. Consolidate the
        // signals onto the canonical page with a permanent redirect.
        source: '/terms',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        // The 30-day challenge is a feature of the base plan, not a standalone
        // section: its page and navbar entry were removed.
        source: '/habit/challenge',
        destination: '/services/mind-project',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
};

export default nextConfig;
