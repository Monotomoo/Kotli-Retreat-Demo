'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';

// V2 "5 Reasons" — editorial depth stage.
// Left: numbered hover-index + description on solid ivory (max legibility).
// Right: layered parallax stage — main photo, offset accent photo, huge outlined
// brass number and a brass frame, each on its own scroll speed + cursor tilt.
// Mobile: simple snap strip, no motion.
const IVORY = '#f6f3ec';
const INK = '#1c1a15';
const BRASS = '#b08d57';
const BRASS_DARK = '#8a6b3f';

// [main photo, accent layer] per reason — accents add the human/place counterpoint
const LAYERS: { main: string; accent: string }[] = [
  { main: '/images/hosts/truffle-hunt.jpg', accent: '/images/hosts/host-1.png' },
  { main: '/images/hosts/olive-oil.jpg', accent: '/images/hosts/host-3.jpg' },
  { main: '/images/hosts/vineyard.jpg', accent: '/images/hosts/host-2.png' },
  { main: '/images/hosts/michelin-dinner.jpg', accent: '/images/destinations/rovinj-sunset.jpg' },
  { main: '/images/kotli/village-street.jpg', accent: '/images/kotli/river-mill.jpg' },
];

export default function WhyV2() {
  const t = useTranslations('why');
  const points = t.raw('points') as { title: string; text: string }[];
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { margin: '-15% 0px' });

  // --- Scroll parallax: three depths ---
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const mainY = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const accentY = useTransform(scrollYProgress, [0, 1], [64, -58]);
  const numberY = useTransform(scrollYProgress, [0, 1], [-42, 52]);

  // --- Cursor tilt + layer drift (spring-smoothed) ---
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 14 });
  const smy = useSpring(my, { stiffness: 55, damping: 14 });
  const rotateX = useTransform(smy, [-0.5, 0.5], [3.2, -3.2]);
  const rotateY = useTransform(smx, [-0.5, 0.5], [-3.2, 3.2]);
  const mainMX = useTransform(smx, [-0.5, 0.5], [-7, 7]);
  const mainMY = useTransform(smy, [-0.5, 0.5], [-5, 5]);
  const accentMX = useTransform(smx, [-0.5, 0.5], [-17, 17]);
  const accentMY = useTransform(smy, [-0.5, 0.5], [-11, 11]);
  const numberMX = useTransform(smx, [-0.5, 0.5], [20, -20]);
  const numberMY = useTransform(smy, [-0.5, 0.5], [14, -14]);
  const frameMX = useTransform(smx, [-0.5, 0.5], [10, -10]);
  const frameMY = useTransform(smy, [-0.5, 0.5], [7, -7]);

  const onStageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onStageLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Auto-advance while visible and idle
  useEffect(() => {
    if (!inView || hovering) return;
    const id = setInterval(() => setActive((a) => (a + 1) % points.length), 5000);
    return () => clearInterval(id);
  }, [inView, hovering, points.length]);

  return (
    <section ref={sectionRef} id="why" className="relative overflow-hidden" style={{ backgroundColor: IVORY }}>
      <div className="px-5 md:px-[6vw] pt-16 md:pt-24 pb-14 md:pb-16">
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
          <h2
            className="font-display font-light text-[clamp(28px,3.4vw,46px)] leading-[1.08] max-w-[820px]"
            style={{ color: INK }}
          >
            {t('title')}
          </h2>
        </motion.div>

        {/* ===== Desktop: index + depth stage ===== */}
        <div className="hidden lg:grid grid-cols-12 gap-12 xl:gap-16 mt-10 items-start">
          {/* Left — numbered index + readable text well */}
          <div className="col-span-5">
            <div onMouseLeave={() => setHovering(false)}>
              {points.map((point, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={i}
                    onMouseEnter={() => {
                      setActive(i);
                      setHovering(true);
                    }}
                    className="relative w-full text-left cursor-pointer bg-transparent border-none block"
                    style={{ borderBottom: '1px solid rgba(28,26,21,0.1)' }}
                  >
                    <div className="flex items-baseline gap-5 py-[17px] pr-3">
                      <span
                        className="font-serif italic text-[13px] shrink-0 w-6 transition-colors duration-300"
                        style={{ color: isActive ? BRASS_DARK : 'rgba(176,141,87,0.6)' }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-[clamp(18px,1.5vw,22px)] leading-tight transition-all duration-300 ${
                          isActive ? 'italic translate-x-2' : ''
                        }`}
                        style={{ color: isActive ? BRASS_DARK : INK }}
                      >
                        {point.title}
                      </span>
                      <motion.span
                        className="ml-auto shrink-0 text-[15px]"
                        style={{ color: BRASS }}
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        →
                      </motion.span>
                    </div>
                    {isActive && !hovering && (
                      <motion.span
                        key={`progress-${active}`}
                        className="absolute bottom-[-1px] left-0 h-[2px] origin-left w-full"
                        style={{ backgroundColor: 'rgba(176,141,87,0.5)' }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 5, ease: 'linear' }}
                      />
                    )}
                    {isActive && hovering && (
                      <span
                        className="absolute bottom-[-1px] left-0 h-[2px] w-full"
                        style={{ backgroundColor: 'rgba(176,141,87,0.5)' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Description — on solid ivory, fully readable */}
            <div className="mt-7 min-h-[130px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-serif italic text-[15px]" style={{ color: BRASS_DARK }}>
                      0{active + 1}
                    </span>
                    <span className="flex-1 h-px" style={{ backgroundColor: 'rgba(176,141,87,0.35)' }} />
                  </div>
                  <p className="text-[15.5px] leading-relaxed max-w-[46ch]" style={{ color: 'rgba(28,26,21,0.78)' }}>
                    {points[active]?.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right — layered depth stage */}
          <div
            className="col-span-7 relative pt-16 pb-16 pl-14 pr-2 select-none"
            style={{ perspective: 1100 }}
            onMouseMove={onStageMove}
            onMouseLeave={onStageLeave}
          >
            <motion.div className="relative" style={{ rotateX, rotateY }}>
              {/* Huge outlined number — deepest layer, fastest counter-drift */}
              <motion.div
                className="absolute -top-20 -left-12 z-0 pointer-events-none"
                style={{ y: numberY, x: numberMX }}
              >
                <motion.div style={{ y: numberMY }} className="relative h-[190px] w-[260px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={active}
                      className="absolute inset-0 font-display italic font-light text-[185px] leading-none"
                      style={{ WebkitTextStroke: '1.5px rgba(176,141,87,0.8)', color: 'transparent' }}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -32 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      0{active + 1}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* Brass frame echo behind the photo */}
              <motion.div
                className="absolute top-[18px] left-[18px] w-full h-full z-[5] pointer-events-none rounded-[4px]"
                style={{
                  x: frameMX,
                  y: frameMY,
                  border: '1px solid rgba(176,141,87,0.4)',
                }}
              />

              {/* Main photo — slow drift, Ken Burns on switch */}
              <motion.div className="relative z-10" style={{ y: mainY }}>
                <motion.div
                  className="relative h-[470px] rounded-[4px] overflow-hidden shadow-[0_34px_80px_rgba(28,26,21,0.28)]"
                  style={{ x: mainMX, y: mainMY }}
                >
                  {LAYERS.map((layer, i) => (
                    <motion.div
                      key={layer.main}
                      className="absolute inset-0"
                      initial={false}
                      animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.07 }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={layer.main}
                        alt={points[i]?.title ?? ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 0px, 48vw"
                      />
                    </motion.div>
                  ))}
                  {/* Gentle vignette to seat the layers */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.28), transparent 40%)' }}
                  />
                </motion.div>
              </motion.div>

              {/* Accent photo — closest layer, fastest drift, print-style border */}
              <motion.div
                className="absolute -bottom-14 -left-10 z-20 pointer-events-none"
                style={{ y: accentY, x: accentMX }}
              >
                <motion.div
                  className="relative w-[200px] h-[250px] rounded-[3px] overflow-hidden shadow-[0_26px_60px_rgba(28,26,21,0.38)]"
                  style={{ y: accentMY, rotate: -2, border: '5px solid #f6f3ec' }}
                >
                  {LAYERS.map((layer, i) => (
                    <motion.div
                      key={layer.accent}
                      className="absolute inset-0"
                      initial={false}
                      animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 18 }}
                      transition={{ duration: 0.7, delay: active === i ? 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image src={layer.accent} alt="" fill className="object-cover" sizes="200px" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ===== Mobile: simple snap strip ===== */}
        <div className="lg:hidden mt-8 -mx-5 px-5 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {points.map((point, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[84%] rounded-[4px] overflow-hidden"
              style={{ backgroundColor: '#ffffff', border: '1px solid rgba(28,26,21,0.08)' }}
            >
              <div className="relative aspect-[16/10]">
                <Image src={LAYERS[i].main} alt={point.title} fill className="object-cover" sizes="84vw" />
                <span
                  className="absolute top-3 left-3 font-serif italic text-[13px] px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(13,18,12,0.72)', color: '#d3b787' }}
                >
                  0{i + 1}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-[19px] leading-snug mb-2" style={{ color: INK }}>
                  {point.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed line-clamp-4" style={{ color: 'rgba(28,26,21,0.62)' }}>
                  {point.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
