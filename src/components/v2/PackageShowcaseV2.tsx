'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { PACKAGES, tNs, type PackageDef } from '@/lib/packages';

// /packages — one editorial spread per package (alternating sides), then a
// comparison table and a "help me choose" band. All text comes from the
// package's own namespace (hero hooks, agenda days) plus home.packages.cards.
const IVORY = '#f6f3ec';
const STONE = '#ede7da';
const INK = '#1c1a15';
const DARK = '#0d120c';
const BRASS = '#b08d57';
const BRASS_DARK = '#8a6b3f';
const BRASS_LIGHT = '#d3b787';

interface CardText {
  badge: string;
  name: string;
  tagline: string;
  intro: string;
  bestFor: string;
  length: string;
  group: string;
  price: string;
}

function Spread({ pkg, index }: { pkg: PackageDef; index: number }) {
  const t = useTranslations('packagesPage');
  const tCard = useTranslations('home.packages.cards');
  const tHero = useTranslations(tNs(pkg.ns, 'hero'));
  const tAgenda = useTranslations(tNs(pkg.ns, 'agenda'));
  const c = tCard.raw(pkg.cardKey) as CardText;
  const hooks = tHero.raw('hooks') as string[];
  const days = tAgenda.raw('days') as { theme: string; title: string }[];
  const flip = index % 2 === 1;
  const inset = pkg.inset;

  const facts: [string, string][] = [
    [t('labels.length'), c.length],
    [t('labels.season'), c.badge],
    [t('labels.group'), c.group],
    [t('labels.from'), c.price],
  ];

  return (
    <article
      id={pkg.slug}
      className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start py-16 md:py-24"
      style={index > 0 ? { borderTop: '1px solid rgba(28,26,21,0.1)' } : undefined}
    >
      {/* Photographs */}
      <motion.div
        className={`lg:col-span-6 relative ${flip ? 'lg:order-2' : ''}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden" style={{ boxShadow: '0 34px 80px rgba(28,26,21,0.22)' }}>
          <Image src={pkg.image} alt={c.name} fill sizes="(min-width:1024px) 46vw, 100vw" className="object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,18,12,0.35), transparent 35%)' }} />
          <span
            className="absolute top-5 left-5 text-[9px] uppercase tracking-[2.5px] font-bold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(246,243,236,0.92)', color: '#141a12' }}
          >
            {c.badge}
          </span>
          <div
            className="absolute top-5 right-5 text-right rounded-[3px] px-4 py-3 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(13,18,12,0.55)', border: '1px solid rgba(211,183,135,0.3)' }}
          >
            <div className="font-display text-[22px] leading-none" style={{ color: BRASS_LIGHT }}>
              {c.price}
            </div>
            <div className="text-[9px] uppercase tracking-[2px] mt-1.5" style={{ color: 'rgba(246,243,236,0.75)' }}>
              {c.length}
            </div>
          </div>
        </div>
        <div
          className={`hidden md:block absolute -bottom-10 ${flip ? '-left-8' : '-right-8'} w-[42%] aspect-[4/3] rounded-[4px] overflow-hidden border-[6px]`}
          style={{ borderColor: IVORY, boxShadow: '0 24px 50px rgba(28,26,21,0.25)' }}
        >
          <Image src={inset} alt="" fill sizes="20vw" className="object-cover" />
        </div>
      </motion.div>

      {/* Story + facts */}
      <motion.div
        className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-baseline gap-4">
          <span className="font-display text-[56px] leading-none" style={{ color: 'rgba(176,141,87,0.35)' }}>
            0{index + 1}
          </span>
          <span className="text-[10px] uppercase tracking-[3.5px] font-semibold" style={{ color: BRASS_DARK }}>
            {c.bestFor}
          </span>
        </div>
        <h2 className="font-display font-light text-[clamp(34px,4vw,54px)] leading-[1.02] mt-3" style={{ color: INK }}>
          {c.name}
        </h2>
        <p className="font-serif italic text-[18px] md:text-[20px] leading-snug mt-3" style={{ color: BRASS_DARK }}>
          {c.tagline}
        </p>
        <p className="text-[15px] leading-relaxed mt-5 max-w-[560px]" style={{ color: 'rgba(28,26,21,0.72)' }}>
          {c.intro}
        </p>

        {/* Facts */}
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-8 rounded-[4px] overflow-hidden" style={{ backgroundColor: 'rgba(28,26,21,0.1)' }}>
          {facts.map(([k, v]) => (
            <div key={k} className="px-4 py-4" style={{ backgroundColor: '#fbf9f3' }}>
              <dt className="text-[9px] uppercase tracking-[2.5px] font-semibold" style={{ color: BRASS_DARK }}>
                {k}
              </dt>
              <dd className="font-display text-[17px] leading-tight mt-1.5" style={{ color: INK }}>
                {v}
              </dd>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-9">
          {/* Highlights */}
          <div>
            <div className="text-[10px] uppercase tracking-[3px] font-semibold mb-3" style={{ color: BRASS_DARK }}>
              {t('labels.highlights')}
            </div>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {hooks.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] leading-snug" style={{ color: 'rgba(28,26,21,0.8)' }}>
                  <span className="mt-[7px] w-1.5 h-1.5 rotate-45 shrink-0" style={{ backgroundColor: BRASS }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          {/* Days at a glance */}
          <div>
            <div className="text-[10px] uppercase tracking-[3px] font-semibold mb-3" style={{ color: BRASS_DARK }}>
              {t('labels.days')}
            </div>
            <ol className="list-none p-0 m-0 relative">
              {days.map((d, i) => (
                <li key={i} className="relative pl-7 pb-3 last:pb-0">
                  {i < days.length - 1 && (
                    <span className="absolute left-[7px] top-4 bottom-0 w-px" style={{ backgroundColor: 'rgba(176,141,87,0.35)' }} />
                  )}
                  <span
                    className="absolute left-0 top-[3px] w-[15px] h-[15px] rounded-full flex items-center justify-center text-[8px] font-bold"
                    style={{ border: `1px solid ${BRASS}`, color: BRASS_DARK, backgroundColor: IVORY }}
                  >
                    {i + 1}
                  </span>
                  <div className="text-[9px] uppercase tracking-[2px]" style={{ color: 'rgba(28,26,21,0.45)' }}>
                    {d.theme}
                  </div>
                  <div className="text-[14px] leading-snug" style={{ color: INK }}>
                    {d.title}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-10">
          <Link
            href={`/${pkg.slug}`}
            className="px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[2.5px] no-underline rounded-[3px] transition-colors duration-300"
            style={{ backgroundColor: INK, color: IVORY }}
          >
            {t('labels.view')} →
          </Link>
          <Link
            href="/contact"
            className="text-[10px] uppercase tracking-[2.5px] font-semibold no-underline pb-1 border-b"
            style={{ color: BRASS_DARK, borderColor: 'rgba(138,107,63,0.4)' }}
          >
            {t('labels.ask')}
          </Link>
        </div>
      </motion.div>
    </article>
  );
}

export default function PackageShowcaseV2() {
  const t = useTranslations('packagesPage');
  const tCard = useTranslations('home.packages.cards');
  const rows = t.raw('compare.rows') as { label: string; values: Record<string, string> }[];

  return (
    <>
      {/* Quick index */}
      <nav className="sticky top-[64px] z-30 border-b backdrop-blur-md" style={{ backgroundColor: 'rgba(246,243,236,0.9)', borderColor: 'rgba(28,26,21,0.08)' }}>
        <div className="px-5 md:px-[6vw] flex gap-7 overflow-x-auto py-3.5">
          {PACKAGES.map((p, i) => (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              className="shrink-0 flex items-baseline gap-2 text-[11px] uppercase tracking-[2.5px] font-semibold no-underline"
              style={{ color: INK }}
            >
              <span className="font-serif italic normal-case tracking-normal text-[12px]" style={{ color: BRASS }}>
                0{i + 1}
              </span>
              {(tCard.raw(p.cardKey) as CardText).name}
            </a>
          ))}
          <a href="#compare" className="shrink-0 text-[11px] uppercase tracking-[2.5px] font-semibold no-underline" style={{ color: BRASS_DARK }}>
            {t('compare.label')}
          </a>
        </div>
      </nav>

      <section style={{ backgroundColor: IVORY }}>
        <div className="px-5 md:px-[6vw]">
          {PACKAGES.map((p, i) => (
            <Spread key={p.slug} pkg={p} index={i} />
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="scroll-mt-28" style={{ backgroundColor: STONE }}>
        <div className="px-5 md:px-[6vw] py-16 md:py-24">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
            <span className="text-[10px] uppercase tracking-[4px] font-semibold" style={{ color: BRASS_DARK }}>
              {t('compare.label')}
            </span>
          </div>
          <h2 className="font-display font-light text-[clamp(30px,3.6vw,48px)] leading-[1.05]" style={{ color: INK }}>
            {t('compare.title')}
          </h2>

          <div className="mt-10 overflow-x-auto rounded-[6px]" style={{ boxShadow: '0 22px 55px rgba(28,26,21,0.1)' }}>
            <table className="w-full min-w-[560px] border-collapse text-left" style={{ backgroundColor: '#fbf9f3' }}>
              <thead>
                <tr style={{ backgroundColor: DARK }}>
                  <th className="px-5 py-4" />
                  {PACKAGES.map((p) => (
                    <th key={p.slug} className="px-5 py-4 font-display font-normal text-[19px]" style={{ color: IVORY }}>
                      {(tCard.raw(p.cardKey) as CardText).name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ borderTop: '1px solid rgba(28,26,21,0.08)' }}>
                    <th className="px-5 py-3.5 text-[10px] uppercase tracking-[2px] font-semibold align-top" style={{ color: BRASS_DARK }}>
                      {r.label}
                    </th>
                    {PACKAGES.map((p) => (
                      <td key={p.slug} className="px-5 py-3.5 text-[14px] leading-snug align-top" style={{ color: 'rgba(28,26,21,0.8)' }}>
                        {r.values[p.cardKey] ?? '—'}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr style={{ borderTop: '1px solid rgba(28,26,21,0.08)' }}>
                  <th />
                  {PACKAGES.map((p) => (
                    <td key={p.slug} className="px-5 py-5">
                      <Link href={`/${p.slug}`} className="text-[10px] uppercase tracking-[2.5px] font-semibold no-underline pb-1 border-b" style={{ color: BRASS_DARK, borderColor: 'rgba(138,107,63,0.4)' }}>
                        {t('labels.view')} →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Help me choose */}
      <section style={{ backgroundColor: DARK }}>
        <div className="px-5 md:px-[6vw] py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-[640px]">
            <h2 className="font-display font-light text-[clamp(28px,3.2vw,42px)] leading-[1.08]" style={{ color: IVORY }}>
              {t('help.title')}
            </h2>
            <p className="font-serif italic text-[17px] leading-relaxed mt-3" style={{ color: 'rgba(246,243,236,0.65)' }}>
              {t('help.text')}
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 self-start md:self-auto px-8 py-4 text-[11px] font-semibold uppercase tracking-[2.5px] no-underline rounded-[2px]"
            style={{ backgroundColor: BRASS_LIGHT, color: '#141a12' }}
          >
            {t('help.cta')} →
          </Link>
        </div>
      </section>
    </>
  );
}
