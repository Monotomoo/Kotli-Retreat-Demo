'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

// V2 Destinations — "Three Jewels". Expanding panel gallery: the active city
// claims the stage, the others fold into elegant vertical slivers. Pure
// flex-grow CSS transitions — cinematic but cheap. Ink act continues from Agenda.
const INK = '#0d120c';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';
const BRASS_LIGHT = '#d3b787';

const PLACES = [
  { src: '/images/destinations/rovinj-sunset.jpg', coords: '45°05′N · 13°38′E' },
  { src: '/images/destinations/motovun-b.jpg', coords: '45°20′N · 13°50′E' },
  { src: '/images/destinations/hum-stone.jpg', coords: '45°21′N · 14°03′E' },
];

export default function DestinationsV2() {
  const t = useTranslations('destinations');
  const cards = t.raw('cards') as { badge: string; name: string; desc: string; detail: string }[];
  const [active, setActive] = useState(0);

  return (
    <section id="destinations" className="relative" style={{ backgroundColor: INK }}>
      {/* Hairline seam between the two ink acts */}
      <div className="mx-5 md:mx-[6vw] h-px" style={{ backgroundColor: 'rgba(246,243,236,0.09)' }} />

      <div className="px-5 md:px-[6vw] pt-14 md:pt-20 pb-16 md:pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
            <span className="text-[10px] uppercase tracking-[4px] font-sans font-semibold" style={{ color: BRASS_LIGHT }}>
              {t('label')}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-10">
            <h2 className="font-display font-light text-[clamp(32px,4vw,56px)] leading-[1.02]" style={{ color: IVORY }}>
              {t('title')}
            </h2>
            <p
              className="font-serif italic text-[15px] md:text-[16px] leading-relaxed max-w-[380px] md:text-right md:pb-1.5"
              style={{ color: 'rgba(246,243,236,0.55)' }}
            >
              {t('subtitle')}
            </p>
          </div>
        </motion.div>

        {/* ===== Desktop: expanding panels ===== */}
        <motion.div
          className="hidden md:flex gap-3 h-[540px] mt-12"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {cards.map((card, i) => {
            const isActive = active === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="relative overflow-hidden rounded-[6px] cursor-pointer min-w-0"
                style={{
                  flexGrow: isActive ? 3 : 1,
                  flexBasis: 0,
                  transition: 'flex-grow 0.85s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <Image
                  src={PLACES[i]?.src ?? PLACES[0].src}
                  alt={card.name}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out"
                  style={{ transform: isActive ? 'scale(1.04)' : 'scale(1)' }}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                {/* Gradients */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(to top, rgba(13,18,12,0.88) 0%, rgba(13,18,12,0.25) 50%, rgba(13,18,12,0.1) 100%)',
                    opacity: isActive ? 1 : 0.75,
                  }}
                />

                {/* Collapsed sliver — number top, vertical name */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-between py-7 transition-opacity duration-500 pointer-events-none"
                  style={{ opacity: isActive ? 0 : 1 }}
                >
                  <span className="font-serif italic text-[13px]" style={{ color: BRASS_LIGHT }}>
                    0{i + 1}
                  </span>
                  <span
                    className="font-display italic text-[24px] [writing-mode:vertical-rl] rotate-180"
                    style={{ color: 'rgba(246,243,236,0.92)' }}
                  >
                    {card.name}
                  </span>
                  <span className="w-1 h-1 rotate-45" style={{ backgroundColor: BRASS }} />
                </div>

                {/* Expanded content */}
                <div
                  className="absolute inset-x-0 bottom-0 p-8 transition-all duration-500"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(14px)',
                    transitionDelay: isActive ? '0.25s' : '0s',
                  }}
                >
                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md mb-4"
                    style={{ backgroundColor: 'rgba(13,18,12,0.5)', border: '1px solid rgba(246,243,236,0.18)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRASS_LIGHT }} />
                    <span className="text-[9px] uppercase tracking-[2.5px] font-semibold" style={{ color: 'rgba(246,243,236,0.9)' }}>
                      {card.badge}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-display italic font-light text-[clamp(30px,3vw,44px)] leading-none" style={{ color: IVORY }}>
                      {card.name}
                    </h3>
                    <span className="text-[9px] uppercase tracking-[2px] whitespace-nowrap" style={{ color: 'rgba(246,243,236,0.45)' }}>
                      {PLACES[i]?.coords}
                    </span>
                  </div>
                  <p className="text-[13.5px] leading-relaxed mt-3 max-w-[58ch]" style={{ color: 'rgba(246,243,236,0.85)' }}>
                    {card.desc}
                  </p>
                  <div className="flex items-center gap-2.5 mt-4">
                    <span className="w-5 h-px" style={{ backgroundColor: BRASS }} />
                    <span className="text-[10px] uppercase tracking-[2.5px] font-semibold" style={{ color: BRASS_LIGHT }}>
                      {card.detail}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ===== Mobile: stacked cards ===== */}
        <div className="md:hidden flex flex-col gap-4 mt-9">
          {cards.map((card, i) => (
            <div key={i} className="relative h-[280px] rounded-[6px] overflow-hidden">
              <Image
                src={PLACES[i]?.src ?? PLACES[0].src}
                alt={card.name}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.9) 0%, rgba(13,18,12,0.2) 60%)' }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-[9px] uppercase tracking-[2.5px] font-semibold" style={{ color: BRASS_LIGHT }}>
                  {card.badge}
                </span>
                <h3 className="font-display italic text-[28px] leading-tight mt-1" style={{ color: IVORY }}>
                  {card.name}
                </h3>
                <p className="text-[12.5px] leading-snug mt-1.5 line-clamp-3" style={{ color: 'rgba(246,243,236,0.8)' }}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
