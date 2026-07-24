import { SITE_URL, SITE_NAME, CONTACT_EMAIL, CONTACT_PHONE } from './site';

// Build schema.org JSON-LD for the landing page from the locale's messages.
// Emits Organization (TravelAgency) + TouristTrip + FAQPage → eligible for
// rich results (especially the FAQ accordion) in Google.
export async function buildJsonLd(locale: string) {
  const messages = (await import(`../messages/${locale}.json`)).default as Record<string, unknown>;
  const url = `${SITE_URL}/${locale}/istria`;

  const meta = (messages.meta ?? {}) as { title?: string; description?: string };
  const hero = (messages.hero ?? {}) as { people?: string };
  const agenda = (messages.agenda ?? {}) as { days?: { theme: string; title: string }[] };
  const pricing = (messages.pricing ?? {}) as { cards?: { name: string }[] };
  const faq = (messages.faq ?? {}) as { items?: { q: string; a: string }[] };

  const organization = {
    '@type': 'TravelAgency',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    image: `${SITE_URL}/og-image.jpg`,
    logo: `${SITE_URL}/og-image.jpg`,
    priceRange: '€€€',
    areaServed: ['DE', 'AT', 'CH'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kotli',
      addressRegion: 'Istria',
      addressCountry: 'HR',
    },
  };

  const trip = {
    '@type': 'TouristTrip',
    name: meta.title,
    description: meta.description,
    url,
    touristType: hero.people ?? 'Groups of 10–34',
    provider: { '@id': `${SITE_URL}/#organization` },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: (agenda.days ?? []).length,
      itemListElement: (agenda.days ?? []).map((d, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${d.theme} — ${d.title}`,
      })),
    },
    offers: [
      {
        '@type': 'Offer',
        name: pricing.cards?.[0]?.name ?? 'Village package',
        price: '1090',
        priceCurrency: 'EUR',
        url,
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: pricing.cards?.[1]?.name ?? 'Istria package',
        price: '1290',
        priceCurrency: 'EUR',
        url,
        availability: 'https://schema.org/InStock',
      },
    ],
  };

  const faqPage = {
    '@type': 'FAQPage',
    mainEntity: (faq.items ?? []).map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, trip, faqPage],
  };
}
