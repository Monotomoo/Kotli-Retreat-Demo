'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';

// GDPR-safe Google Analytics 4 + Google Ads via Consent Mode v2.
//
// Storage is DENIED by default (mandatory for DE/AT/CH: GA must not set cookies
// or send identifiable pings before the visitor opts in). When the visitor
// clicks "accept" in the cookie banner, consent is upgraded to granted; returning
// visitors who accepted start granted.
//
// IDs come from env, so nothing loads until they are set in Vercel:
//   NEXT_PUBLIC_GA_ID          e.g. G-XXXXXXXXXX   (Analytics)
//   NEXT_PUBLIC_GOOGLE_ADS_ID  e.g. AW-XXXXXXXXX   (Ads — dormant until set)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CONSENT_KEY = 'ss_cookie_consent';

export default function Analytics() {
  useEffect(() => {
    const onConsent = () => {
      let accepted = false;
      try {
        accepted = localStorage.getItem(CONSENT_KEY) === 'accepted';
      } catch {
        // localStorage unavailable
      }
      if (!accepted) return;
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    };

    // Conversions: every WhatsApp and phone link on the site, wherever it sits.
    const onClick = (e: MouseEvent) => {
      const href = (e.target as Element).closest?.('a[href]')?.getAttribute('href') ?? '';
      if (href.includes('wa.me/')) track('whatsapp_click');
      else if (href.startsWith('tel:')) track('phone_click');
    };

    window.addEventListener('ss-consent-change', onConsent);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('ss-consent-change', onConsent);
      document.removeEventListener('click', onClick);
    };
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var consent = 'denied';
          try { if (localStorage.getItem('${CONSENT_KEY}') === 'accepted') consent = 'granted'; } catch (e) {}
          gtag('consent', 'default', {
            ad_storage: consent,
            ad_user_data: consent,
            ad_personalization: consent,
            analytics_storage: consent,
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
          ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ''}
        `}
      </Script>
    </>
  );
}
