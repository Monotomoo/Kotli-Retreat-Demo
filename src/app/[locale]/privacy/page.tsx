import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { localeUrl, DEFAULT_LOCALE } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('title'),
    alternates: { canonical: localeUrl(locale, 'privacy') },
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
  const sections = (t.raw('sections') as { h: string; p: string }[]) || [];

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-[760px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <Link
          href={locale === DEFAULT_LOCALE ? '/' : `/${locale}`}
          className="inline-flex items-center gap-1.5 text-[13px] text-green hover:text-green-dark mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Kotli Retreat
        </Link>

        <h1 className="font-serif italic text-[34px] md:text-[44px] text-text-dark leading-[1.1] mb-2">
          {t('title')}
        </h1>
        <p className="text-[12px] uppercase tracking-[2px] text-text-light mb-6">
          {t('lastUpdated')}
        </p>
        <p className="text-[15px] text-text-muted leading-relaxed mb-10">
          {t('intro')}
        </p>

        <div className="flex flex-col gap-7">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-serif text-[19px] md:text-[22px] text-text-dark font-semibold mb-2">
                {s.h}
              </h2>
              <p className="text-[14.5px] text-text-muted leading-relaxed">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
