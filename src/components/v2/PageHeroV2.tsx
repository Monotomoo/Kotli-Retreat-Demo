'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Inner-page hero (Packages, About, Contact): a shorter photo band in the
// homepage's film language, so the transparent header always sits on dark.
const INK = '#0d120c';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export default function PageHeroV2({
  image,
  eyebrow,
  title,
  intro,
}: {
  image: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  const words = title.split(' ');
  return (
    <section className="relative h-[62svh] min-h-[460px] overflow-hidden" style={{ backgroundColor: INK }}>
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.92) 0%, rgba(13,18,12,0.45) 55%, rgba(13,18,12,0.15) 100%)' }}
      />
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ backgroundImage: GRAIN, opacity: 0.07 }} />

      <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-[6vw] pb-14 md:pb-16">
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
          <span className="text-[10px] uppercase tracking-[4px] font-medium" style={{ color: 'rgba(246,243,236,0.72)' }}>
            {eyebrow}
          </span>
        </motion.div>
        <motion.h1
          className="font-display font-light text-[clamp(42px,6vw,84px)] leading-[0.98]"
          style={{ color: IVORY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {words.slice(0, -1).join(' ')}{words.length > 1 ? ' ' : ''}
          <em className="italic" style={{ color: '#d3b787' }}>{words[words.length - 1]}</em>
        </motion.h1>
        {intro && (
          <motion.p
            className="font-serif italic text-[17px] md:text-[20px] leading-relaxed max-w-[620px] mt-5"
            style={{ color: 'rgba(246,243,236,0.8)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
