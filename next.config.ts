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
      { source: '/de/istria', destination: '/', permanent: true },
      { source: '/en/istria', destination: '/en', permanent: true },
      { source: '/hr/istria', destination: '/hr', permanent: true },
      { source: '/de/privacy', destination: '/privacy', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
