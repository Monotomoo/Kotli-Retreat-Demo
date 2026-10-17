import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { LegalPage, LegalSection } from '@/components/v2/LegalPage';
import { localeUrl, LOCALES } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('title'),
    alternates: {
      canonical: localeUrl(locale, 'privacy'),
      languages: Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, 'privacy')])),
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacy');
  const tLegal = await getTranslations('impressum');
  const sections = (t.raw('sections') as { h: string; p: string }[]) || [];

  return (
    <LegalPage label={tLegal('label')} title={t('title')} meta={t('lastUpdated')} intro={t('intro')}>
      {sections.map((s, i) => (
        <LegalSection key={i} title={s.h}>
          <p>{s.p}</p>
        </LegalSection>
      ))}
    </LegalPage>
  );
}
