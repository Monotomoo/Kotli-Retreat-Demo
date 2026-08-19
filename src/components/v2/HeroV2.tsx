'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';

// V2 Hero — Editorial × Dark, with soul: film grain, warm brass glow,
// poetic serif line, coordinates rail. Luxury "trip ticket" card.
//
// Layout note: the video background is shared, but the content has two tracks.
// Desktop (md+): one full-viewport bottom row — title+poetic+actions left,
// ticket right (unchanged). Mobile: the first screen is video + title + poetic
// only; the actions and ticket are pushed BELOW the fold onto ink.
const INK = '#0d120c';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';
const BRASS_LIGHT = '#d3b787';

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

// Evocative line — the "soul" sentence under the title
const POETIC: Record<string, string> = {
  de: 'Trüffel im Morgennebel. Wein aus vier Erden. Ein Steindorf nur für Sie.',
  en: 'Truffles in morning mist. Wine from four soils. A stone village all to yourselves.',
  hr: 'Tartufi u jutarnjoj magli. Vino iz četiri zemlje. Kameno selo samo za vas.',
  sl: 'Tartufi v jutranji megli. Vino iz štirih zemelj. Kamnita vas samo za vas.',
};

// Subtle film grain (inline SVG noise)
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export default function HeroV2() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 500], ['0%', '20%']);

  const titleWords = (t('title') as string).split(' ');
  const hooks = t.raw('hooks') as string[];
  const poetic = POETIC[locale] ?? POETIC.de;

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToIncludes = () =>
    document.getElementById('includes')?.scrollIntoView({ behavior: 'smooth' });

  // Hold the hero content back so the video's own "Kotli Istra" intro title
  // has time to clear before the site text fades in. Tune this one number.
  const REVEAL_DELAY = 1.2;

  // ---- Reusable content pieces (fresh JSX per call → safe to place twice) ----
  const renderIntro = () => (
    <>
      <motion.div
        className="flex items-center gap-4 mb-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: REVEAL_DELAY + 0.2, ease: 'easeOut' }}
      >
        <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
        <span
          className="text-[10px] uppercase tracking-[4px] font-sans font-medium"
          style={{ color: 'rgba(246,243,236,0.7)' }}
        >
          {t('subtitle')}
        </span>
      </motion.div>

      <h1
        className="font-display font-light text-[clamp(46px,7vw,92px)] leading-[0.98] mb-5"
        style={{ color: IVORY }}
      >
        {titleWords.map((word, i) => {
          const isLast = i === titleWords.length - 1;
          const isAmp = word === '&';
          return (
            <motion.span
              key={i}
              className={`inline-block mr-[0.28em] ${isLast || isAmp ? 'italic' : ''} ${isAmp ? 'font-serif text-[0.82em]' : ''}`}
              style={isLast ? { color: BRASS_LIGHT } : isAmp ? { color: BRASS } : undefined}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: REVEAL_DELAY + 0.35 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          );
        })}
      </h1>

      <motion.p
        className="font-serif italic text-[17px] md:text-[19px] leading-relaxed max-w-[480px]"
        style={{ color: 'rgba(246,243,236,0.78)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: REVEAL_DELAY + 0.75, ease: 'easeOut' }}
      >
        {poetic}
      </motion.p>
    </>
  );

  const renderActions = () => (
    <>
      <button
        onClick={scrollToContact}
        className="px-8 py-4 text-[11px] font-semibold uppercase tracking-[2.5px] font-sans cursor-pointer border-none rounded-[2px] transition-colors duration-300"
        style={{ backgroundColor: IVORY, color: '#141a12' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRASS_LIGHT)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = IVORY)}
      >
        {t('cta')} →
      </button>
      <span
        onClick={scrollToIncludes}
        className="text-[10px] uppercase tracking-[2.5px] cursor-pointer pb-1 border-b transition-colors duration-300"
        style={{ color: 'rgba(246,243,236,0.65)', borderColor: 'rgba(246,243,236,0.3)' }}
      >
        {t('ctaSecondary')} ↓
      </span>
    </>
  );

  const renderTicket = () => (
    <div
      className="backdrop-blur-xl rounded-[4px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      style={{ backgroundColor: 'rgba(13,18,12,0.66)', border: `1px solid rgba(211,183,135,0.28)` }}
    >
      {/* Ticket header */}
      <div
        className="flex items-center justify-between px-6 pt-4 pb-3"
        style={{ borderBottom: '1px solid rgba(246,243,236,0.09)' }}
      >
        <span className="text-[9px] uppercase tracking-[3.5px] font-semibold" style={{ color: BRASS_LIGHT }}>
          Kotli Retreat — Istria
        </span>
        <span className="text-[9px] uppercase tracking-[3.5px]" style={{ color: 'rgba(246,243,236,0.45)' }}>
          2026
        </span>
      </div>

      {/* Main row: days + price */}
      <div className="px-5 md:px-6 py-4 md:py-5" style={{ borderBottom: '1px solid rgba(246,243,236,0.09)' }}>
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display font-light text-[46px] md:text-[62px] leading-[0.85]" style={{ color: IVORY }}>
              {t('days')}
            </span>
            <span className="text-[11px] uppercase tracking-[3px] font-semibold" style={{ color: 'rgba(246,243,236,0.8)' }}>
              {t('daysLabel')}
            </span>
          </div>
          <div className="text-right">
            <div className="font-display text-[24px] leading-none" style={{ color: BRASS_LIGHT }}>
              {t('price')}
            </div>
            <div className="text-[9px] uppercase tracking-[2px] mt-1.5" style={{ color: 'rgba(246,243,236,0.5)' }}>
              {t('pricePer')}
            </div>
          </div>
        </div>
        <div className="mt-3.5 md:mt-4 flex items-center gap-2.5">
          <span
            className="text-[8.5px] font-bold uppercase tracking-[2px] px-2.5 py-1 rounded-[2px]"
            style={{ backgroundColor: BRASS_LIGHT, color: '#141a12' }}
          >
            {t('allInclusive')}
          </span>
          <span className="text-[9px] uppercase tracking-[2px]" style={{ color: 'rgba(246,243,236,0.55)' }}>
            {t('people')}
          </span>
        </div>
      </div>

      {/* Tasting-menu style hooks */}
      <div className="px-5 md:px-6 py-1 md:py-2">
        {hooks.map((hook, i) => (
          <motion.div
            key={i}
            className="flex items-baseline gap-4 py-2 md:py-2.5"
            style={i > 0 ? { borderTop: '1px solid rgba(246,243,236,0.06)' } : undefined}
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.09, ease: 'easeOut' }}
          >
            <span className="font-serif italic text-[13px] w-7 shrink-0" style={{ color: BRASS }}>
              {ROMAN[i]}.
            </span>
            <span className="text-[13.5px] leading-snug" style={{ color: 'rgba(246,243,236,0.88)' }}>
              {hook}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Perforated CTA row */}
      <div className="relative" style={{ borderTop: '1px dashed rgba(246,243,236,0.18)' }}>
        <span
          className="absolute -left-2 top-0 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{ backgroundColor: INK, border: '1px solid rgba(246,243,236,0.12)' }}
        />
        <span
          className="absolute -right-2 top-0 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{ backgroundColor: INK, border: '1px solid rgba(246,243,236,0.12)' }}
        />
        <button
          onClick={scrollToContact}
          className="w-full px-6 py-4 text-[10px] font-semibold uppercase tracking-[3px] font-sans cursor-pointer border-none bg-transparent transition-colors duration-300 flex items-center justify-center gap-2"
          style={{ color: BRASS_LIGHT }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = BRASS_LIGHT;
            e.currentTarget.style.color = '#141a12';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = BRASS_LIGHT;
          }}
        >
          {t('cta')} →
        </button>
      </div>
    </div>
  );

  return (
    <section className="relative md:h-screen md:min-h-[720px] overflow-hidden" style={{ backgroundColor: INK }}>
      {/* Shared media — covers the first screen on mobile, the full hero on desktop */}
      <div className="absolute top-0 left-0 right-0 h-[100svh] md:h-full overflow-hidden">
        {/* Fallback image (paints under the video) */}
        <Image
          src="/images/kotli/village-street.jpg"
          alt="Kotli stone village"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Video with parallax */}
        <motion.div className="absolute inset-0 w-full h-full" style={{ y: videoY }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/kotli/village-street.jpg"
          >
            <source src="/images/hero/kotli-hero-web.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Cinematic overlays */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/60 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(13,18,12,0.94) 0%, rgba(13,18,12,0.35) 45%, rgba(13,18,12,0.05) 100%)`,
          }}
        />
        <div
          className="absolute -left-32 bottom-0 w-[75vw] h-[65vh] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(176,141,87,0.18), transparent 62%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{ background: 'linear-gradient(to top right, rgba(176,141,87,0.22), transparent 55%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: GRAIN, opacity: 0.07 }}
        />
      </div>

      {/* Coordinates rail — left margin annotation (desktop) */}
      <motion.div
        className="absolute left-[1.6vw] bottom-20 z-10 hidden xl:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <span
          className="text-[8.5px] uppercase tracking-[3px] [writing-mode:vertical-rl] rotate-180"
          style={{ color: 'rgba(246,243,236,0.38)' }}
        >
          45°20′N · 13°57′E — Kotli, Istria
        </span>
        <span className="w-1 h-1 rotate-45" style={{ backgroundColor: BRASS }} />
        <motion.span
          className="w-px h-12"
          style={{ backgroundColor: 'rgba(211,183,135,0.35)' }}
          animate={{ scaleY: [1, 0.55, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ===== Desktop layout — full-viewport bottom row (unchanged) ===== */}
      <div className="hidden md:flex relative z-10 w-full h-full items-end justify-between px-[6vw] pb-20 gap-14">
        <div className="max-w-[680px]">
          {renderIntro()}
          <motion.div
            className="flex items-center gap-7 mt-9"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: REVEAL_DELAY + 0.95, ease: 'easeOut' }}
          >
            {renderActions()}
          </motion.div>
        </div>

        <motion.div
          className="w-[372px] shrink-0"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: REVEAL_DELAY + 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderTicket()}
        </motion.div>
      </div>

      {/* ===== Mobile layout — first screen = video + intro; rest below fold ===== */}
      <div className="md:hidden relative z-10">
        {/* First screen: intro anchored to the bottom of the video */}
        <div className="min-h-[100svh] flex flex-col justify-end px-5 pt-28 pb-28">
          {renderIntro()}
        </div>

        {/* Below the fold: actions + ticket on ink */}
        <div className="px-5 pt-10 pb-16 flex flex-col gap-9">
          <motion.div
            className="flex items-center gap-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {renderActions()}
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderTicket()}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
