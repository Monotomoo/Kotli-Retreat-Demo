'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// V2 — Editorial masthead with visible numbered nav + scroll-spy.
// Desktop: wordmark · centered links · languages + CTA. Mobile: burger → ink overlay.
const INK = '#10160f';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';
const BRASS_LIGHT = '#d3b787';
const DARK_TEXT = '#1c1a15';

export default function HeaderV2() {
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: brass-mark the section currently in view
  useEffect(() => {
    const ids = ['hosts', 'agenda', 'accommodation', 'pricing'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const switchLocale = (newLocale: string) => {
    const path = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(path);
  };

  const goTo = (id: string) => {
    setOpen(false);
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
      open ? 350 : 0
    );
  };

  const navItems = [
    { id: 'accommodation', label: t('nav.accommodation') },
    { id: 'hosts', label: t('nav.hosts') },
    { id: 'agenda', label: t('nav.agenda') },
    { id: 'pricing', label: t('nav.pricing') },
  ];

  const overlayItems = [
    ...navItems,
    { id: 'destinations', label: t('nav.destinations') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const light = !scrolled || open;
  const ink = light ? IVORY : DARK_TEXT;
  const inkFaded = light ? 'rgba(246,243,236,0.6)' : 'rgba(28,26,21,0.55)';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1100] transition-all duration-500 ${
          scrolled && !open ? 'backdrop-blur-md border-b' : 'border-b border-transparent'
        }`}
        style={
          scrolled && !open
            ? { backgroundColor: 'rgba(246,243,236,0.93)', borderColor: 'rgba(0,0,0,0.08)' }
            : undefined
        }
      >
        <div className="relative flex items-center justify-between px-5 md:px-[4vw] py-4">
          {/* Wordmark */}
          <button
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left cursor-pointer bg-transparent border-none shrink-0"
          >
            <span
              className="font-display font-light uppercase text-[19px] md:text-[20px] leading-none block tracking-[0.32em] transition-colors duration-500"
              style={{ color: ink }}
            >
              Kotli
            </span>
            <span
              className="block mt-[6px] text-[7.5px] tracking-[0.58em] uppercase font-sans font-semibold transition-colors duration-500"
              style={{ color: light ? BRASS_LIGHT : BRASS }}
            >
              Retreat
            </span>
          </button>

          {/* Center nav — numbered editorial links with brass underline sweep */}
          <nav className="hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item, i) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className="group relative flex items-baseline gap-1.5 cursor-pointer bg-transparent border-none py-1"
                >
                  <span
                    className="font-serif italic text-[11px] transition-colors duration-300"
                    style={{ color: isActive ? BRASS : light ? 'rgba(211,183,135,0.75)' : 'rgba(176,141,87,0.8)' }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="text-[11.5px] uppercase tracking-[2.5px] font-sans font-semibold transition-colors duration-300"
                    style={{ color: isActive ? (light ? BRASS_LIGHT : BRASS) : ink }}
                  >
                    {item.label}
                  </span>
                  {/* Underline sweep */}
                  <span
                    className={`absolute -bottom-0.5 left-4 right-0 h-px origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    style={{ backgroundColor: light ? BRASS_LIGHT : BRASS }}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-5 md:gap-6 shrink-0">
            <div className="flex items-center gap-1">
              {['de', 'en', 'hr'].map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  className="px-1.5 py-1 text-[11px] tracking-[1.5px] font-sans font-semibold cursor-pointer bg-transparent border-none transition-colors duration-300 relative"
                  style={{ color: locale === l ? ink : inkFaded }}
                >
                  {l.toUpperCase()}
                  {locale === l && (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1 h-1 rounded-full"
                      style={{ backgroundColor: BRASS }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => goTo('contact')}
              className="hidden md:block px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[2.5px] font-sans cursor-pointer transition-all duration-300 rounded-[2px] border"
              style={{ borderColor: light ? 'rgba(246,243,236,0.4)' : 'rgba(28,26,21,0.35)', color: ink, backgroundColor: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = light ? IVORY : DARK_TEXT;
                e.currentTarget.style.color = light ? DARK_TEXT : IVORY;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = light ? IVORY : DARK_TEXT;
              }}
            >
              {t('cta')}
            </button>

            {/* Burger — mobile/tablet only */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden flex items-center cursor-pointer bg-transparent border-none"
              aria-expanded={open}
              aria-label="Menu"
            >
              <span className="relative w-6 h-3 block">
                <span
                  className="absolute left-0 w-6 h-px transition-all duration-300"
                  style={{
                    backgroundColor: ink,
                    top: open ? '6px' : 0,
                    transform: open ? 'rotate(45deg)' : 'none',
                  }}
                />
                <span
                  className="absolute left-0 w-6 h-px transition-all duration-300"
                  style={{
                    backgroundColor: ink,
                    bottom: open ? 'auto' : 0,
                    top: open ? '6px' : 'auto',
                    transform: open ? 'rotate(-45deg)' : 'none',
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[1090] lg:hidden"
            style={{ backgroundColor: INK }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="h-full flex flex-col justify-center px-8 pt-16">
              {overlayItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline gap-4 py-3 border-b cursor-pointer bg-transparent text-left w-full"
                  style={{ borderColor: 'rgba(246,243,236,0.07)' }}
                >
                  <span className="font-serif italic text-[12px] shrink-0 w-6" style={{ color: BRASS }}>
                    0{i + 1}
                  </span>
                  <span className="font-display font-light text-[30px] leading-tight" style={{ color: IVORY }}>
                    {item.label}
                  </span>
                </motion.button>
              ))}

              <motion.div
                className="mt-8 flex flex-col gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <a
                  href="mailto:info@pravacroatia.com"
                  className="text-sm no-underline"
                  style={{ color: 'rgba(246,243,236,0.6)' }}
                >
                  info@pravacroatia.com
                </a>
                <a
                  href="https://wa.me/385992563862"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm no-underline"
                  style={{ color: 'rgba(246,243,236,0.6)' }}
                >
                  +385 99 256 3862
                </a>
                <div className="flex gap-3 mt-2">
                  {['de', 'en', 'hr'].map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLocale(l)}
                      className="text-[12px] tracking-[2px] font-semibold cursor-pointer bg-transparent border-none"
                      style={{ color: locale === l ? BRASS_LIGHT : 'rgba(246,243,236,0.4)' }}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            <div
              className="absolute bottom-6 left-8 text-[8.5px] uppercase tracking-[3.5px]"
              style={{ color: 'rgba(246,243,236,0.3)' }}
            >
              Original Experiences — Local Stories
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
