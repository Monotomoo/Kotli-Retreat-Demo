'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import HostsV2 from './HostsV2';

// /about — the village. Story in three chapters beside the river photograph,
// a facts band, the stone houses as a photo mosaic with what is in every
// house, then the places around Kotli.
const IVORY = '#f6f3ec';
const STONE = '#ede7da';
const INK = '#1c1a15';
const DARK = '#0d120c';
const BRASS = '#b08d57';
const BRASS_DARK = '#8a6b3f';
const BRASS_LIGHT = '#d3b787';

// Mosaic tiles: [image, caption key, grid placement]
const TILES: [string, string, string][] = [
  ['/images/kotli-gallery/1.jpg', 'exterior', 'md:col-span-2 md:row-span-2'],
  ['/images/kotli/interior-fireplace.jpg', 'fireplace', ''],
  ['/images/kotli/interior-dining.jpg', 'dining', ''],
  ['/images/kotli-gallery/6.jpg', 'bedroom', ''],
  ['/images/kotli-gallery/8-3.jpg', 'pool', 'md:row-span-2'],
  ['/images/kotli/terrace.jpg', 'terrace', ''],
  ['/images/kotli-gallery/8-4.jpg', 'tables', 'md:col-span-2'],
];

const Label = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div className="flex items-center gap-4 mb-4">
    <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
    <span className="text-[10px] uppercase tracking-[4px] font-semibold" style={{ color: light ? BRASS_LIGHT : BRASS_DARK }}>
      {children}
    </span>
  </div>
);

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
};

export default function AboutKotliV2() {
  const t = useTranslations('aboutPage');
  const chapters = t.raw('story.chapters') as { title: string; text: string }[];
  const facts = t.raw('facts') as { value: string; label: string }[];
  const house = t.raw('amenities.house') as string[];
  const shared = t.raw('amenities.shared') as string[];
  const places = t.raw('around.places') as { name: string; text: string }[];
  const travel = t.raw('around.travel') as string[];

  return (
    <>
      {/* Story */}
      <section style={{ backgroundColor: IVORY }}>
        <div className="px-5 md:px-[6vw] py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div className="lg:col-span-7" {...reveal}>
            <Label>{t('story.label')}</Label>
            <h2 className="font-display font-light text-[clamp(32px,3.8vw,52px)] leading-[1.04]" style={{ color: INK }}>
              {t('story.title')}
            </h2>
            <p className="font-serif text-[19px] md:text-[21px] leading-relaxed mt-6 first-letter:font-display first-letter:text-[64px] first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:mt-1" style={{ color: 'rgba(28,26,21,0.82)' }}>
              {t('story.lead')}
            </p>

            <div className="mt-10 flex flex-col">
              {chapters.map((c, i) => (
                <div key={i} className="grid grid-cols-[56px_1fr] gap-4 py-6" style={{ borderTop: '1px solid rgba(28,26,21,0.1)' }}>
                  <span className="font-display text-[34px] leading-none" style={{ color: 'rgba(176,141,87,0.55)' }}>
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[22px] leading-tight" style={{ color: INK }}>
                      {c.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed mt-2" style={{ color: 'rgba(28,26,21,0.7)' }}>
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.figure className="lg:col-span-5 lg:sticky lg:top-28 self-start m-0" {...reveal} transition={{ ...reveal.transition, delay: 0.12 }}>
            <div className="relative aspect-[3/4] rounded-[6px] overflow-hidden" style={{ boxShadow: '0 34px 80px rgba(28,26,21,0.22)' }}>
              <Image src="/images/kotli/river-mill.jpg" alt={t('story.caption')} fill sizes="(min-width:1024px) 38vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="flex items-center justify-between gap-4 mt-4 text-[10px] uppercase tracking-[2.5px]" style={{ color: 'rgba(28,26,21,0.5)' }}>
              <span>{t('story.caption')}</span>
              <span>45°20′N · 13°57′E</span>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* Facts band */}
      <section style={{ backgroundColor: DARK }}>
        <div className="px-5 md:px-[6vw] py-12 md:py-14 grid grid-cols-2 md:grid-cols-5 gap-y-8">
          {facts.map((f, i) => (
            <motion.div
              key={i}
              className="px-2 md:px-6"
              style={i > 0 ? { borderLeft: '1px solid rgba(211,183,135,0.18)' } : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="font-display font-light text-[clamp(30px,3.2vw,46px)] leading-none" style={{ color: BRASS_LIGHT }}>
                {f.value}
              </div>
              <div className="text-[10px] uppercase tracking-[2.5px] mt-3" style={{ color: 'rgba(246,243,236,0.6)' }}>
                {f.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The houses — mosaic + what is in them */}
      <section id="houses" style={{ backgroundColor: STONE }}>
        <div className="px-5 md:px-[6vw] py-16 md:py-24">
          <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5" {...reveal}>
            <div>
              <Label>{t('houses.label')}</Label>
              <h2 className="font-display font-light text-[clamp(32px,3.8vw,52px)] leading-[1.04] max-w-[620px]" style={{ color: INK }}>
                {t('houses.title')}
              </h2>
            </div>
            <p className="font-serif italic text-[16px] leading-relaxed max-w-[420px] md:text-right" style={{ color: 'rgba(28,26,21,0.62)' }}>
              {t('houses.text')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[210px] gap-3 md:gap-4 mt-12">
            {TILES.map(([src, key, span], i) => (
              <motion.figure
                key={key}
                className={`group relative overflow-hidden rounded-[4px] m-0 ${span} ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <Image src={src} alt={t(`houses.captions.${key}`)} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.65), transparent 50%)' }} />
                <figcaption className="absolute left-4 bottom-3 text-[10px] uppercase tracking-[2.5px] font-semibold" style={{ color: IVORY }}>
                  {t(`houses.captions.${key}`)}
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
            {[
              [t('amenities.houseTitle'), house],
              [t('amenities.sharedTitle'), shared],
            ].map(([title, items], i) => (
              <motion.div
                key={i}
                className="rounded-[6px] p-7 md:p-9"
                style={{ backgroundColor: '#fbf9f3', borderTop: `2px solid ${BRASS}`, boxShadow: '0 18px 45px rgba(28,26,21,0.08)' }}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.1 }}
              >
                <h3 className="font-display text-[24px] leading-tight" style={{ color: INK }}>
                  {title as string}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-5 list-none p-0">
                  {(items as string[]).map((it, j) => (
                    <li key={j} className="flex items-start gap-3 text-[14px] leading-snug" style={{ color: 'rgba(28,26,21,0.78)' }}>
                      <span className="mt-[7px] w-1.5 h-1.5 rotate-45 shrink-0" style={{ backgroundColor: BRASS }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <p className="font-serif italic text-[14px] mt-6" style={{ color: 'rgba(28,26,21,0.55)' }}>
            {t('amenities.note')}
          </p>
        </div>
      </section>

      {/* Around Kotli */}
      <section style={{ backgroundColor: IVORY }}>
        <div className="px-5 md:px-[6vw] py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div className="lg:col-span-7" {...reveal}>
            <Label>{t('around.label')}</Label>
            <h2 className="font-display font-light text-[clamp(30px,3.4vw,46px)] leading-[1.05]" style={{ color: INK }}>
              {t('around.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7 mt-10">
              {places.map((p, i) => (
                <div key={i} className="pt-4" style={{ borderTop: '1px solid rgba(28,26,21,0.12)' }}>
                  <h3 className="font-display text-[21px]" style={{ color: INK }}>
                    {p.name}
                  </h3>
                  <p className="text-[14px] leading-relaxed mt-1.5" style={{ color: 'rgba(28,26,21,0.68)' }}>
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="lg:col-span-5 self-start rounded-[6px] p-8 md:p-10"
            style={{ backgroundColor: DARK }}
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.12 }}
          >
            <div className="text-[10px] uppercase tracking-[3.5px] font-semibold" style={{ color: BRASS_LIGHT }}>
              {t('around.travelTitle')}
            </div>
            <ul className="list-none p-0 mt-5 flex flex-col">
              {travel.map((line, i) => {
                const [place, time] = line.split('|');
                return (
                  <li key={i} className="flex items-baseline justify-between gap-4 py-3" style={i > 0 ? { borderTop: '1px solid rgba(246,243,236,0.08)' } : undefined}>
                    <span className="text-[15px]" style={{ color: 'rgba(246,243,236,0.85)' }}>
                      {place}
                    </span>
                    <span className="font-display text-[20px]" style={{ color: BRASS_LIGHT }}>
                      {time}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="font-serif italic text-[14px] mt-5" style={{ color: 'rgba(246,243,236,0.55)' }}>
              {t('around.travelNote')}
            </p>
          </motion.div>
        </div>
      </section>

      <HostsV2 />

      {/* To the packages */}
      <section style={{ backgroundColor: STONE }}>
        <div className="px-5 md:px-[6vw] py-14 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="font-display font-light text-[clamp(26px,3vw,40px)] leading-[1.08] max-w-[640px]" style={{ color: INK }}>
            {t('cta.title')}
          </h2>
          <Link href="/packages" className="shrink-0 self-start md:self-auto px-8 py-4 text-[11px] font-semibold uppercase tracking-[2.5px] no-underline rounded-[2px]" style={{ backgroundColor: INK, color: IVORY }}>
            {t('cta.button')} →
          </Link>
        </div>
      </section>
    </>
  );
}
