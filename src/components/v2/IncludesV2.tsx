'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

// V2 Includes — "The Manifest". Light editorial trust section: the 10 included
// items as an elegant menu card with self-drawing brass checkmarks and a slowly
// rotating stamp; upgrade as a dark jewel card; not-included as honest fine print.
// Uses proper i18n keys — no hardcoded Croatian (fixes v2 side of known issue #2).
const IVORY = '#f6f3ec';
const INK = '#1c1a15';
const DARK = '#0d120c';
const BRASS = '#b08d57';
const BRASS_DARK = '#8a6b3f';
const BRASS_LIGHT = '#d3b787';

function DrawnCheck({ delay }: { delay: number }) {
  return (
    <svg className="w-[15px] h-[15px] shrink-0 mt-[3px]" viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M4 12.5L9.5 18L20 6.5"
        stroke={BRASS}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function IncludesV2() {
  const t = useTranslations('includes');
  const tNav = useTranslations('header');
  const yes = t.raw('yes') as string[];
  const no = t.raw('no') as string[];
  const upgrade = t.raw('upgrade') as string[];

  return (
    <section id="includes" className="relative" style={{ backgroundColor: IVORY }}>
      <style>{`
        @keyframes ssv2-spin { to { transform: rotate(360deg); } }
        .ssv2-spin { animation: ssv2-spin 50s linear infinite; }
      `}</style>

      <div className="px-5 md:px-[6vw] pt-16 md:pt-24 pb-16 md:pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
            <span className="text-[10px] uppercase tracking-[4px] font-sans font-semibold" style={{ color: BRASS_DARK }}>
              {t('label')}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-10">
            <h2 className="font-display font-light text-[clamp(30px,3.6vw,50px)] leading-[1.05] max-w-[700px]" style={{ color: INK }}>
              {t('title')}
            </h2>
            <p
              className="font-serif italic text-[15px] md:text-[16px] leading-relaxed max-w-[360px] md:text-right md:pb-1.5"
              style={{ color: 'rgba(28,26,21,0.58)' }}
            >
              {t('subtitle')}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-12">
          {/* The menu card — everything included */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative rounded-[6px] p-8 md:p-10"
              style={{
                backgroundColor: '#fbf9f3',
                border: '1px solid rgba(28,26,21,0.09)',
                boxShadow: '0 30px 70px rgba(28,26,21,0.14)',
              }}
            >
              {/* Rotating stamp */}
              {/* Sits inside the card on mobile — overhanging it widened the document */}
              <div className="ssv2-spin absolute -top-4 right-2 w-[72px] h-[72px] md:-top-9 md:-right-7 md:w-[112px] md:h-[112px] pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <path id="ssv2-stamp-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                  </defs>
                  <circle cx="50" cy="50" r="46" fill="none" stroke={BRASS_DARK} strokeWidth="0.8" opacity="0.45" />
                  <circle cx="50" cy="50" r="26" fill="none" stroke={BRASS_DARK} strokeWidth="0.8" opacity="0.45" />
                  <text fontSize="7.4" letterSpacing="2.4" fill={BRASS_DARK} opacity="0.7" fontFamily="var(--font-sans)">
                    <textPath href="#ssv2-stamp-circle">ALL-INCLUSIVE · KOTLI RETREAT · ISTRIA ·</textPath>
                  </text>
                  <text x="50" y="54.5" textAnchor="middle" fontSize="13" fill={BRASS_DARK} opacity="0.65">
                    ✦
                  </text>
                </svg>
              </div>

              {/* Card header */}
              <div className="pr-24 md:pr-20">
                <div className="text-[10px] uppercase tracking-[3.5px] font-semibold" style={{ color: BRASS_DARK }}>
                  {t('yesTitle')}
                </div>
                <div className="font-serif italic text-[14.5px] mt-1.5" style={{ color: 'rgba(28,26,21,0.55)' }}>
                  {t('yesSubtitle')}
                </div>
              </div>

              {/* Items — two columns, self-drawing checks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mt-7">
                {yes.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3.5 py-[11px]"
                    style={{ borderBottom: '1px solid rgba(28,26,21,0.07)' }}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.45, delay: 0.08 + i * 0.05, ease: 'easeOut' }}
                  >
                    <DrawnCheck delay={0.15 + i * 0.05} />
                    <span className="text-[13.5px] leading-snug" style={{ color: 'rgba(28,26,21,0.8)' }}>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column — upgrade jewel + fine print */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Upgrade card */}
            <motion.div
              className="relative rounded-[6px] p-7 md:p-8 transition-transform duration-500 hover:-translate-y-1"
              style={{ backgroundColor: DARK, boxShadow: '0 26px 60px rgba(13,18,12,0.35)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute inset-0 rounded-[6px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top right, rgba(176,141,87,0.16), transparent 55%)' }}
              />
              <div className="relative">
                <div className="text-[10px] uppercase tracking-[3.5px] font-semibold" style={{ color: BRASS_LIGHT }}>
                  {t('upgradeTitle')}
                </div>
                <div className="font-serif italic text-[14px] mt-1.5" style={{ color: 'rgba(246,243,236,0.6)' }}>
                  {t('upgradeSubtitle')}
                </div>

                <div className="mt-5">
                  {upgrade.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3.5 py-[10px]"
                      style={i > 0 ? { borderTop: '1px solid rgba(246,243,236,0.08)' } : undefined}
                    >
                      <span className="font-serif italic text-[15px] leading-none mt-0.5" style={{ color: BRASS_LIGHT }}>
                        +
                      </span>
                      <span className="text-[13.5px] leading-snug" style={{ color: 'rgba(246,243,236,0.85)' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-6 w-full py-3 text-[10px] font-semibold uppercase tracking-[2.5px] font-sans cursor-pointer rounded-[3px] transition-colors duration-300 bg-transparent"
                  style={{ border: '1px solid rgba(176,141,87,0.45)', color: BRASS_LIGHT }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = BRASS_LIGHT;
                    e.currentTarget.style.color = '#141a12';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = BRASS_LIGHT;
                  }}
                >
                  {tNav('cta')} →
                </button>
              </div>
            </motion.div>

            {/* Not included — honest fine print */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="pt-5" style={{ borderTop: '1px solid rgba(28,26,21,0.12)' }}>
                <div className="text-[10px] uppercase tracking-[3px] font-semibold" style={{ color: 'rgba(28,26,21,0.5)' }}>
                  {t('noTitle')}
                </div>
                <div className="font-serif italic text-[13px] mt-1" style={{ color: 'rgba(28,26,21,0.45)' }}>
                  {t('noSubtitle')}
                </div>
                <div className="mt-3.5 flex flex-col gap-2">
                  {no.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="font-serif text-[13px] leading-none mt-0.5" style={{ color: 'rgba(28,26,21,0.35)' }}>
                        ×
                      </span>
                      <span className="text-[12.5px] leading-snug" style={{ color: 'rgba(28,26,21,0.55)' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
