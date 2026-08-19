import type { MetadataRoute } from 'next';
import { LOCALES, localeUrl } from '@/lib/site';

// Generates /sitemap.xml with all locale + page combinations and hreflang
// alternates. Landing lives at the locale root (path ''); privacy at /privacy.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: 'weekly' | 'yearly' }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: 'privacy', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const lastModified = new Date();

  return pages.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: localeUrl(locale, page.path),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, page.path)])),
      },
    }))
  );
}
