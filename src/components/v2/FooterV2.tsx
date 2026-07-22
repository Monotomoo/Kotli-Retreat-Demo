'use client';

import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

// V2 Footer — the closing act. CTA band, editorial link columns, legal bar,
// and the wow: a giant "Soil & Soul" wordmark that fills with brass as you
// scroll it into view (scroll-linked gradient text fill).
const INK = '#0a0e09';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';
const BRASS_LIGHT = '#d3b787';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export default function FooterV2() {
  const t = useTranslations('footer');
  const tHeader = useTranslations('header');
  const locale = useLocale();

  const footerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ['start end', 'end end'] });
  const fill = useTransform(scrollYProgress, [0.35, 0.95], [0, 100]);
  const wordmarkBg = useMotionTemplate`linear-gradient(90deg, ${BRASS_LIGHT} ${fill}%, rgba(246,243,236,0.13) ${fill}%)`;

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  const experienceLinks = [
    { key: 'whyIstria', href: '#why' },
    { key: 'hosts', href: '#hosts' },
    { key: 'agenda', href: '#agenda' },
    { key: 'pricing', href: '#pricing' },
  ];

  return (
    <footer ref={footerRef} id="footer" className="relative" style={{ backgroundColor: INK }}>
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: GRAIN, opacity: 0.05 }}
      />

      {/* Ornament seam */}
      <div className="relative flex items-center gap-4 px-5 md:px-[6vw] pt-14 md:pt-16">
        <span className="flex-1 h-px" style={{ backgroundColor: 'rgba(211,183,135,0.25)' }} />
        <span className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: BRASS }} />
        <span className="flex-1 h-px" style={{ backgroundColor: 'rgba(211,183,135,0.25)' }} />
      </div>

      <div className="relative px-5 md:px-[6vw]">
        {/* CTA band */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pt-12 md:pt-16 pb-12 md:pb-16">
          <motion.p
            className="font-serif italic text-[19px] md:text-[24px] leading-relaxed max-w-[520px]"
            style={{ color: 'rgba(246,243,236,0.75)' }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('brand')}
          </motion.p>
          <motion.div
            className="flex items-center gap-5 shrink-0"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
          >
            <button
              onClick={scrollToContact}
              className="px-9 py-4 text-[11px] font-semibold uppercase tracking-[2.5px] font-sans cursor-pointer border-none rounded-[2px] transition-colors duration-300"
              style={{ backgroundColor: IVORY, color: '#141a12' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRASS_LIGHT)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = IVORY)}
            >
              {tHeader('cta')} →
            </button>
            <a
              href="https://wa.me/385992563862"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[2.5px] font-semibold no-underline pb-1 border-b transition-colors duration-300"
              style={{ color: 'rgba(246,243,236,0.65)', borderColor: 'rgba(246,243,236,0.3)' }}
            >
              WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Link columns */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12"
          style={{ borderTop: '1px solid rgba(246,243,236,0.08)' }}
        >
          <div className="col-span-2 md:col-span-1">
            <span className="font-display font-light uppercase text-[26px] leading-none block tracking-[0.32em]" style={{ color: IVORY }}>
              Kotli
            </span>
            <span className="block mt-2 text-[9px] tracking-[0.6em] uppercase font-sans font-semibold" style={{ color: BRASS_LIGHT }}>
              Retreat
            </span>
            <div className="flex items-center gap-2.5 mt-5">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: BRASS }} />
              <span className="text-[9px] uppercase tracking-[2.5px]" style={{ color: 'rgba(246,243,236,0.35)' }}>
                45°20′N · 13°57′E — Kotli, Istria
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-[9.5px] uppercase tracking-[3px] font-semibold mb-4" style={{ color: BRASS_LIGHT }}>
              {t('cols.experience')}
            </h4>
            {experienceLinks.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="block text-[13.5px] mb-2.5 no-underline transition-all duration-300 hover:translate-x-1"
                style={{ color: 'rgba(246,243,236,0.65)' }}
              >
                {t(`links.${key}`)}
              </a>
            ))}
          </div>

          <div>
            <h4 className="text-[9.5px] uppercase tracking-[3px] font-semibold mb-4" style={{ color: BRASS_LIGHT }}>
              {t('cols.accommodation')}
            </h4>
            <a
              href="#accommodation"
              className="block text-[13.5px] mb-2.5 no-underline transition-all duration-300 hover:translate-x-1"
              style={{ color: 'rgba(246,243,236,0.65)' }}
            >
              {t('links.stoneHouses')}
            </a>
            <a
              href="#contact"
              className="block text-[13.5px] mb-2.5 no-underline transition-all duration-300 hover:translate-x-1"
              style={{ color: 'rgba(246,243,236,0.65)' }}
            >
              {t('links.bookDirect')}
            </a>
          </div>

          <div>
            <h4 className="text-[9.5px] uppercase tracking-[3px] font-semibold mb-4" style={{ color: BRASS_LIGHT }}>
              {t('cols.contact')}
            </h4>
            <a
              href="mailto:info@pravacroatia.com"
              className="block text-[13.5px] mb-2.5 no-underline transition-all duration-300 hover:translate-x-1"
              style={{ color: 'rgba(246,243,236,0.65)' }}
            >
              info@pravacroatia.com
            </a>
            {(['whatsapp', 'instagram', 'facebook'] as const).map((key) => {
              const href = key === 'whatsapp' ? 'https://wa.me/385992563862' : '#';
              const external = key === 'whatsapp';
              return (
                <a
                  key={key}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="block text-[13.5px] mb-2.5 no-underline transition-all duration-300 hover:translate-x-1"
                  style={{ color: 'rgba(246,243,236,0.65)' }}
                >
                  {t(`links.${key}`)}
                </a>
              );
            })}
          </div>
        </div>

        {/* Legal bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6"
          style={{ borderTop: '1px solid rgba(246,243,236,0.08)' }}
        >
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[10px] uppercase tracking-[2.5px] font-semibold" style={{ color: 'rgba(211,183,135,0.75)' }}>
              by Delmata Travel
            </span>
            <span className="text-[11px]" style={{ color: 'rgba(246,243,236,0.3)' }}>
              {t('copyright')}
            </span>
          </span>
          <div className="flex flex-wrap gap-5">
            {(['impressum', 'privacy', 'terms', 'travel'] as const).map((key) => (
              <a
                key={key}
                href={key === 'privacy' ? `/${locale}/privacy` : '#'}
                className="text-[11px] no-underline transition-colors duration-300"
                style={{ color: 'rgba(246,243,236,0.3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(246,243,236,0.6)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(246,243,236,0.3)')}
              >
                {t(`legal.${key}`)}
              </a>
            ))}
          </div>
        </div>

        {/* The giant wordmark — fills with brass as you scroll */}
        <div className="pt-6 pb-5 overflow-hidden">
          <motion.div
            aria-hidden
            className="font-display italic font-light leading-[0.9] whitespace-nowrap text-center select-none"
            style={{
              fontSize: 'clamp(54px, 11vw, 190px)',
              backgroundImage: wordmarkBg,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Kotli Retreat
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
