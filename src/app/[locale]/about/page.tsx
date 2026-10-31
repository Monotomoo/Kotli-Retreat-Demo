import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { LOCALES, localeUrl } from '@/lib/site';
import HeaderV2 from '@/components/v2/HeaderV2';
import PageHeroV2 from '@/components/v2/PageHeroV2';
import AboutKotliV2 from '@/components/v2/AboutKotliV2';
import FooterV2 from '@/components/v2/FooterV2';
import WhatsAppFloat from '@/components/WhatsAppFloat';

// /about — the village of Kotli, its stone houses, the hosts and the region around it.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage.meta' });
  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: {
      canonical: localeUrl(locale, 'about'),
      languages: Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, 'about')])),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('aboutPage.hero');

  return (
    <>
      <HeaderV2 />
      <main>
        <PageHeroV2 image="/images/kotli/houses-overview.jpg" eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
        <AboutKotliV2 />
      </main>
      <FooterV2 />
      <WhatsAppFloat />
    </>
  );
}
