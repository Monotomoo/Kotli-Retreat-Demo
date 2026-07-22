'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

// V2 Pricing — "Choose your experience". Stone bed, three editorial package
// cards: the featured one is a dark jewel with a breathing brass glow, the
// custom package keeps its numbered-steps character. Prices finally sized
// like they mean it.
const STONE = '#ede7da';
const INK = '#1c1a15';
const DARK = '#0d120c';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';
const BRASS_DARK = '#8a6b3f';
const BRASS_LIGHT = '#d3b787';

interface StandardCard {
  variant: 'standard';
  badge: string;
  name: string;
  slogan: string;
  price: string;
  info: string;
  minNote: string;
  includesLabel?: string;
  includes: string[];
  cta: string;
  featured: boolean;
}
interface CustomCard {
  variant: 'custom';
  badge: string;
  name: string;
  slogan: string;
  price: string;
  info: string;
  minNote: string;
  steps: string[];
  tags: string[];
  cta: string;
  featured: boolean;
}
type PackageCard = StandardCard | CustomCard;

export default function PricingV2() {
  const t = useTranslations('pricing');
  const cards = t.raw('cards') as PackageCard[];

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pricing" className="relative" style={{ backgroundColor: STONE }}>
      <style>{`
        @keyframes ssv2-glow { 0%, 100% { opacity: 0.45; } 50% { opacity: 0.85; } }
        .ssv2-glow { animation: ssv2-glow 6s ease-in-out infinite; }
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
          <h2 className="font-display font-light text-[clamp(30px,3.6vw,50px)] leading-[1.05]" style={{ color: INK }}>
            {t('title')}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mt-12 items-stretch">
          {cards.map((card, i) => {
            const featured = card.featured;
            return (
              <motion.div
                key={i}
                className={`relative h-full transition-transform duration-500 hover:-translate-y-1.5 ${
                  featured ? 'lg:-translate-y-3 lg:hover:-translate-y-4' : ''
                }`}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="relative h-full rounded-[6px] p-7 md:p-8 flex flex-col overflow-hidden"
                  style={
                    featured
                      ? { backgroundColor: DARK, boxShadow: '0 34px 80px rgba(13,18,12,0.4)' }
                      : {
                          backgroundColor: '#fbf9f3',
                          border: card.variant === 'custom' ? '1px dashed rgba(28,26,21,0.22)' : '1px solid rgba(28,26,21,0.09)',
                          boxShadow: '0 22px 55px rgba(28,26,21,0.1)',
                        }
                  }
                >
                  {/* Breathing brass glow on the jewel */}
                  {featured && (
                    <div
                      className="ssv2-glow absolute inset-0 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at top right, rgba(176,141,87,0.22), transparent 55%)' }}
                    />
                  )}

                  <div className="relative flex flex-col h-full">
                    {/* Badge */}
                    <span
                      className="self-start text-[9px] uppercase tracking-[2.5px] font-bold px-3 py-1.5 rounded-full"
                      style={
                        featured
                          ? { backgroundColor: BRASS_LIGHT, color: '#141a12' }
                          : { border: '1px solid rgba(176,141,87,0.5)', color: BRASS_DARK }
                      }
                    >
                      {card.badge}
                    </span>

                    {/* Name + slogan */}
                    <h3
                      className="font-display text-[26px] md:text-[29px] leading-tight mt-4"
                      style={{ color: featured ? IVORY : INK }}
                    >
                      {card.name}
                    </h3>
                    <p
                      className="font-serif italic text-[14.5px] leading-snug mt-1.5"
                      style={{ color: featured ? 'rgba(246,243,236,0.6)' : 'rgba(28,26,21,0.55)' }}
                    >
                      {card.slogan}
                    </p>

                    {/* Price — sized like it means it */}
                    <div className="mt-5">
                      <div
                        className="font-display font-light text-[clamp(32px,2.6vw,42px)] leading-none"
                        style={{ color: featured ? BRASS_LIGHT : INK }}
                      >
                        {card.price}
                      </div>
                      <div
                        className="text-[11px] mt-2"
                        style={{ color: featured ? 'rgba(246,243,236,0.55)' : 'rgba(28,26,21,0.55)' }}
                      >
                        {card.info}
                      </div>
                      <div
                        className="text-[9px] uppercase tracking-[2px] font-semibold mt-1"
                        style={{ color: featured ? 'rgba(246,243,236,0.4)' : 'rgba(28,26,21,0.4)' }}
                      >
                        {card.minNote}
                      </div>
                    </div>

                    <div
                      className="h-px my-5"
                      style={{ backgroundColor: featured ? 'rgba(246,243,236,0.12)' : 'rgba(28,26,21,0.1)' }}
                    />

                    {/* Body */}
                    {card.variant === 'standard' ? (
                      <div className="flex flex-col flex-1">
                        {card.includesLabel && (
                          <div
                            className="text-[9.5px] uppercase tracking-[2px] font-bold mb-2.5"
                            style={{ color: featured ? BRASS_LIGHT : BRASS_DARK }}
                          >
                            {card.includesLabel}
                          </div>
                        )}
                        <div className="flex flex-col gap-[9px]">
                          {card.includes.map((item, j) => (
                            <div key={j} className="flex items-start gap-3">
                              <svg className="w-[13px] h-[13px] shrink-0 mt-[3px]" viewBox="0 0 24 24" fill="none">
                                <path
                                  d="M4 12.5L9.5 18L20 6.5"
                                  stroke={featured ? BRASS_LIGHT : BRASS}
                                  strokeWidth={2.4}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span
                                className="text-[13px] leading-snug"
                                style={{ color: featured ? 'rgba(246,243,236,0.85)' : 'rgba(28,26,21,0.72)' }}
                              >
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 flex-1">
                        <div className="flex flex-col gap-3.5">
                          {card.steps.map((step, j) => (
                            <div key={j} className="flex items-start gap-3.5">
                              <span className="font-serif italic text-[14px] shrink-0 w-6" style={{ color: BRASS_DARK }}>
                                0{j + 1}
                              </span>
                              <span className="text-[13px] leading-snug pt-px" style={{ color: 'rgba(28,26,21,0.72)' }}>
                                {step}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {card.tags.map((tag, j) => (
                            <span
                              key={j}
                              className="text-[10px] px-2.5 py-1 rounded-full"
                              style={{ border: '1px solid rgba(28,26,21,0.15)', color: 'rgba(28,26,21,0.6)' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <button
                      onClick={scrollToContact}
                      className="mt-6 w-full py-3.5 text-[10px] font-semibold uppercase tracking-[2.5px] font-sans cursor-pointer rounded-[3px] transition-colors duration-300"
                      style={
                        featured
                          ? { backgroundColor: BRASS_LIGHT, color: '#141a12', border: 'none' }
                          : { backgroundColor: 'transparent', color: INK, border: '1px solid rgba(28,26,21,0.35)' }
                      }
                      onMouseEnter={(e) => {
                        if (featured) {
                          e.currentTarget.style.backgroundColor = IVORY;
                        } else {
                          e.currentTarget.style.backgroundColor = INK;
                          e.currentTarget.style.color = IVORY;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (featured) {
                          e.currentTarget.style.backgroundColor = BRASS_LIGHT;
                        } else {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = INK;
                        }
                      }}
                    >
                      {card.cta} →
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fine print */}
        <p className="font-serif italic text-[12.5px] mt-8" style={{ color: 'rgba(28,26,21,0.45)' }}>
          {t('footerNote')}
        </p>
      </div>
    </section>
  );
}
