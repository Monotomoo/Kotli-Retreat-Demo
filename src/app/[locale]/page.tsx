import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { localeUrl } from '@/lib/site';
import { buildJsonLd } from '@/lib/jsonLd';
import HeaderV2 from '@/components/v2/HeaderV2';
import HeroV2 from '@/components/v2/HeroV2';
import WhyV2 from '@/components/v2/WhyV2';
import HostsV2 from '@/components/v2/HostsV2';
import AgendaV2 from '@/components/v2/AgendaV2';
import DestinationsV2 from '@/components/v2/DestinationsV2';
import IncludesV2 from '@/components/v2/IncludesV2';
import AccommodationV2 from '@/components/v2/AccommodationV2';
import PricingV2 from '@/components/v2/PricingV2';
import ContactV2 from '@/components/v2/ContactV2';
import FaqV2 from '@/components/v2/FaqV2';
import FooterV2 from '@/components/v2/FooterV2';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import StickyMobileCta from '@/components/StickyMobileCta';

// Homepage — lives at the locale root: kotliretreat.com (de) · /en · /hr.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: localeUrl(locale),
      languages: {
        'de-DE': localeUrl('de'),
        en: localeUrl('en'),
        'hr-HR': localeUrl('hr'),
        'x-default': localeUrl('de'),
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = await buildJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeaderV2 />
      <main>
        <HeroV2 />
        <AccommodationV2 />
        <WhyV2 />
        <HostsV2 />
        <AgendaV2 />
        <DestinationsV2 />
        <PricingV2 />
        <IncludesV2 />
        <ContactV2 />
        <FaqV2 />
      </main>
      <FooterV2 />
      <WhatsAppFloat />
      <StickyMobileCta />
    </>
  );
}
