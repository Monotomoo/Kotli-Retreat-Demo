// Central site constants — single source of truth for SEO, sitemap, robots,
// structured data and canonical URLs.

export const SITE_URL = 'https://kotliretreat.com';
export const SITE_NAME = 'Kotli Retreat';

export const LOCALES = ['de', 'en', 'hr', 'sl'] as const;
export const DEFAULT_LOCALE = 'en';

// The primary marketing landing path (per locale).
export const LANDING_PATH = 'istria';

// Open Graph locale codes
export const OG_LOCALE: Record<string, string> = {
  de: 'de_DE',
  en: 'en_US',
  hr: 'hr_HR',
  sl: 'sl_SI',
};

// hreflang codes — de/hr get region, en stays generic
export const HREFLANG: Record<string, string> = {
  de: 'de-DE',
  en: 'en',
  hr: 'hr-HR',
  sl: 'sl-SI',
};

// Contact — matches the printed business details
export const CONTACT_EMAIL = 'info@kotliretreat.com';
export const CONTACT_PHONE = '+385 99 256 3862';

// The season currently on sale — hero ticket stamp.
export const SEASON = '2027';

// Legal entities shown on /impressum. Facts only; role labels are translated
// in messages (impressum.*). A field left undefined is simply not rendered.
export interface LegalEntity {
  name: string;
  address: string;
  oib: string;
  email: string;
  phone: string;
  travelAgencyId?: string; // "ID kod" from the Ministry of Tourism register (HR-AB-…)
  director?: string;
  register?: string; // commercial court + MBS
}

export const ORGANISER: LegalEntity = {
  name: 'Delmata Travel j.d.o.o.',
  address: 'Prve Poljanice 7, Zagreb',
  oib: '21858494377',
  email: 'info@delmata-travel.hr',
  phone: '+385 91 792 4122',
};

export const OPERATOR: LegalEntity = {
  name: 'Creative idea d.o.o.',
  address: 'Zagreb',
  oib: '39151678424',
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
};

// Build a canonical URL for a locale + optional sub-path, honoring the
// "as-needed" prefix: the default locale (de) has NO prefix, others do.
//   localeUrl('de')            → https://kotliretreat.com
//   localeUrl('en')            → https://kotliretreat.com/en
//   localeUrl('de', 'privacy') → https://kotliretreat.com/privacy
//   localeUrl('en', 'privacy') → https://kotliretreat.com/en/privacy
export function localeUrl(locale: string, path = ''): string {
  const seg = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const sub = path ? `/${path}` : '';
  return `${SITE_URL}${seg}${sub}`;
}
