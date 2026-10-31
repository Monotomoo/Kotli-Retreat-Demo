import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { LOCALES, localeUrl } from '@/lib/site';
import { PACKAGES, packageBySlug, tNs } from '@/lib/packages';
import { buildJsonLd } from '@/lib/jsonLd';
import HeaderV2 from '@/components/v2/HeaderV2';
import HeroV2 from '@/components/v2/HeroV2';
import WhyV2 from '@/components/v2/WhyV2';
import AgendaV2 from '@/components/v2/AgendaV2';
import DestinationsV2 from '@/components/v2/DestinationsV2';
import PricingV2 from '@/components/v2/PricingV2';
import IncludesV2 from '@/components/v2/IncludesV2';
import ContactV2 from '@/components/v2/ContactV2';
import FooterV2 from '@/components/v2/FooterV2';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import StickyMobileCta from '@/components/StickyMobileCta';

// One page per package in src/lib/packages.ts: /soil-and-soul, /de/winter-truffles, …
// Static segments (impressum, privacy) take precedence over this one.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => PACKAGES.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const pkg = packageBySlug(slug);
  if (!pkg) return {};
  const t = await getTranslations({ locale, namespace: tNs(pkg.ns, 'meta') });
  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: {
      canonical: localeUrl(locale, slug),
      languages: Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, slug)])),
    },
  };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const pkg = packageBySlug(slug);
  if (!pkg) notFound();
  setRequestLocale(locale);
  const jsonLd = pkg.full ? await buildJsonLd(locale) : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <HeaderV2 />
      <main>
        <HeroV2 ns={pkg.ns} image={pkg.image} video={!!pkg.full} />
        {pkg.full && <WhyV2 />}
        <AgendaV2 ns={pkg.ns} images={pkg.dayImages} />
        {pkg.full && <DestinationsV2 />}
        <PricingV2 ns={pkg.ns} />
        <IncludesV2 ns={pkg.ns} />
        <ContactV2 />
      </main>
      <FooterV2 />
      <WhatsAppFloat />
      <StickyMobileCta />
    </>
  );
}
