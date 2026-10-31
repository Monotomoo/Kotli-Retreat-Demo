import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { LOCALES, localeUrl } from '@/lib/site';
import HeaderV2 from '@/components/v2/HeaderV2';
import PageHeroV2 from '@/components/v2/PageHeroV2';
import PackageShowcaseV2 from '@/components/v2/PackageShowcaseV2';
import ContactV2 from '@/components/v2/ContactV2';
import FooterV2 from '@/components/v2/FooterV2';
import WhatsAppFloat from '@/components/WhatsAppFloat';

// /packages — every package as an editorial spread, a comparison table and help to choose.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'packagesPage.meta' });
  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: {
      canonical: localeUrl(locale, 'packages'),
      languages: Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, 'packages')])),
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
  const t = await getTranslations('packagesPage.hero');

  return (
    <>
      <HeaderV2 />
      <main>
        <PageHeroV2 image="/images/kotli/stone-tables.jpg" eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
        <PackageShowcaseV2 />
        <ContactV2 />
      </main>
      <FooterV2 />
      <WhatsAppFloat />
    </>
  );
}
