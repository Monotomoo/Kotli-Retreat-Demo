'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LEAD_KEY, track } from '@/lib/analytics';

// Shown after a successful inquiry. The form leaves a flag in sessionStorage, so
// generate_lead fires once per inquiry: not on reload, not on a direct visit.
const INK = '#0d120c';
const IVORY = '#f6f3ec';
const BRASS_LIGHT = '#d3b787';

export default function ThankYouV2() {
  const t = useTranslations('thankYou');

  useEffect(() => {
    try {
      const pkg = sessionStorage.getItem(LEAD_KEY);
      if (pkg === null) return;
      sessionStorage.removeItem(LEAD_KEY);
      track('generate_lead', { package: pkg });
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-5 pt-32 pb-20" style={{ backgroundColor: INK }}>
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: 'rgba(211,183,135,0.15)', border: '1px solid rgba(211,183,135,0.45)' }}
      >
        <Check className="w-8 h-8" style={{ color: BRASS_LIGHT }} strokeWidth={1.75} />
      </div>
      <h1 className="font-display font-light text-[clamp(32px,4vw,52px)] leading-tight" style={{ color: IVORY }}>
        {t('title')}
      </h1>
      <p className="text-[15px] leading-relaxed mt-4 max-w-[460px]" style={{ color: 'rgba(246,243,236,0.7)' }}>
        {t('body')}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <a
          href="https://wa.me/385992563862"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-[10px] font-semibold uppercase tracking-[2.5px] no-underline rounded-[3px]"
          style={{ border: '1px solid rgba(176,141,87,0.45)', color: BRASS_LIGHT }}
        >
          WhatsApp →
        </a>
        <Link href="/" className="px-6 py-3 text-[10px] font-semibold uppercase tracking-[2.5px] no-underline rounded-[3px]" style={{ backgroundColor: IVORY, color: '#141a12' }}>
          {t('back')}
        </Link>
      </div>
    </section>
  );
}
