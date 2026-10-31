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

      {/* Comparison — each package is a tall card; rows line up across cards via subgrid */}
      <section id="compare" className="scroll-mt-28 relative overflow-hidden" style={{ backgroundColor: DARK }}>
        <div
          className="absolute -top-48 left-1/3 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(176,141,87,0.14), transparent 65%)' }}
        />
        <div className="relative px-5 md:px-[6vw] py-16 md:py-24">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
            <span className="text-[10px] uppercase tracking-[4px] font-semibold" style={{ color: BRASS_LIGHT }}>
              {t('compare.label')}
            </span>
          </div>
          <h2 className="font-display font-light text-[clamp(30px,3.6vw,50px)] leading-[1.05]" style={{ color: IVORY }}>
            {t('compare.title')}
          </h2>

          <div className="mt-12 overflow-x-auto pb-4 -mx-5 px-5 md:mx-0 md:px-0">
            <div
              className="grid min-w-[720px] gap-x-5"
              style={{
                gridTemplateColumns: `minmax(170px, 0.8fr) repeat(${PACKAGES.length}, minmax(240px, 1fr))`,
                gridTemplateRows: `auto repeat(${rows.length}, auto) auto`,
              }}
            >
              {/* Label column */}
              <div className="grid" style={{ gridRow: `span ${rows.length + 2}`, gridTemplateRows: 'subgrid' }}>
                <div />
                {rows.map((r, i) => {
                  const Icon = ROW_ICONS[i] ?? Sparkles;
                  return (
                    <div key={i} className="flex items-center gap-3 py-4" style={{ borderTop: '1px solid rgba(246,243,236,0.08)' }}>
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'rgba(211,183,135,0.1)', color: BRASS_LIGHT }}
                      >
                        <Icon size={15} strokeWidth={1.6} />
                      </span>
                      <span className="text-[10.5px] uppercase tracking-[2px] font-semibold" style={{ color: 'rgba(246,243,236,0.7)' }}>
                        {r.label}
                      </span>
                    </div>
                  );
                })}
                <div />
              </div>

              {/* One card per package */}
              {PACKAGES.map((p, pi) => {
                const c = tCard.raw(p.cardKey) as CardText;
                return (
                  <motion.div
                    key={p.slug}
                    className="grid rounded-[8px] overflow-hidden"
                    style={{
                      gridRow: `span ${rows.length + 2}`,
                      gridTemplateRows: 'subgrid',
                      backgroundColor: '#fbf9f3',
                      boxShadow: '0 30px 70px rgba(0,0,0,0.35)',
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7, delay: pi * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Card head */}
                    <div className="relative min-h-[170px] flex flex-col justify-end p-5">
                      <Image src={p.image} alt={c.name} fill sizes="25vw" className="object-cover" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.92), rgba(13,18,12,0.15))' }} />
                      <div className="relative">
                        <span className="text-[9px] uppercase tracking-[2.5px] font-semibold" style={{ color: BRASS_LIGHT }}>
                          {c.badge}
                        </span>
                        <div className="font-display text-[24px] leading-tight mt-1" style={{ color: IVORY }}>
                          {c.name}
                        </div>
                      </div>
                    </div>

                    {rows.map((r, i) => {
                      const v = r.values[p.cardKey] ?? '—';
                      const none = v.trim() === '—';
                      const isPrice = i === rows.length - 1;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-3 px-5 py-4"
                          style={{ borderTop: '1px solid rgba(28,26,21,0.07)', backgroundColor: i % 2 ? 'rgba(237,231,218,0.35)' : undefined }}
                        >
                          {isPrice ? (
                            <span className="font-display text-[26px] leading-none" style={{ color: INK }}>
                              {v}
                            </span>
                          ) : none ? (
                            <>
                              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(28,26,21,0.06)', color: 'rgba(28,26,21,0.3)' }}>
                                <Minus size={12} strokeWidth={2} />
                              </span>
                              <span className="text-[13px]" style={{ color: 'rgba(28,26,21,0.35)' }}>
                                {t('compare.notIncluded')}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: BRASS, color: '#fff' }}>
                                <Check size={12} strokeWidth={2.5} />
                              </span>
                              <span className="text-[13.5px] leading-snug" style={{ color: 'rgba(28,26,21,0.82)' }}>
                                {v}
                              </span>
                            </>
                          )}
                        </div>
                      );
                    })}

                    <div className="px-5 py-5" style={{ borderTop: '1px solid rgba(28,26,21,0.07)' }}>
                      <Link
                        href={`/${p.slug}`}
                        className="flex items-center justify-center gap-2 w-full py-3 text-[10px] uppercase tracking-[2.5px] font-semibold no-underline rounded-[4px] transition-colors duration-300"
                        style={{ backgroundColor: INK, color: IVORY }}
                      >
                        {t('labels.view')} →
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Help me choose */}
      <section style={{ backgroundColor: STONE }}>
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
