import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { localeUrl } from '@/lib/site';
import { buildJsonLd } from '@/lib/jsonLd';
import HeaderV2 from '@/components/v2/HeaderV2';
import HomeHeroV2 from '@/components/v2/HomeHeroV2';
import PackagesV2 from '@/components/v2/PackagesV2';
import HostsV2 from '@/components/v2/HostsV2';
import AccommodationV2 from '@/components/v2/AccommodationV2';
import ContactV2 from '@/components/v2/ContactV2';
import FaqV2 from '@/components/v2/FaqV2';
import FooterV2 from '@/components/v2/FooterV2';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import StickyMobileCta from '@/components/StickyMobileCta';

// Homepage — the place and every package. Lives at the locale root:
// kotliretreat.com (en) · /de · /hr · /sl. Each package has its own page.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: {
      canonical: localeUrl(locale),
      languages: {
        'de-DE': localeUrl('de'),
        en: localeUrl('en'),
        'hr-HR': localeUrl('hr'),
        'sl-SI': localeUrl('sl'),
        'x-default': localeUrl('en'),
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
  const jsonLd = await buildJsonLd(locale, 'home');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeaderV2 />
      <main>
        <HomeHeroV2 />
        <AccommodationV2 />
        <PackagesV2 />
        <HostsV2 />
        <ContactV2 />
        <FaqV2 ns="home" />
      </main>
      <FooterV2 />
      <WhatsAppFloat />
      <StickyMobileCta ns="home" />
    </>
  );
}
