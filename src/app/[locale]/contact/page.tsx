import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { LOCALES, localeUrl } from '@/lib/site';
import HeaderV2 from '@/components/v2/HeaderV2';
import PageHeroV2 from '@/components/v2/PageHeroV2';
import ContactV2 from '@/components/v2/ContactV2';
import FaqV2 from '@/components/v2/FaqV2';
import FooterV2 from '@/components/v2/FooterV2';
import WhatsAppFloat from '@/components/WhatsAppFloat';

// /contact — inquiry form, direct channels and the FAQ.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage.meta' });
  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: {
      canonical: localeUrl(locale, 'contact'),
      languages: Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, 'contact')])),
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
  const t = await getTranslations('contactPage.hero');

  return (
    <>
      <HeaderV2 />
      <main>
        <PageHeroV2 image="/images/kotli/terrace.jpg" eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
        <ContactV2 />
        <FaqV2 ns="home" />
      </main>
      <FooterV2 />
      <WhatsAppFloat />
    </>
  );
}
