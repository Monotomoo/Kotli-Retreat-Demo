import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en', 'hr'],
  defaultLocale: 'de',
  pathnames: {
    '/istria': '/istria',
    '/stay': '/stay',
    '/about': '/about',
  },
});
