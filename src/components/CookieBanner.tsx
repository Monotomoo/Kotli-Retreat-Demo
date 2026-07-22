'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

const COOKIE_KEY = 'ss_cookie_consent';

export default function CookieBanner() {
  const t = useTranslations('cookies');
  const locale = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(COOKIE_KEY);
      if (!v) setShow(true);
    } catch {
      // localStorage not available
    }
  }, []);

  const set = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(COOKIE_KEY, value);
    } catch {
      // ignore
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-3 left-3 right-3 md:left-auto md:right-5 md:bottom-5 md:max-w-[440px] z-[60]"
          role="dialog"
          aria-labelledby="cookie-banner-title"
        >
          <div className="bg-white border border-warm-gray rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-4 md:p-5 relative">
            <button
              type="button"
              onClick={() => set('declined')}
              aria-label="Close"
              className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-text-dark hover:bg-warm-gray/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-green/15 flex items-center justify-center shrink-0">
                <Cookie className="w-4 h-4 text-green" />
              </div>
              <div className="flex-1 pr-6">
                <h3 id="cookie-banner-title" className="text-[14px] font-semibold text-text-dark mb-1">
                  {t('title')}
                </h3>
                <p className="text-[12.5px] text-text-muted leading-snug">
                  {t('text')}
                  <Link href={`/${locale}/privacy`} className="text-green underline underline-offset-2 hover:text-green-dark">
                    {t('policyLink')}
                  </Link>
                  .
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => set('accepted')}
                    className="flex-1 bg-green text-black px-3 py-2 text-[12.5px] font-semibold rounded-md hover:bg-green-dark hover:text-white transition-colors"
                  >
                    {t('accept')}
                  </button>
                  <button
                    type="button"
                    onClick={() => set('declined')}
                    className="flex-1 bg-white border border-warm-gray text-text-dark px-3 py-2 text-[12.5px] font-medium rounded-md hover:bg-cream transition-colors"
                  >
                    {t('decline')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
