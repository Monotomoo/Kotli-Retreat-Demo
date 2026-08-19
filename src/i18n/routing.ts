import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en', 'hr', 'sl'],
  // English is the default → kotliretreat.com lands on English; de/hr/sl get
  // /de, /hr, /sl. Detection is off so the bare domain is always English
  // (no browser-language or cookie override); visitors switch languages manually.
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
});
