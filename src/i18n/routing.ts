import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en', 'hr', 'sl'],
  defaultLocale: 'de',
  // Default locale (de) has no prefix → kotliretreat.com is the German home;
  // en/hr/sl get /en, /hr, /sl.
  localePrefix: 'as-needed',
});
