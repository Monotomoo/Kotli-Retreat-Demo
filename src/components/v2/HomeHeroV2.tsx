'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';

// Homepage hero — the place, not a package. Same film language as the package
// hero (video, grain, brass glow); its actions lead to the package cards.
const INK = '#0d120c';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';
const BRASS_LIGHT = '#d3b787';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

const REVEAL_DELAY = 1.2;

export default function HomeHeroV2() {
  const t = useTranslations('home.hero');
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 500], ['0%', '20%']);
  const titleWords = t('title').split(' ');
  const facts = t.raw('facts') as string[];

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden" style={{ backgroundColor: INK }}>
      <div className="absolute inset-0 overflow-hidden">
        <Image src="/images/kotli/village-street.jpg" alt="Kotli stone village" fill className="object-cover" priority sizes="100vw" />
        <motion.div className="absolute inset-0" style={{ y: videoY }}>
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" poster="/images/kotli/village-street.jpg">
            <source src="/images/hero/kotli-hero-web.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/60 to-transparent" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.95) 0%, rgba(13,18,12,0.4) 50%, rgba(13,18,12,0.08) 100%)' }}
        />
        <div
          className="absolute -left-32 bottom-0 w-[75vw] h-[65vh] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(176,141,87,0.2), transparent 62%)' }}
        />
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ backgroundImage: GRAIN, opacity: 0.07 }} />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-[6vw] pb-16 md:pb-20">
        <motion.div
          className="flex items-center gap-4 mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: REVEAL_DELAY + 0.2, ease: 'easeOut' }}
        >
          <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
          <span className="text-[10px] uppercase tracking-[4px] font-sans font-medium" style={{ color: 'rgba(246,243,236,0.7)' }}>
            {t('eyebrow')}
          </span>
        </motion.div>

        <h1 className="font-display font-light text-[clamp(52px,8vw,112px)] leading-[0.96] mb-5" style={{ color: IVORY }}>
          {titleWords.map((word, i) => {
            const isLast = i === titleWords.length - 1;
            return (
              <Fragment key={i}>
                <motion.span
                  className={`inline-block ${isLast ? 'italic' : ''}`}
                  style={isLast ? { color: BRASS_LIGHT } : undefined}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: REVEAL_DELAY + 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
                {!isLast && ' '}
              </Fragment>
            );
          })}
        </h1>

        <motion.p
          className="font-serif italic text-[17px] md:text-[21px] leading-relaxed max-w-[560px]"
          style={{ color: 'rgba(246,243,236,0.8)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: REVEAL_DELAY + 0.7, ease: 'easeOut' }}
        >
          {t('poetic')}
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mt-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: REVEAL_DELAY + 0.9, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollTo('packages')}
              className="px-8 py-4 text-[11px] font-semibold uppercase tracking-[2.5px] font-sans cursor-pointer border-none rounded-[2px] transition-colors duration-300"
              style={{ backgroundColor: IVORY, color: '#141a12' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRASS_LIGHT)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = IVORY)}
            >
              {t('cta')} ↓
            </button>
            <span
              onClick={() => scrollTo('contact')}
              className="text-[10px] uppercase tracking-[2.5px] cursor-pointer pb-1 border-b"
              style={{ color: 'rgba(246,243,236,0.65)', borderColor: 'rgba(246,243,236,0.3)' }}
            >
              {t('ctaSecondary')} →
            </span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {facts.map((f, i) => (
              <span key={i} className="flex items-center gap-2.5 text-[10px] uppercase tracking-[2.5px]" style={{ color: 'rgba(246,243,236,0.6)' }}>
                <span className="w-1 h-1 rotate-45" style={{ backgroundColor: BRASS }} />
                {f}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
