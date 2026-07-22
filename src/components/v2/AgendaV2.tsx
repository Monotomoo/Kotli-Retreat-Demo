'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

// V2 Agenda — "The Evening Itinerary". Dark ink act: sticky day rail left,
// five refined day chapters right. Native scroll (no scroll-jacking), scroll-spy
// rail, outlined day numbers, tasting-menu schedule rows. Local photos only.
const INK = '#0d120c';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';
const BRASS_LIGHT = '#d3b787';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

const DAY_IMAGES = [
  { src: '/images/agenda/day1.jpg', alt: 'Kotli river, stone mill and arrival into the valley' },
  { src: '/images/agenda/day2.jpg', alt: 'Truffle hunter with her dogs in the Istrian forest' },
  { src: '/images/agenda/day3.png', alt: 'Wine and olive oil at vineyard golden hour' },
  { src: '/images/agenda/day4.jpg', alt: 'Chef plating a fine-dining course' },
  { src: '/images/agenda/day5.avif', alt: 'Farewell morning on the terrace' },
];

interface ScheduleItem {
  time: string;
  text: string;
}
interface DayData {
  number: string;
  theme: string;
  title: string;
  narrative: string;
  schedule: ScheduleItem[];
  meals: string[];
  host: string;
}

export default function AgendaV2() {
  const t = useTranslations('agenda');
  const tHero = useTranslations('hero');
  const days = t.raw('days') as DayData[];
  const [activeDay, setActiveDay] = useState(0);

  // Scroll-spy for the sticky rail
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.dayIndex ?? 0);
            setActiveDay(idx);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    document.querySelectorAll('[data-day-index]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goToDay = (i: number) =>
    document.getElementById(`day-${i + 1}`)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="agenda" className="relative" style={{ backgroundColor: INK }}>
      {/* Texture + glow — no overflow-hidden on the section: it would break position:sticky */}
      <div
        className="absolute left-0 top-0 w-[55vw] h-[50vh] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(176,141,87,0.12), transparent 60%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: GRAIN, opacity: 0.06 }}
      />

      <div className="relative px-5 md:px-[6vw] pt-16 md:pt-24 pb-16 md:pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
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
          <h2
            className="font-display font-light text-[clamp(30px,3.8vw,54px)] leading-[1.04] max-w-[720px]"
            style={{ color: IVORY }}
          >
            {t('title')}
          </h2>
        </motion.div>

        {/* Body: sticky rail + day chapters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-12 md:mt-16">
          {/* Sticky itinerary box — travels with you through the five days */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <div
                className="rounded-[6px] p-6"
                style={{
                  backgroundColor: 'rgba(246,243,236,0.04)',
                  border: '1px solid rgba(246,243,236,0.1)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                }}
              >
                {/* Box header — label + live day counter */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] uppercase tracking-[3px] font-semibold" style={{ color: BRASS_LIGHT }}>
                    {t('label')}
                  </span>
                  <span className="relative inline-block h-[18px] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeDay}
                        className="font-serif italic text-[13px] inline-block"
                        style={{ color: 'rgba(246,243,236,0.6)' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        0{activeDay + 1} / 0{days.length}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>

                {/* Day list */}
                {days.map((day, i) => {
                  const isActive = activeDay === i;
                  return (
                    <button
                      key={i}
                      onClick={() => goToDay(i)}
                      className="w-full flex items-stretch gap-3.5 py-2.5 px-3 rounded-[4px] cursor-pointer border-none text-left transition-colors duration-300"
                      style={{ backgroundColor: isActive ? 'rgba(246,243,236,0.055)' : 'transparent' }}
                    >
                      <motion.span
                        className="w-[2px] rounded-full self-stretch shrink-0"
                        animate={{ backgroundColor: isActive ? BRASS_LIGHT : 'rgba(246,243,236,0.12)' }}
                        transition={{ duration: 0.3 }}
                      />
                      <span
                        className="font-serif italic text-[13px] shrink-0 pt-0.5 transition-colors duration-300"
                        style={{ color: isActive ? BRASS_LIGHT : 'rgba(176,141,87,0.5)' }}
                      >
                        0{i + 1}
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span
                          className="text-[8.5px] uppercase tracking-[2.5px] font-semibold transition-colors duration-300"
                          style={{ color: isActive ? 'rgba(246,243,236,0.55)' : 'rgba(246,243,236,0.3)' }}
                        >
                          {t('dayLabel')} {day.number}
                        </span>
                        <span
                          className="text-[13px] font-medium truncate transition-colors duration-300"
                          style={{ color: isActive ? IVORY : 'rgba(246,243,236,0.45)' }}
                        >
                          {day.theme}
                        </span>
                      </span>
                    </button>
                  );
                })}

                {/* Journey progress */}
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(246,243,236,0.08)' }}>
                  <div className="h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(246,243,236,0.08)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(to right, ${BRASS}, ${BRASS_LIGHT})` }}
                      animate={{ width: `${((activeDay + 1) / days.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-4 w-full py-2.5 text-[9.5px] font-semibold uppercase tracking-[2.5px] font-sans cursor-pointer rounded-[3px] transition-colors duration-300 bg-transparent"
                  style={{ border: '1px solid rgba(176,141,87,0.4)', color: BRASS_LIGHT }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = BRASS_LIGHT;
                    e.currentTarget.style.color = '#141a12';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = BRASS_LIGHT;
                  }}
                >
                  {tHero('cta')} →
                </button>
              </div>
            </div>
          </div>

          {/* Day chapters */}
          <div className="lg:col-span-9">
            {days.map((day, i) => (
              <motion.article
                key={i}
                id={`day-${i + 1}`}
                data-day-index={i}
                className="scroll-mt-28 grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-10 py-12 md:py-14 first:pt-0"
                style={i > 0 ? { borderTop: '1px solid rgba(246,243,236,0.08)' } : undefined}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Photo */}
                <div className="md:col-span-5">
                  <div className="group relative h-[230px] md:h-[340px] rounded-[4px] overflow-hidden shadow-[0_26px_60px_rgba(0,0,0,0.45)]">
                    <Image
                      src={DAY_IMAGES[i % DAY_IMAGES.length].src}
                      alt={DAY_IMAGES[i % DAY_IMAGES.length].alt}
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]"
                      sizes="(max-width: 768px) 100vw, 38vw"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.45), transparent 45%)' }}
                    />
                    {/* Day chip */}
                    <div
                      className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md"
                      style={{ backgroundColor: 'rgba(13,18,12,0.55)', border: '1px solid rgba(246,243,236,0.16)' }}
                    >
                      <span className="text-[9px] uppercase tracking-[2.5px] font-semibold" style={{ color: BRASS_LIGHT }}>
                        {t('dayLabel')} {day.number} — {day.theme}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-7">
                  <div className="flex items-start gap-5">
                    <span
                      className="font-display italic font-light text-[58px] md:text-[68px] leading-[0.8] shrink-0 mt-1"
                      style={{ WebkitTextStroke: '1.2px rgba(176,141,87,0.75)', color: 'transparent' }}
                    >
                      {day.number}
                    </span>
                    <div>
                      <h3 className="font-display text-[24px] md:text-[29px] leading-tight" style={{ color: IVORY }}>
                        {day.title}
                      </h3>
                      {day.narrative && (
                        <p
                          className="font-serif italic text-[14.5px] leading-relaxed mt-2.5 max-w-[52ch]"
                          style={{ color: 'rgba(246,243,236,0.6)' }}
                        >
                          {day.narrative}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Schedule — tasting-menu rows */}
                  <div className="mt-6">
                    {day.schedule.map((item, j) => (
                      <div
                        key={j}
                        className="flex gap-5 py-[9px]"
                        style={j > 0 ? { borderTop: '1px solid rgba(246,243,236,0.06)' } : undefined}
                      >
                        <span
                          className="w-[46px] shrink-0 text-[11px] font-semibold tracking-[1px] pt-px"
                          style={{ color: BRASS_LIGHT }}
                        >
                          {item.time}
                        </span>
                        <span className="text-[13.5px] leading-snug" style={{ color: 'rgba(246,243,236,0.82)' }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Meals + host */}
                  <div className="flex flex-wrap items-center gap-2 mt-5">
                    {day.meals.map((meal, j) => (
                      <span
                        key={j}
                        className="text-[9px] uppercase tracking-[2px] font-semibold px-3 py-1.5 rounded-full"
                        style={{ border: '1px solid rgba(176,141,87,0.35)', color: BRASS_LIGHT }}
                      >
                        {meal}
                      </span>
                    ))}
                  </div>
                  {day.host && (
                    <div className="flex items-center gap-2.5 mt-4">
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: BRASS }} />
                      <span className="text-[10px] uppercase tracking-[2px]" style={{ color: 'rgba(246,243,236,0.45)' }}>
                        {day.host}
                      </span>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
