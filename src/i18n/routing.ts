import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en', 'hr'],
  defaultLocale: 'de',
  // Default locale (de) has no prefix → kotliretreat.com is the German home;
  // en/hr get /en, /hr.
  localePrefix: 'as-needed',
});
