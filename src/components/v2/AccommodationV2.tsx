'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Home, Waves, PawPrint, MapPin, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

// V2 Accommodation — "The Estate Spread". Light editorial magazine layout
// directly below the dark hero: giant headline, the village hero photo LARGE
// with inner parallax, an overlapping interior accent, features beside it,
// slim infinite filmstrip underneath. Filmstrip photos open a lightbox with
// left/right navigation.
const IVORY = '#f6f3ec';
const INK = '#1c1a15';
const BRASS = '#b08d57';
const BRASS_DARK = '#8a6b3f';
const BRASS_LIGHT = '#d3b787';

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  house: <Home className="w-[18px] h-[18px]" strokeWidth={1.5} />,
  pool: <Waves className="w-[18px] h-[18px]" strokeWidth={1.5} />,
  pet: <PawPrint className="w-[18px] h-[18px]" strokeWidth={1.5} />,
  location: <MapPin className="w-[18px] h-[18px]" strokeWidth={1.5} />,
};

const MAIN_PHOTO = '/images/kotli-gallery/0-hero.jpg';
const ACCENT_PHOTO = '/images/kotli/interior-fireplace.jpg';

// Slim filmstrip — interiors + village life
const STRIP: { src: string; w: number }[] = [
  { src: '/images/kotli/pool.jpg', w: 300 },
  { src: '/images/kotli-gallery/2.jpg', w: 360 },
  { src: '/images/kotli/terrace.jpg', w: 420 },
  { src: '/images/kotli-gallery/4.jpg', w: 280 },
  { src: '/images/kotli/interior-dining.jpg', w: 380 },
  { src: '/images/kotli-gallery/6.jpg', w: 320 },
  { src: '/images/kotli/river-mill.jpg', w: 270 },
  { src: '/images/kotli-gallery/7.jpg', w: 400 },
  { src: '/images/kotli/bbq-area.jpg', w: 340 },
  { src: '/images/kotli/houses-overview.jpg', w: 420 },
];

export default function AccommodationV2() {
  const t = useTranslations('accommodation');
  const features = t.raw('features') as { icon: string; title: string; text: string }[];

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const photoInnerY = useTransform(scrollYProgress, [0, 1], [-38, 38]);
  const accentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // ---- Lightbox ----
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i === null ? i : (i - 1 + STRIP.length) % STRIP.length));
  const next = () => setLightbox((i) => (i === null ? i : (i + 1) % STRIP.length));

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 50) prev();
    else if (dx < -50) next();
    touchX.current = null;
  };

  const title = t('title');
  const titleWords = title.split(' ');
  const intro = t('intro');
  const firstSpace = intro.indexOf(' ');
  const introFirst = firstSpace > 0 ? intro.slice(0, firstSpace) : intro;
  const introRest = firstSpace > 0 ? intro.slice(firstSpace) : '';

  return (
    <section ref={sectionRef} id="accommodation" className="relative overflow-hidden" style={{ backgroundColor: IVORY }}>
      <style>{`
        @keyframes ssv2-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ssv2-marquee { animation: ssv2-marquee 55s linear infinite; will-change: transform; }
        .ssv2-marquee:hover { animation-play-state: paused; }
      `}</style>

      <div className="px-5 md:px-[6vw] pt-16 md:pt-24">
        {/* Magazine header — giant headline, subtitle hanging right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
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
            <h2 className="font-display font-light text-[clamp(36px,4.8vw,68px)] leading-[1.0]" style={{ color: INK }}>
              {titleWords.map((word, i) => {
                const isLast = i === titleWords.length - 1;
                return (
                  <span
                    key={i}
                    className={`inline-block mr-[0.26em] ${isLast ? 'italic' : ''}`}
                    style={isLast ? { color: BRASS_DARK } : undefined}
                  >
                    {word}
                  </span>
                );
              })}
            </h2>
          </motion.div>
          <motion.p
            className="font-serif italic text-[16px] md:text-[17px] leading-relaxed max-w-[340px] md:pb-2 md:text-right"
            style={{ color: 'rgba(28,26,21,0.6)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Spread: main picture + content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-10 md:mt-14">
          {/* Main picture — large, inner parallax, location chip, interior accent */}
          <motion.div
            className="lg:col-span-7 relative pb-12"
            initial={{ opacity: 0, scale: 0.97, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[420px] md:h-[560px] lg:h-[640px] rounded-[6px] overflow-hidden shadow-[0_36px_90px_rgba(28,26,21,0.3)]">
              {/* Inner parallax layer */}
              <motion.div className="absolute -top-[7%] left-0 right-0 h-[114%]" style={{ y: photoInnerY }}>
                <Image
                  src={MAIN_PHOTO}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </motion.div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.32), transparent 35%)' }}
              />
              {/* Location chip */}
              <div
                className="absolute bottom-5 left-5 flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-md"
                style={{ backgroundColor: 'rgba(13,18,12,0.5)', border: '1px solid rgba(246,243,236,0.18)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRASS_LIGHT }} />
                <span className="text-[9px] uppercase tracking-[3px] font-semibold" style={{ color: 'rgba(246,243,236,0.9)' }}>
                  Kotli — 45°20′N · 13°57′E
                </span>
              </div>
            </div>

            {/* Interior accent — overlaps bottom-right, print border */}
            <motion.div className="absolute -bottom-2 right-2 md:-right-5 z-20 hidden sm:block" style={{ y: accentY }}>
              <div
                className="relative w-[230px] h-[160px] rounded-[3px] overflow-hidden shadow-[0_24px_55px_rgba(28,26,21,0.35)]"
                style={{ rotate: '2deg', border: '5px solid #f6f3ec' }}
              >
                <Image src={ACCENT_PHOTO} alt="" fill className="object-cover" sizes="230px" />
              </div>
            </motion.div>
          </motion.div>

          {/* Content — intro + features */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif text-[16px] md:text-[17px] leading-[1.8] italic" style={{ color: 'rgba(28,26,21,0.72)' }}>
              <span className="font-semibold not-italic" style={{ color: BRASS_DARK }}>
                {introFirst}
              </span>
              {introRest}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-9 gap-y-6 mt-9">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  className="pt-5"
                  style={{ borderTop: '1px solid rgba(28,26,21,0.12)' }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span style={{ color: BRASS_DARK }}>{FEATURE_ICONS[feat.icon] ?? FEATURE_ICONS.location}</span>
                    <h4 className="text-[14.5px] font-semibold tracking-wide" style={{ color: INK }}>
                      {feat.title}
                    </h4>
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(28,26,21,0.58)' }}>
                    {feat.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slim infinite filmstrip — click any photo to open the lightbox */}
      <motion.div
        className="relative mt-6 md:mt-10 pb-14 md:pb-16"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="overflow-hidden">
          <div className="ssv2-marquee flex w-max">
            {[...STRIP, ...STRIP].map((item, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i % STRIP.length)}
                aria-label="Open photo"
                className="group relative shrink-0 mr-3.5 h-[160px] md:h-[210px] rounded-[4px] overflow-hidden cursor-zoom-in border-none bg-transparent p-0"
                style={{ width: `${Math.round(item.w * 0.62)}px` }}
              >
                <Image
                  src={item.src}
                  alt="Kotli"
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  sizes="300px"
                />
                {/* Hover affordance */}
                <span
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: 'rgba(13,18,12,0.22)' }}
                >
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(246,243,236,0.92)' }}
                  >
                    <ZoomIn className="w-4 h-4" style={{ color: INK }} strokeWidth={1.75} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom hairline before the next ivory section */}
      <div className="mx-5 md:mx-[6vw] h-px" style={{ backgroundColor: 'rgba(28,26,21,0.1)' }} />

      {/* ===== Lightbox ===== */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center px-4"
            style={{ backgroundColor: 'rgba(10,14,9,0.94)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close"
              className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200"
              style={{ backgroundColor: 'rgba(246,243,236,0.1)', border: '1px solid rgba(246,243,236,0.2)' }}
            >
              <X className="w-5 h-5" style={{ color: IVORY }} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-2 md:left-8 w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 z-10"
              style={{ backgroundColor: 'rgba(246,243,236,0.1)', border: '1px solid rgba(246,243,236,0.2)' }}
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" style={{ color: IVORY }} />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              className="relative w-[92vw] h-[80vh]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={STRIP[lightbox].src} alt="Kotli" fill className="object-contain" sizes="92vw" priority />
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-2 md:right-8 w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 z-10"
              style={{ backgroundColor: 'rgba(246,243,236,0.1)', border: '1px solid rgba(246,243,236,0.2)' }}
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" style={{ color: IVORY }} />
            </button>

            {/* Counter */}
            <div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[3px] font-semibold"
              style={{ color: 'rgba(246,243,236,0.7)' }}
            >
              <span style={{ color: BRASS_LIGHT }}>{lightbox + 1}</span> / {STRIP.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
