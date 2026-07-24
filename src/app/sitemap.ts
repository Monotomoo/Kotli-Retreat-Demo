import type { MetadataRoute } from 'next';
import { SITE_URL, LOCALES } from '@/lib/site';

// Generates /sitemap.xml with all locale + page combinations and hreflang
// alternates, so Google discovers every language version of every page.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: 'weekly' | 'yearly' }[] = [
    { path: 'istria', priority: 1.0, changeFrequency: 'weekly' },
    { path: 'privacy', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const lastModified = new Date();

  return pages.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}/${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/${page.path}`])
        ),
      },
    }))
  );
}
