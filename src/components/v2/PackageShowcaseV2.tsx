'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { PACKAGES, tNs, type PackageDef } from '@/lib/packages';
import { Clock, CalendarDays, Users, Dog, Wine, Droplets, Star, Euro, Sparkles, Check, Minus } from 'lucide-react';

// One icon per comparison row, in the order of packagesPage.compare.rows.
const ROW_ICONS = [Clock, CalendarDays, Users, Dog, Wine, Droplets, Star, Euro];

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
  priceNote?: string;
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
        <Link
          href={`/${pkg.slug}`}
          aria-label={c.name}
          className="group block relative aspect-[4/5] rounded-[6px] overflow-hidden no-underline"
          style={{ boxShadow: '0 34px 80px rgba(28,26,21,0.22)' }}
        >
          <Image
            src={pkg.image}
            alt={c.name}
            fill
            sizes="(min-width:1024px) 46vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,18,12,0.35), transparent 35%)' }} />
          <div className="absolute top-5 inset-x-5 flex flex-wrap items-start justify-between gap-3">
            <span
              className="text-[9px] uppercase tracking-[2.5px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{ backgroundColor: 'rgba(246,243,236,0.92)', color: '#141a12' }}
            >
              {c.badge}
            </span>
            <div
              className="ml-auto text-right rounded-[3px] px-4 py-3 backdrop-blur-md"
              style={{ backgroundColor: 'rgba(13,18,12,0.55)', border: '1px solid rgba(211,183,135,0.3)' }}
            >
              <div className="font-display text-[22px] leading-none" style={{ color: BRASS_LIGHT }}>
                {c.price}
              </div>
              <div className="text-[9px] uppercase tracking-[2px] mt-1.5" style={{ color: 'rgba(246,243,236,0.75)' }}>
                {c.length}
              </div>
              {c.priceNote && (
                <div className="text-[9px] uppercase tracking-[1.5px] mt-1.5" style={{ color: BRASS_LIGHT }}>
                  {c.priceNote}
                </div>
              )}
            </div>
          </div>
        </Link>
        <Link
          href={`/${pkg.slug}`}
          aria-label={c.name}
          className={`hidden md:block absolute -bottom-10 ${flip ? '-left-8' : '-right-8'} w-[42%] aspect-[4/3] rounded-[4px] overflow-hidden border-[6px]`}
          style={{ borderColor: IVORY, boxShadow: '0 24px 50px rgba(28,26,21,0.25)' }}
        >
          <Image src={inset} alt="" fill sizes="20vw" className="object-cover" />
        </Link>
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

      {/* Comparison — one self-contained card per package, rows in the same order */}
      <section id="compare" className="scroll-mt-28 relative overflow-hidden" style={{ backgroundColor: STONE }}>
        <div
          className="absolute -top-56 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(176,141,87,0.18), transparent 65%)' }}
        />
        <div className="relative px-5 md:px-[6vw] py-16 md:py-24">
          <div className="text-center max-w-[720px] mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
              <span className="text-[10px] uppercase tracking-[4px] font-semibold" style={{ color: BRASS_DARK }}>
                {t('compare.label')}
              </span>
              <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
            </div>
            <h2 className="font-display font-light text-[clamp(32px,4vw,54px)] leading-[1.04]" style={{ color: INK }}>
              {t('compare.title')}
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9 mt-14 mx-auto"
            style={{ maxWidth: PACKAGES.length > 2 ? 1320 : 1080 }}
          >
            {PACKAGES.map((p, pi) => {
              const c = tCard.raw(p.cardKey) as CardText;
              const priceRow = rows[rows.length - 1];
              return (
                <motion.article
                  key={p.slug}
                  className="flex flex-col rounded-[10px] overflow-hidden"
                  style={{ backgroundColor: '#fbf9f3', boxShadow: '0 34px 80px rgba(28,26,21,0.16)' }}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.75, delay: pi * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Photo header */}
                  <Link href={`/${p.slug}`} className="group block relative h-[230px] overflow-hidden no-underline">
                    <Image
                      src={p.image}
                      alt={c.name}
                      fill
                      sizes="(min-width:768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.88), rgba(13,18,12,0.05) 60%)' }} />
                    <span
                      className="absolute top-5 left-5 text-[9px] uppercase tracking-[2.5px] font-bold px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: 'rgba(246,243,236,0.92)', color: '#141a12' }}
                    >
                      {c.badge}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-display font-light text-[32px] leading-none" style={{ color: IVORY }}>
                        {c.name}
                      </h3>
                      <p className="font-serif italic text-[15px] mt-2" style={{ color: 'rgba(246,243,236,0.75)' }}>
                        {c.tagline}
                      </p>
                    </div>
                  </Link>

                  {/* Price band: stacked until the card is wide enough for two columns */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-5" style={{ backgroundColor: DARK }}>
                    <div>
                      <div className="text-[9px] uppercase tracking-[2.5px]" style={{ color: 'rgba(246,243,236,0.5)' }}>
                        {priceRow.label}
                      </div>
                      <div className="font-display text-[23px] sm:text-[28px] leading-none mt-1.5" style={{ color: BRASS_LIGHT }}>
                        {priceRow.values[p.cardKey]}
                      </div>
                      {c.priceNote && (
                        <div className="text-[9px] uppercase tracking-[1.5px] mt-1.5" style={{ color: 'rgba(246,243,236,0.6)' }}>
                          {c.priceNote}
                        </div>
                      )}
                    </div>
                    <div className="lg:text-right shrink-0">
                      <div className="font-display italic text-[19px] whitespace-nowrap" style={{ color: IVORY }}>
                        {c.length}
                      </div>
                      <div className="text-[9px] uppercase tracking-[2px] mt-1" style={{ color: 'rgba(246,243,236,0.5)' }}>
                        {c.group}
                      </div>
                    </div>
                  </div>

                  {/* Rows */}
                  <ul className="list-none m-0 p-0 flex-1">
                    {rows.slice(0, -1).map((r, i) => {
                      const Icon = ROW_ICONS[i] ?? Sparkles;
                      const v = r.values[p.cardKey] ?? '—';
                      const none = v.trim() === '—';
                      return (
                        <li
                          key={i}
                          className="grid grid-cols-[40px_1fr_auto] items-center gap-3 px-6 py-4"
                          style={{ borderTop: i ? '1px solid rgba(28,26,21,0.07)' : undefined }}
                        >
                          <span
                            className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: none ? 'rgba(28,26,21,0.04)' : 'rgba(176,141,87,0.12)',
                              color: none ? 'rgba(28,26,21,0.25)' : BRASS_DARK,
                            }}
                          >
                            <Icon size={16} strokeWidth={1.6} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[9.5px] uppercase tracking-[2px] font-semibold" style={{ color: 'rgba(28,26,21,0.45)' }}>
                              {r.label}
                            </span>
                            <span
                              className="block text-[14.5px] leading-snug mt-0.5"
                              style={{ color: none ? 'rgba(28,26,21,0.35)' : INK }}
                            >
                              {none ? t('compare.notIncluded') : v}
                            </span>
                          </span>
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={none ? { border: '1px solid rgba(28,26,21,0.15)', color: 'rgba(28,26,21,0.3)' } : { backgroundColor: BRASS, color: '#fff' }}
                          >
                            {none ? <Minus size={12} strokeWidth={2} /> : <Check size={13} strokeWidth={2.6} />}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-6" style={{ borderTop: '1px solid rgba(28,26,21,0.08)' }}>
                    <Link
                      href={`/${p.slug}`}
                      className="flex items-center justify-center px-3 py-3.5 text-[10px] uppercase tracking-[2px] font-semibold no-underline rounded-[4px] whitespace-nowrap"
                      style={{ backgroundColor: INK, color: IVORY }}
                    >
                      {t('labels.view')} →
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center px-3 py-3.5 text-[10px] uppercase tracking-[2px] font-semibold no-underline rounded-[4px] whitespace-nowrap"
                      style={{ border: `1px solid ${BRASS}`, color: BRASS_DARK }}
                    >
                      {t('labels.ask')}
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help me choose */}
      <section style={{ backgroundColor: IVORY, borderTop: '1px solid rgba(28,26,21,0.08)' }}>
        <div className="px-5 md:px-[6vw] py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-[640px]">
            <h2 className="font-display font-light text-[clamp(28px,3.2vw,42px)] leading-[1.08]" style={{ color: INK }}>
              {t('help.title')}
            </h2>
            <p className="font-serif italic text-[17px] leading-relaxed mt-3" style={{ color: 'rgba(28,26,21,0.6)' }}>
              {t('help.text')}
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 self-start md:self-auto px-8 py-4 text-[11px] font-semibold uppercase tracking-[2.5px] no-underline rounded-[2px]"
            style={{ backgroundColor: INK, color: IVORY }}
          >
            {t('help.cta')} →
          </Link>
        </div>
      </section>
    </>
  );
}
