'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { PACKAGES } from '@/lib/packages';

// Homepage package index — one editorial card per package in the registry,
// plus a "coming next" card. Adding a package to src/lib/packages.ts and its
// card text to home.packages.cards puts it here automatically.
const STONE = '#ede7da';
const INK = '#1c1a15';
const BRASS = '#b08d57';
const BRASS_DARK = '#8a6b3f';

interface CardText {
  badge: string;
  name: string;
  tagline: string;
  length: string;
  group: string;
  price: string;
}

export default function PackagesV2({ exclude }: { exclude?: string } = {}) {
  const t = useTranslations('home.packages');
  const items = PACKAGES.filter((p) => p.slug !== exclude);

  return (
    <section id="packages" className="relative scroll-mt-16" style={{ backgroundColor: STONE }}>
      <div className="px-5 md:px-[6vw] pt-16 md:pt-24 pb-16 md:pb-24">
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
            <h2 className="font-display font-light text-[clamp(30px,3.6vw,50px)] leading-[1.05] max-w-[640px]" style={{ color: INK }}>
              {exclude ? t('otherTitle') : t('title')}
            </h2>
            {!exclude && (
              <p className="font-serif italic text-[15px] md:text-[16px] leading-relaxed max-w-[380px] md:text-right" style={{ color: 'rgba(28,26,21,0.58)' }}>
                {t('subtitle')}
              </p>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mt-12">
          {items.map((p, i) => {
            const c = t.raw(`cards.${p.cardKey}`) as CardText;
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/${p.slug}`}
                  className="group block h-full rounded-[6px] overflow-hidden no-underline transition-transform duration-500 hover:-translate-y-1.5"
                  style={{ backgroundColor: '#fbf9f3', boxShadow: '0 22px 55px rgba(28,26,21,0.12)' }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={c.name}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,18,12,0.55), transparent 55%)' }} />
                    <span
                      className="absolute top-4 left-4 text-[9px] uppercase tracking-[2.5px] font-bold px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: 'rgba(246,243,236,0.92)', color: '#141a12' }}
                    >
                      {c.badge}
                    </span>
                    <span className="absolute bottom-4 left-5 font-display text-[22px] italic" style={{ color: '#f6f3ec' }}>
                      {c.length}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-[26px] leading-tight" style={{ color: INK }}>
                      {c.name}
                    </h3>
                    <p className="font-serif italic text-[15px] leading-snug mt-2" style={{ color: 'rgba(28,26,21,0.6)' }}>
                      {c.tagline}
                    </p>
                    <div className="flex items-end justify-between gap-4 mt-6 pt-5" style={{ borderTop: '1px solid rgba(28,26,21,0.1)' }}>
                      <div>
                        <div className="font-display text-[24px] leading-none" style={{ color: INK }}>
                          {c.price}
                        </div>
                        <div className="text-[10px] uppercase tracking-[2px] mt-2" style={{ color: 'rgba(28,26,21,0.45)' }}>
                          {c.group}
                        </div>
                      </div>
                      <span className="text-[10px] uppercase tracking-[2.5px] font-semibold pb-1 border-b" style={{ color: BRASS_DARK, borderColor: 'rgba(138,107,63,0.4)' }}>
                        {t('view')} →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Coming next */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: items.length * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[6px] p-8 flex flex-col justify-between min-h-[280px]"
            style={{ border: '1px dashed rgba(28,26,21,0.25)' }}
          >
            <div>
              <span className="text-[9px] uppercase tracking-[2.5px] font-bold px-3 py-1.5 rounded-full" style={{ border: '1px solid rgba(176,141,87,0.5)', color: BRASS_DARK }}>
                {t('soon.badge')}
              </span>
              <h3 className="font-display text-[26px] leading-tight mt-5" style={{ color: INK }}>
                {t('soon.title')}
              </h3>
              <p className="font-serif italic text-[15px] leading-snug mt-2" style={{ color: 'rgba(28,26,21,0.6)' }}>
                {t('soon.text')}
              </p>
            </div>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="self-start mt-6 text-[10px] uppercase tracking-[2.5px] font-semibold pb-1 border-b bg-transparent cursor-pointer"
              style={{ color: BRASS_DARK, borderColor: 'rgba(138,107,63,0.4)', borderTop: 0, borderLeft: 0, borderRight: 0 }}
            >
              {t('soon.cta')} →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
