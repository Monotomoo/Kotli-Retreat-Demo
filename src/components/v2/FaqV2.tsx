'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

// V2 FAQ — numbered editorial accordion, continuing the ink act.
// One question open at a time; serif + toggles, hairline rows.
const INK = '#0d120c';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';
const BRASS_LIGHT = '#d3b787';

export default function FaqV2() {
  const t = useTranslations('faq');
  const items = t.raw('items') as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative" style={{ backgroundColor: INK }}>
      {/* Seam from contact */}
      <div className="mx-5 md:mx-[6vw] h-px" style={{ backgroundColor: 'rgba(246,243,236,0.09)' }} />

      <div className="px-5 md:px-[6vw] pt-14 md:pt-20 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Header — left, stays put */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
              <span className="text-[10px] uppercase tracking-[4px] font-sans font-semibold" style={{ color: BRASS_LIGHT }}>
                {t('label')}
              </span>
            </div>
            <h2 className="font-display font-light text-[clamp(30px,3.4vw,46px)] leading-[1.05]" style={{ color: IVORY }}>
              {t('title')}
            </h2>
          </motion.div>

          {/* Accordion */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} style={{ borderBottom: '1px solid rgba(246,243,236,0.09)' }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-baseline gap-5 py-5 cursor-pointer bg-transparent border-none text-left group"
                  >
                    <span className="font-serif italic text-[13px] shrink-0 w-7" style={{ color: isOpen ? BRASS_LIGHT : 'rgba(176,141,87,0.55)' }}>
                      0{i + 1}
                    </span>
                    <span
                      className="flex-1 font-display text-[17px] md:text-[19px] leading-snug transition-colors duration-300"
                      style={{ color: isOpen ? IVORY : 'rgba(246,243,236,0.75)' }}
                    >
                      {item.q}
                    </span>
                    <span
                      className="shrink-0 font-serif text-[20px] leading-none transition-transform duration-400"
                      style={{
                        color: BRASS_LIGHT,
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="pl-12 pr-8 pb-6 text-[14px] leading-relaxed max-w-[72ch]"
                          style={{ color: 'rgba(246,243,236,0.62)' }}
                        >
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
