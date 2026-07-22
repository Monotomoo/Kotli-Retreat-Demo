'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function StickyMobileCta() {
  const t = useTranslations();

  return (
    <motion.div
      className="md:hidden fixed bottom-0 left-0 right-0 bg-coral/90 backdrop-blur-sm p-3 z-[999] text-center"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.5, duration: 0.5, ease: 'easeOut' }}
    >
      <button
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-white text-coral border-none px-8 py-3 text-sm font-bold font-sans cursor-pointer w-full rounded-sm"
      >
        {t('stickyMobile')}
      </button>
    </motion.div>
  );
}
