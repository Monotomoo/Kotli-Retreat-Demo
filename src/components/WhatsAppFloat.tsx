'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show after scrolling past the hero (100vh)
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/385992563862"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[998] w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_2px_12px_rgba(37,211,102,0.4)] cursor-pointer no-underline group"
          title="WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.1 }}
        >
          <MessageCircle className="w-5 h-5" />

          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-white text-text-dark px-3 py-1.5 text-xs font-medium shadow-[0_2px_12px_rgba(0,0,0,0.1)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded">
            {t('whatsappFloat')}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
