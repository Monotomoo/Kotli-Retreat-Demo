'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// GDPR-safe Google Analytics 4 + Google Ads via Consent Mode v2.
//
// Storage is DENIED by default (mandatory for DE/AT/CH: GA must not set cookies
// or send identifiable pings before the visitor opts in). When the visitor
// clicks "accept" in the cookie banner, consent is upgraded to granted.
//
// IDs come from env, so nothing loads until they are set in Vercel:
//   NEXT_PUBLIC_GA_ID          e.g. G-XXXXXXXXXX   (Analytics)
//   NEXT_PUBLIC_GOOGLE_ADS_ID  e.g. AW-XXXXXXXXX   (Ads — dormant until set)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CONSENT_KEY = 'ss_cookie_consent';

export default function Analytics() {
  useEffect(() => {
    const applyConsent = () => {
      let accepted = false;
      try {
        accepted = localStorage.getItem(CONSENT_KEY) === 'accepted';
      } catch {
        // localStorage unavailable
      }
      if (!accepted) return;

      const w = window as unknown as {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
      };
      w.dataLayer = w.dataLayer || [];
      // Reuse the gtag defined by the init script, or queue until the library loads.
      w.gtag = w.gtag || ((...args: unknown[]) => w.dataLayer!.push(args));
      w.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    };

    applyConsent(); // returning visitors who already accepted
    window.addEventListener('ss-consent-change', applyConsent);
    return () => window.removeEventListener('ss-consent-change', applyConsent);
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
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
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
