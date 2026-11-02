import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import HeaderV2 from '@/components/v2/HeaderV2';
import ThankYouV2 from '@/components/v2/ThankYouV2';
import FooterV2 from '@/components/v2/FooterV2';

// One thank-you page per locale at its own URL (THANK_YOU_PATH in site.ts):
// /thank-you, /de/danke, /hr/hvala, /sl/hvala. The other locale + path
// combinations 404. Kept out of the sitemap and out of search.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'thankYou.meta' });
  return { title: t('title'), robots: { index: false, follow: false } };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeaderV2 />
      <main>
        <ThankYouV2 />
      </main>
      <FooterV2 />
    </>
  );
}
