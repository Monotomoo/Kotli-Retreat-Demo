'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

// V2 Hosts — "The Families". Editorial portrait wall on warm stone:
// monochrome portraits that come alive in color on hover, numbered like the
// rest of the site, each closing with the family's own words.
const STONE = '#ede7da';
const INK = '#1c1a15';
const BRASS = '#b08d57';
const BRASS_DARK = '#8a6b3f';

const PORTRAITS = [
  { src: '/images/hosts/host-1.png', position: 'center' },
  { src: '/images/hosts/host-2.png', position: '100% center' },
  { src: '/images/hosts/host-3.jpg', position: 'center' },
  { src: '/images/hosts/host-4.jpg', position: 'center' },
];

export default function HostsV2() {
  const t = useTranslations('hosts');
  const cards = t.raw('cards') as { name: string; role: string; bio: string; quote: string }[];

  return (
    <section id="hosts" className="relative overflow-hidden" style={{ backgroundColor: STONE }}>
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
            <h2 className="font-display font-light text-[clamp(30px,3.6vw,50px)] leading-[1.05]" style={{ color: INK }}>
              {t('title')}
            </h2>
            <p
              className="font-serif italic text-[15px] md:text-[16px] leading-relaxed max-w-[380px] md:text-right md:pb-1.5"
              style={{ color: 'rgba(28,26,21,0.58)' }}
            >
              {t('subtitle')}
            </p>
          </div>
        </motion.div>

        {/* Portrait wall */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-12 mt-12">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="group flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Portrait — monochrome until touched */}
              <div className="relative aspect-[3/4] rounded-[4px] overflow-hidden mb-5 shadow-[0_18px_45px_rgba(28,26,21,0.18)]">
                <Image
                  src={PORTRAITS[i]?.src ?? PORTRAITS[0].src}
                  alt={card.name}
                  fill
                  className="object-cover grayscale-[0.92] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[850ms] ease-out"
                  style={{ objectPosition: PORTRAITS[i]?.position ?? 'center' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw"
                />
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-40"
                  style={{ background: 'linear-gradient(to top, rgba(28,26,21,0.28), transparent 45%)' }}
                />
              </div>

              {/* Name block */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif italic text-[13px]" style={{ color: BRASS_DARK }}>
                  0{i + 1}
                </span>
                <h3 className="font-display text-[21px] leading-tight" style={{ color: INK }}>
                  {card.name}
                </h3>
              </div>
              <div
                className="text-[9px] uppercase tracking-[2.5px] font-sans font-semibold mt-1.5 ml-8"
                style={{ color: BRASS_DARK }}
              >
                {card.role}
              </div>
              <p className="text-[13px] leading-relaxed mt-3 mb-4 ml-8" style={{ color: 'rgba(28,26,21,0.6)' }}>
                {card.bio}
              </p>

              {/* Their words */}
              <div
                className="ml-8"
                style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(28,26,21,0.14)' }}
              >
                <p className="font-serif italic text-[14.5px] leading-snug" style={{ color: 'rgba(28,26,21,0.78)' }}>
                  <span style={{ color: BRASS }}>&mdash;&nbsp;</span>
                  &bdquo;{card.quote}&ldquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="mx-5 md:mx-[6vw] h-px" style={{ backgroundColor: 'rgba(28,26,21,0.1)' }} />
    </section>
  );
}
