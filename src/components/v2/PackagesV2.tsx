'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { PACKAGES, tNs, type PackageDef } from '@/lib/packages';

// Homepage package section. One package is FEATURED (the one we are selling
// now — Winter at Kotli): a large card with a "now booking" badge and direct
// booking actions. The others sit beside it as compact photo cards.
const FEATURED = 'winter-truffles';

const INK = '#1c1a15';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';
const BRASS_DARK = '#8a6b3f';
const BRASS_LIGHT = '#d3b787';

interface CardText {
  badge: string;
  name: string;
  tagline: string;
  intro: string;
  length: string;
  group: string;
  price: string;
}

const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

function FeaturedCard({ pkg }: { pkg: PackageDef }) {
  const t = useTranslations('home.packages');
  const tHero = useTranslations(tNs(pkg.ns, 'hero'));
  const c = t.raw(`cards.${pkg.cardKey}`) as CardText;
  const hooks = tHero.raw('hooks') as string[];

  return (
    <motion.article
      className="lg:col-span-7 relative min-h-[800px] sm:min-h-[640px] lg:min-h-[680px] rounded-[10px] overflow-hidden flex flex-col justify-end group"
      style={{ boxShadow: '0 40px 90px rgba(13,18,12,0.35)' }}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={pkg.image}
        alt={c.name}
        fill
        sizes="(min-width:1024px) 58vw, 100vw"
        className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.97) 0%, rgba(13,18,12,0.78) 38%, rgba(13,18,12,0.15) 70%, rgba(13,18,12,0.35) 100%)' }}
      />
      <div className="absolute -left-24 bottom-0 w-[70%] h-[60%] pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(176,141,87,0.28), transparent 65%)' }} />

      {/* Now booking */}
      <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
        <span
          className="flex items-center gap-2.5 text-[10px] uppercase tracking-[2.5px] font-bold px-4 py-2 rounded-full"
          style={{ backgroundColor: BRASS_LIGHT, color: '#141a12' }}
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: '#141a12', opacity: 0.45 }} />
            <span className="relative w-2 h-2 rounded-full" style={{ backgroundColor: '#141a12' }} />
          </span>
          {t('featured.badge')}
        </span>
        <span
          className="text-[9.5px] uppercase tracking-[2.5px] font-semibold px-3.5 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(13,18,12,0.45)', border: '1px solid rgba(246,243,236,0.3)', color: IVORY }}
        >
          {c.length}
        </span>
      </div>

      <div className="relative p-7 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px" style={{ backgroundColor: BRASS }} />
          <span className="text-[10px] uppercase tracking-[3px] font-semibold" style={{ color: BRASS_LIGHT }}>
            {c.badge}
          </span>
        </div>
        <h3 className="font-display font-light text-[clamp(42px,5.2vw,72px)] leading-[0.96]" style={{ color: IVORY }}>
          {c.name}
        </h3>
        <p className="font-serif italic text-[18px] md:text-[21px] leading-snug mt-3 max-w-[560px]" style={{ color: 'rgba(246,243,236,0.82)' }}>
          {c.tagline}
        </p>

        <ul className="list-none p-0 m-0 mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 max-w-[600px]">
          {hooks.map((h, i) => (
            <li key={i} className="flex items-center gap-3 text-[14px]" style={{ color: 'rgba(246,243,236,0.88)' }}>
              <span className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ backgroundColor: BRASS_LIGHT }} />
              {h}
            </li>
          ))}
        </ul>

        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-9 pt-7"
          style={{ borderTop: '1px solid rgba(246,243,236,0.14)' }}
        >
          <div>
            <div className="font-display text-[38px] leading-none" style={{ color: BRASS_LIGHT }}>
              {c.price}
            </div>
            <div className="text-[10px] uppercase tracking-[2px] mt-2" style={{ color: 'rgba(246,243,236,0.55)' }}>
              {t('featured.note')}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                // Preselect this package in the inquiry form, then go there.
                window.dispatchEvent(new CustomEvent('kotli:choose-package', { detail: c.name }));
                scrollToContact();
              }}
              className="px-7 py-4 text-[11px] font-semibold uppercase tracking-[2.5px] cursor-pointer border-none rounded-[3px] transition-colors duration-300"
              style={{ backgroundColor: BRASS_LIGHT, color: '#141a12' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = IVORY)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRASS_LIGHT)}
            >
              {t('featured.cta')} →
            </button>
            <Link
              href={`/${pkg.slug}`}
              className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[2.5px] no-underline rounded-[3px] transition-colors duration-300 hover:bg-[#f6f3ec]/10"
              style={{ border: '1px solid rgba(246,243,236,0.4)', color: IVORY }}
            >
              {t('view')}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SideCard({ pkg, index }: { pkg: PackageDef; index: number }) {
  const t = useTranslations('home.packages');
  const c = t.raw(`cards.${pkg.cardKey}`) as CardText;

  return (
    <motion.div
      className="flex-1"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.12 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/${pkg.slug}`}
        className="group flex flex-col h-full rounded-[10px] overflow-hidden no-underline"
        style={{ backgroundColor: '#fbf9f3', boxShadow: '0 26px 60px rgba(28,26,21,0.14)' }}
      >
        <div className="relative h-[260px] lg:flex-1 lg:min-h-[300px] overflow-hidden">
          <Image
            src={pkg.image}
            alt={c.name}
            fill
            sizes="(min-width:1024px) 40vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.55), transparent 50%)' }} />
          <span
            className="absolute top-5 left-5 text-[9px] uppercase tracking-[2.5px] font-bold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(246,243,236,0.92)', color: '#141a12' }}
          >
            {c.badge}
          </span>
          <span className="absolute bottom-5 left-6 font-display italic text-[20px]" style={{ color: IVORY }}>
            {c.length}
          </span>
        </div>
        <div className="p-7">
          <h3 className="font-display font-light text-[32px] leading-[1.02]" style={{ color: INK }}>
            {c.name}
          </h3>
          <p className="font-serif italic text-[16px] leading-snug mt-2" style={{ color: 'rgba(28,26,21,0.6)' }}>
            {c.tagline}
          </p>
          <div className="flex items-end justify-between gap-4 mt-6 pt-5" style={{ borderTop: '1px solid rgba(28,26,21,0.1)' }}>
            <div>
              <div className="font-display text-[26px] leading-none" style={{ color: INK }}>
                {c.price}
              </div>
              <div className="text-[10px] uppercase tracking-[2px] mt-2" style={{ color: 'rgba(28,26,21,0.45)' }}>
                {c.group}
              </div>
            </div>
            <span
              className="flex items-center gap-2 text-[10px] uppercase tracking-[2.5px] font-semibold px-4 py-2.5 rounded-full transition-colors duration-300 group-hover:bg-[#1c1a15] group-hover:text-[#f6f3ec]"
              style={{ border: '1px solid rgba(28,26,21,0.3)', color: INK }}
            >
              {t('view')} →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PackagesV2() {
  const t = useTranslations('home.packages');
  const featured = PACKAGES.find((p) => p.slug === FEATURED) ?? PACKAGES[0];
  const others = PACKAGES.filter((p) => p !== featured);

  return (
    <section id="packages" className="relative scroll-mt-16 overflow-hidden" style={{ backgroundColor: '#ede7da' }}>
      <div
        className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(176,141,87,0.18), transparent 65%)' }}
      />
      <div className="relative px-5 md:px-[6vw] pt-16 md:pt-24 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-10"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
              <span className="text-[10px] uppercase tracking-[4px] font-semibold" style={{ color: BRASS_DARK }}>
                {t('label')}
              </span>
            </div>
            <h2 className="font-display font-light text-[clamp(32px,4vw,56px)] leading-[1.02] max-w-[680px]" style={{ color: INK }}>
              {t('title')}
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <p className="font-serif italic text-[16px] leading-relaxed max-w-[380px] md:text-right" style={{ color: 'rgba(28,26,21,0.6)' }}>
              {t('subtitle')}
            </p>
            <Link
              href="/packages#compare"
              className="text-[10px] uppercase tracking-[2.5px] font-semibold no-underline pb-1 border-b self-start md:self-auto"
              style={{ color: BRASS_DARK, borderColor: 'rgba(138,107,63,0.4)' }}
            >
              {t('compare')} →
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-12">
          <FeaturedCard pkg={featured} />
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {others.map((p, i) => (
              <SideCard key={p.slug} pkg={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
