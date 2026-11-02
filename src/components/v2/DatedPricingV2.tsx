'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CalendarDays, Check, Users } from 'lucide-react';
import { tNs, type PackageDef } from '@/lib/packages';

// Pricing for a package with fixed open dates (Winter at Kotli). The open
// weekend is a dark card listing every bookable date; picking one preselects
// the package and those dates in the inquiry form. The private weekend sits
// beside it, then a short "how booking works" strip.
const STONE = '#ede7da';
const INK = '#1c1a15';
const DARK = '#0d120c';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';
const BRASS_DARK = '#8a6b3f';
const BRASS_LIGHT = '#d3b787';

interface Card {
  badge: string;
  name: string;
  slogan: string;
  price: string;
  info: string;
  minNote: string;
  includesLabel?: string;
  includes: string[];
  cta: string;
}

const OPEN_IMAGE = '/images/hosts/vineyard.jpg';
const PRIVATE_IMAGE = '/images/kotli/interior-dining.jpg';

const chooseInForm = (detail: { name: string; arrival?: string; departure?: string }) => {
  window.dispatchEvent(new CustomEvent('kotli:choose-package', { detail }));
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

export default function DatedPricingV2({ pkg }: { pkg: PackageDef }) {
  const t = useTranslations(tNs(pkg.ns, 'pricing'));
  const tCard = useTranslations('home.packages.cards');
  const locale = useLocale();
  const [open, priv] = t.raw('cards') as Card[];
  const facts = t.raw('facts') as { value: string; label: string }[];
  const steps = t.raw('steps') as string[];
  const cancel = t.raw('cancel') as { value: string; label: string }[];
  const arrivals = t.raw('arrival') as { city: string; time: string }[];
  // The name exactly as it appears in the form's package options.
  const formName = (tCard.raw(pkg.cardKey) as { name: string }).name;
  const [picked, setPicked] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);
  const dates = (pkg.dates ?? []).filter((d) => d.to >= today);
  const at = (iso: string) => new Date(iso + 'T12:00:00');
  const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale, o).format(at(iso));

  return (
    <section id="pricing" className="relative overflow-hidden" style={{ backgroundColor: STONE }}>
      <div
        className="absolute -top-48 -left-40 w-[620px] h-[620px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(176,141,87,0.16), transparent 65%)' }}
      />
      <div className="relative px-5 md:px-[6vw] pt-16 md:pt-24 pb-16 md:pb-24">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 lg:gap-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
              <span className="text-[10px] uppercase tracking-[4px] font-semibold" style={{ color: BRASS_DARK }}>
                {t('label')}
              </span>
            </div>
            <h2 className="font-display font-light text-[clamp(32px,4vw,56px)] leading-[1.02] max-w-[640px]" style={{ color: INK }}>
              {t('title')}
            </h2>
          </div>
          <p className="font-serif italic text-[16px] md:text-[17px] leading-relaxed max-w-[440px]" style={{ color: 'rgba(28,26,21,0.62)' }}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Facts */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 mt-10 rounded-[10px] overflow-hidden"
          style={{ backgroundColor: DARK, boxShadow: '0 26px 60px rgba(13,18,12,0.22)' }}
        >
          {facts.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-5 md:py-6"
              style={{
                borderLeft: i % 2 ? '1px solid rgba(246,243,236,0.08)' : undefined,
                borderTop: i > 1 ? '1px solid rgba(246,243,236,0.08)' : undefined,
              }}
            >
              <span className="font-display font-light text-[40px] md:text-[48px] leading-none" style={{ color: BRASS_LIGHT }}>
                {f.value}
              </span>
              <span className="text-[11px] uppercase tracking-[1.8px] leading-snug" style={{ color: 'rgba(246,243,236,0.7)' }}>
                {f.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-8 items-stretch">
          {/* Open weekend + dates */}
          <motion.article
            className="lg:col-span-7 rounded-[10px] overflow-hidden flex flex-col"
            style={{ backgroundColor: DARK, boxShadow: '0 40px 90px rgba(13,18,12,0.35)' }}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[220px] md:h-[250px]">
              <Image src={OPEN_IMAGE} alt={open.name} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK} 2%, rgba(13,18,12,0.35) 60%, rgba(13,18,12,0.2))` }} />
              <span
                className="absolute top-5 left-6 flex items-center gap-2 text-[9.5px] uppercase tracking-[2.5px] font-bold px-3.5 py-1.5 rounded-full"
                style={{ backgroundColor: BRASS_LIGHT, color: '#141a12' }}
              >
                <Users size={12} strokeWidth={2.2} />
                {open.badge}
              </span>
              <div className="absolute inset-x-0 bottom-0 px-6 md:px-9 pb-2 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h3 className="font-display font-light text-[34px] md:text-[42px] leading-none" style={{ color: IVORY }}>
                    {open.name}
                  </h3>
                  <p className="font-serif italic text-[16px] mt-2" style={{ color: 'rgba(246,243,236,0.72)' }}>
                    {open.slogan}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-display text-[34px] leading-none" style={{ color: BRASS_LIGHT }}>
                    {open.price}
                  </div>
                  <div className="text-[10px] uppercase tracking-[1.8px] mt-1.5" style={{ color: 'rgba(246,243,236,0.5)' }}>
                    {open.info}
                  </div>
                  <div className="text-[9px] uppercase tracking-[1.5px] mt-1.5" style={{ color: BRASS_LIGHT }}>
                    {t('priceNote')}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 md:px-9 pt-7 pb-8 flex flex-col flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[3px] font-semibold" style={{ color: BRASS_LIGHT }}>
                  <CalendarDays size={14} strokeWidth={1.8} />
                  {t('datesTitle')}
                </div>
                <div className="text-[11px]" style={{ color: 'rgba(246,243,236,0.5)' }}>
                  {t('datesNote')}
                </div>
              </div>

              <ul className="list-none m-0 p-0 mt-4 flex flex-col gap-2.5">
                {dates.map((d) => {
                  const sel = picked === d.from;
                  return (
                    <li key={d.from}>
                      <button
                        onClick={() => {
                          setPicked(d.from);
                          chooseInForm({ name: formName, arrival: d.from, departure: d.to });
                        }}
                        className="w-full flex items-center gap-4 p-4 rounded-[8px] text-left cursor-pointer transition-colors duration-300"
                        style={{
                          backgroundColor: sel ? 'rgba(211,183,135,0.16)' : 'rgba(246,243,236,0.04)',
                          border: `1px solid ${sel ? BRASS_LIGHT : 'rgba(246,243,236,0.12)'}`,
                        }}
                        onMouseEnter={(e) => !sel && (e.currentTarget.style.borderColor = 'rgba(211,183,135,0.6)')}
                        onMouseLeave={(e) => !sel && (e.currentTarget.style.borderColor = 'rgba(246,243,236,0.12)')}
                      >
                        <span
                          className="shrink-0 w-[62px] h-[62px] rounded-[6px] hidden sm:flex flex-col items-center justify-center"
                          style={{ backgroundColor: sel ? BRASS_LIGHT : 'rgba(246,243,236,0.07)' }}
                        >
                          <span className="font-display text-[24px] leading-none" style={{ color: sel ? '#141a12' : IVORY }}>
                            {at(d.from).getDate()}
                          </span>
                          <span className="text-[9px] uppercase tracking-[1.5px] mt-1" style={{ color: sel ? '#141a12' : BRASS_LIGHT }}>
                            {fmt(d.from, { month: 'short' })}
                          </span>
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block font-display text-[19px] md:text-[21px] leading-tight" style={{ color: IVORY }}>
                            {/* Node and browsers use different thin spaces here; normalize so hydration matches */}
                            {new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' }).formatRange(at(d.from), at(d.to)).replace(/\s/g, ' ')}
                          </span>
                          <span className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                          <span className="text-[11.5px] capitalize" style={{ color: 'rgba(246,243,236,0.55)' }}>
                            {fmt(d.from, { weekday: 'long' })} – {fmt(d.to, { weekday: 'long' })}
                          </span>
                          <span className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[1.8px] font-semibold" style={{ color: d.guaranteed ? BRASS_LIGHT : '#9fc59a' }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.guaranteed ? BRASS_LIGHT : '#9fc59a' }} />
                            {d.guaranteed ? t('guaranteed') : t('dateStatus')}
                          </span>
                          </span>
                        </span>
                        <span
                          className="shrink-0 flex items-center gap-1.5 text-[9.5px] uppercase tracking-[2px] font-semibold px-3 py-2 rounded-full"
                          style={sel ? { backgroundColor: BRASS_LIGHT, color: '#141a12' } : { border: '1px solid rgba(246,243,236,0.3)', color: IVORY }}
                        >
                          {sel && <Check size={12} strokeWidth={2.6} />}
                          {sel ? t('chosen') : t('chooseDate')}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <p className="text-[12.5px] leading-relaxed mt-4" style={{ color: 'rgba(246,243,236,0.68)' }}>
                {t('datesPolicy')}
              </p>

              <div className="h-px my-7" style={{ backgroundColor: 'rgba(246,243,236,0.1)' }} />

              <ul className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {open.includes.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[13.5px] leading-snug" style={{ color: 'rgba(246,243,236,0.82)' }}>
                    <Check size={14} strokeWidth={2.4} className="shrink-0 mt-[2px]" style={{ color: BRASS_LIGHT }} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-8">
                <span className="text-[10px] uppercase tracking-[2px]" style={{ color: 'rgba(246,243,236,0.45)' }}>
                  {open.minNote}
                </span>
                <button
                  onClick={() => {
                    const first = dates.find((d) => d.from === picked) ?? dates[0];
                    if (first) setPicked(first.from);
                    chooseInForm({ name: formName, arrival: first?.from, departure: first?.to });
                  }}
                  className="px-7 py-4 text-[11px] font-semibold uppercase tracking-[2.5px] cursor-pointer border-none rounded-[3px] transition-colors duration-300"
                  style={{ backgroundColor: BRASS_LIGHT, color: '#141a12' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = IVORY)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRASS_LIGHT)}
                >
                  {open.cta} →
                </button>
              </div>
            </div>
          </motion.article>

          {/* Private weekend */}
          <motion.article
            className="lg:col-span-5 lg:self-start lg:sticky lg:top-24 rounded-[10px] overflow-hidden flex flex-col"
            style={{ backgroundColor: '#fbf9f3', boxShadow: '0 26px 60px rgba(28,26,21,0.14)' }}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[240px] lg:h-[280px]">
              <Image src={PRIVATE_IMAGE} alt={priv.name} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.6), transparent 55%)' }} />
              <span
                className="absolute top-5 left-6 text-[9.5px] uppercase tracking-[2.5px] font-bold px-3.5 py-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(246,243,236,0.92)', color: '#141a12' }}
              >
                {priv.badge}
              </span>
              <h3 className="absolute bottom-5 left-6 right-6 font-display font-light text-[32px] md:text-[36px] leading-none" style={{ color: IVORY }}>
                {priv.name}
              </h3>
            </div>
            <div className="p-6 md:p-8 flex flex-col">
              <p className="font-serif italic text-[16px] leading-snug" style={{ color: 'rgba(28,26,21,0.62)' }}>
                {priv.slogan}
              </p>
              <div className="flex items-end justify-between gap-4 mt-5 pb-5" style={{ borderBottom: '1px solid rgba(28,26,21,0.1)' }}>
                <div>
                  <div className="font-display text-[34px] leading-none" style={{ color: INK }}>
                    {priv.price}
                  </div>
                  <div className="text-[10px] uppercase tracking-[1.8px] mt-1.5" style={{ color: 'rgba(28,26,21,0.5)' }}>
                    {priv.info}
                  </div>
                  <div className="text-[9px] uppercase tracking-[1.5px] mt-1.5" style={{ color: BRASS_DARK }}>
                    {t('priceNote')}
                  </div>
                </div>
                <span
                  className="text-[9.5px] uppercase tracking-[2px] font-semibold px-3 py-2 rounded-full whitespace-nowrap"
                  style={{ border: '1px solid rgba(176,141,87,0.5)', color: BRASS_DARK }}
                >
                  {priv.minNote}
                </span>
              </div>
              {priv.includesLabel && (
                <div className="text-[9.5px] uppercase tracking-[2px] font-bold mt-5 mb-3" style={{ color: BRASS_DARK }}>
                  {priv.includesLabel}
                </div>
              )}
              <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                {priv.includes.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[13.5px] leading-snug" style={{ color: 'rgba(28,26,21,0.75)' }}>
                    <Check size={14} strokeWidth={2.4} className="shrink-0 mt-[2px]" style={{ color: BRASS }} />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => chooseInForm({ name: formName })}
                className="w-full py-4 text-[11px] font-semibold uppercase tracking-[2.5px] cursor-pointer rounded-[3px] transition-colors duration-300"
                style={{ backgroundColor: INK, color: IVORY, border: 'none', marginTop: 28 }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRASS_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
              >
                {priv.cta} →
              </button>
            </div>
          </motion.article>
        </div>

        {/* How booking works */}
        <div className="mt-12">
          <div className="text-[10px] uppercase tracking-[3.5px] font-semibold" style={{ color: BRASS_DARK }}>
            {t('stepsTitle')}
          </div>
          <ol className="list-none m-0 p-0 mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-4 p-5 rounded-[8px]" style={{ backgroundColor: 'rgba(251,249,243,0.7)', border: '1px solid rgba(28,26,21,0.08)' }}>
                <span className="font-display italic text-[30px] leading-none shrink-0" style={{ color: BRASS }}>
                  {i + 1}
                </span>
                <span className="text-[14px] leading-snug pt-1" style={{ color: 'rgba(28,26,21,0.75)' }}>
                  {s}
                </span>
              </li>
            ))}
          </ol>

          {/* Cancellation + getting here */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
            <div className="p-5 md:p-6 rounded-[8px]" style={{ backgroundColor: 'rgba(251,249,243,0.7)', border: '1px solid rgba(28,26,21,0.08)' }}>
              <div className="text-[10px] uppercase tracking-[3px] font-semibold" style={{ color: BRASS_DARK }}>
                {t('cancelTitle')}
              </div>
              <dl className="m-0 mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
                {cancel.map((c) => (
                  <div key={c.value}>
                    <dt className="font-display text-[20px] md:text-[22px] leading-tight" style={{ color: INK }}>
                      {c.value}
                    </dt>
                    <dd className="m-0 mt-1 text-[12.5px] leading-snug" style={{ color: 'rgba(28,26,21,0.65)' }}>
                      {c.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="p-5 md:p-6 rounded-[8px]" style={{ backgroundColor: 'rgba(251,249,243,0.7)', border: '1px solid rgba(28,26,21,0.08)' }}>
              <div className="text-[10px] uppercase tracking-[3px] font-semibold" style={{ color: BRASS_DARK }}>
                {t('arrivalTitle')}
              </div>
              <ul className="list-none m-0 p-0 mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
                {arrivals.map((a) => (
                  <li key={a.city}>
                    <span className="block font-display text-[20px] md:text-[22px] leading-tight" style={{ color: INK }}>
                      {a.time}
                    </span>
                    <span className="block mt-1 text-[12.5px] leading-snug" style={{ color: 'rgba(28,26,21,0.65)' }}>
                      {a.city}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[12.5px] leading-snug mt-4" style={{ color: 'rgba(28,26,21,0.65)' }}>
                {t('arrivalNote')}
              </p>
            </div>
          </div>

          <p className="font-serif italic text-[12.5px] mt-6" style={{ color: 'rgba(28,26,21,0.45)' }}>
            {t('footerNote')}
          </p>
        </div>
      </div>
    </section>
  );
}
