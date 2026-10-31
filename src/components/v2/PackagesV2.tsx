'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { PACKAGES, tNs, type PackageDef } from '@/lib/packages';

// Package index (homepage, and "more packages" under a package page).
// Full-bleed photo cards: name and price always visible, highlights slide in
// on hover. Adding a package to src/lib/packages.ts adds its card here.
const INK = '#1c1a15';
const DARK = '#0d120c';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';
const BRASS_DARK = '#8a6b3f';
const BRASS_LIGHT = '#d3b787';

interface CardText {
  badge: string;
  name: string;
  tagline: string;
  length: string;
  group: string;
  price: string;
}

function Card({ pkg, index }: { pkg: PackageDef; index: number }) {
  const t = useTranslations('home.packages');
  const tHero = useTranslations(tNs(pkg.ns, 'hero'));
  const c = t.raw(`cards.${pkg.cardKey}`) as CardText;
  const hooks = (tHero.raw('hooks') as string[]).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/${pkg.slug}`}
        className="group relative block aspect-[4/5] lg:aspect-[3/4] rounded-[8px] overflow-hidden no-underline"
        style={{ boxShadow: '0 30px 70px rgba(13,18,12,0.28)' }}
      >
        <Image
          src={pkg.image}
          alt={c.name}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.96) 0%, rgba(13,18,12,0.55) 42%, rgba(13,18,12,0.05) 72%)' }}
        />

        {/* Top row */}
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between gap-3">
          <span
            className="text-[9px] uppercase tracking-[2.5px] font-bold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(246,243,236,0.92)', color: '#141a12' }}
          >
            {c.badge}
          </span>
          <span
            className="text-right rounded-[4px] px-3.5 py-2 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(13,18,12,0.45)', border: '1px solid rgba(211,183,135,0.35)' }}
          >
            <span className="block font-display text-[19px] leading-none" style={{ color: BRASS_LIGHT }}>
              {c.price}
            </span>
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px" style={{ backgroundColor: BRASS }} />
            <span className="text-[10px] uppercase tracking-[3px] font-semibold" style={{ color: BRASS_LIGHT }}>
              {c.length}
            </span>
          </div>
          <h3 className="font-display font-light text-[32px] md:text-[36px] leading-[1.02]" style={{ color: IVORY }}>
            {c.name}
          </h3>
          <p className="font-serif italic text-[16px] leading-snug mt-2" style={{ color: 'rgba(246,243,236,0.75)' }}>
            {c.tagline}
          </p>

          {/* Revealed on hover (always shown on touch screens) */}
          <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
            <div className="overflow-hidden">
              <ul className="list-none p-0 m-0 mt-5 pt-4 flex flex-col gap-2" style={{ borderTop: '1px solid rgba(246,243,236,0.14)' }}>
                {hooks.map((h, i) => (
                  <li key={i} className="flex items-center gap-3 text-[13px]" style={{ color: 'rgba(246,243,236,0.85)' }}>
                    <span className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ backgroundColor: BRASS_LIGHT }} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <span className="text-[10px] uppercase tracking-[2px]" style={{ color: 'rgba(246,243,236,0.55)' }}>
              {c.group}
            </span>
            <span
              className="flex items-center gap-2 text-[10px] uppercase tracking-[2.5px] font-semibold px-4 py-2.5 rounded-full transition-colors duration-300 group-hover:bg-[#d3b787] group-hover:text-[#141a12]"
              style={{ border: '1px solid rgba(211,183,135,0.5)', color: BRASS_LIGHT }}
            >
              {t('view')} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PackagesV2({ exclude }: { exclude?: string } = {}) {
  const t = useTranslations('home.packages');
  const items = PACKAGES.filter((p) => p.slug !== exclude);

  return (
    <section id="packages" className="relative scroll-mt-16 overflow-hidden" style={{ backgroundColor: '#ede7da' }}>
      <div
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(176,141,87,0.16), transparent 65%)' }}
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
              {exclude ? t('otherTitle') : t('title')}
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            {!exclude && (
              <p className="font-serif italic text-[16px] leading-relaxed max-w-[380px] md:text-right" style={{ color: 'rgba(28,26,21,0.6)' }}>
                {t('subtitle')}
              </p>
            )}
            <Link
              href="/packages#compare"
              className="text-[10px] uppercase tracking-[2.5px] font-semibold no-underline pb-1 border-b self-start md:self-auto"
              style={{ color: BRASS_DARK, borderColor: 'rgba(138,107,63,0.4)' }}
            >
              {t('compare')} →
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mt-12">
          {items.map((p, i) => (
            <Card key={p.slug} pkg={p} index={i} />
          ))}

          {/* Coming next */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: items.length * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] lg:aspect-[3/4] rounded-[8px] overflow-hidden p-7 md:p-8 flex flex-col justify-between"
            style={{ backgroundColor: DARK }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.07]"
              style={{ backgroundImage: 'repeating-linear-gradient(135deg, #d3b787 0 1px, transparent 1px 14px)' }}
            />
            <div className="relative">
              <span className="text-[9px] uppercase tracking-[2.5px] font-bold px-3 py-1.5 rounded-full" style={{ border: '1px solid rgba(211,183,135,0.5)', color: BRASS_LIGHT }}>
                {t('soon.badge')}
              </span>
            </div>
            <div className="relative">
              <h3 className="font-display font-light text-[32px] md:text-[36px] leading-[1.02]" style={{ color: IVORY }}>
                {t('soon.title')}
              </h3>
              <p className="font-serif italic text-[16px] leading-snug mt-3" style={{ color: 'rgba(246,243,236,0.65)' }}>
                {t('soon.text')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-7 text-[10px] uppercase tracking-[2.5px] font-semibold no-underline px-4 py-2.5 rounded-full"
                style={{ border: '1px solid rgba(211,183,135,0.5)', color: BRASS_LIGHT }}
              >
                {t('soon.cta')} →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
