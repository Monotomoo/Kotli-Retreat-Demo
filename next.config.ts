import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  // 301 the old /<locale>/istria URLs (and the prefixed default privacy) to the
  // new clean structure, so anything Google already indexed follows cleanly.
  async redirects() {
    return [
      // English is now the default (bare domain); German moved to /de.
      { source: '/en/istria', destination: '/', permanent: true },
      { source: '/de/istria', destination: '/de', permanent: true },
      { source: '/hr/istria', destination: '/hr', permanent: true },
      { source: '/en/privacy', destination: '/privacy', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
