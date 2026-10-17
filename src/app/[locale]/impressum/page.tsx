import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { LegalPage, LegalSection, LegalFacts } from '@/components/v2/LegalPage';
import { localeUrl, LOCALES, ORGANISER, OPERATOR, type LegalEntity } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'impressum' });
  return {
    title: t('title'),
    alternates: {
      canonical: localeUrl(locale, 'impressum'),
      languages: Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, 'impressum')])),
    },
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('impressum');
  const conditions = t.raw('conditions') as string[];

  const facts = (e: LegalEntity): [string, React.ReactNode][] => {
    const rows: [string, React.ReactNode][] = [
      [t('fields.company'), e.name],
      [t('fields.address'), `${e.address}, ${t('country')}`],
      [t('fields.oib'), e.oib],
    ];
    if (e.travelAgencyId) rows.push([t('fields.agencyId'), e.travelAgencyId]);
    if (e.register) rows.push([t('fields.register'), e.register]);
    if (e.director) rows.push([t('fields.director'), e.director]);
    rows.push(
      [t('fields.email'), <a key="e" href={`mailto:${e.email}`} className="underline underline-offset-4">{e.email}</a>],
      [t('fields.phone'), <a key="p" href={`tel:${e.phone.replace(/\s/g, '')}`} className="no-underline">{e.phone}</a>]
    );
    return rows;
  };

  return (
    <LegalPage label={t('label')} title={t('title')} intro={t('intro')}>
      <LegalSection title={t('organiserTitle')}>
        <p>{t('organiserRole')}</p>
        <LegalFacts rows={facts(ORGANISER)} />
      </LegalSection>

      <LegalSection title={t('operatorTitle')}>
        <p>{t('operatorRole')}</p>
        <LegalFacts rows={facts(OPERATOR)} />
      </LegalSection>

      <LegalSection id="conditions" title={t('conditionsTitle')}>
        <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
          {conditions.map((c, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden className="shrink-0" style={{ color: '#b08d57' }}>—</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <p className="font-serif italic mt-2">{t('conditionsNote')}</p>
      </LegalSection>
    </LegalPage>
  );
}
