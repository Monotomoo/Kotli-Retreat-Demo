'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { track } from '@/lib/analytics';

// GDPR-safe Google Analytics 4 + Google Ads.
//
// Nothing from Google loads until the visitor clicks "accept" in the cookie
// banner; returning visitors who accepted load it straight away. If they later
// withdraw from the footer's cookie settings, consent goes to denied and
// Google's cookies are removed.
//
// IDs come from env, so nothing loads until they are set in Vercel:
//   NEXT_PUBLIC_GA_ID          e.g. G-XXXXXXXXXX   (Analytics)
//   NEXT_PUBLIC_GOOGLE_ADS_ID  e.g. AW-XXXXXXXXX   (Ads — dormant until set)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CONSENT_KEY = 'ss_cookie_consent';

const hasConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false; // localStorage unavailable
  }
};

// Expire Google's cookies on this host and on the bare domain.
const clearGoogleCookies = () => {
  const bare = location.hostname.replace(/^www\./, '');
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (!/^(_ga|_gid|_gat|_gcl)/.test(name)) return;
    const gone = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = gone;
    document.cookie = `${gone}; domain=.${bare}`;
  });
};

export default function Analytics() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (hasConsent()) setLoad(true);

    const onConsent = () => {
      const accepted = hasConsent();
      if (accepted) setLoad(true);
      else clearGoogleCookies();
      const state = accepted ? 'granted' : 'denied';
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.('consent', 'update', {
        analytics_storage: state,
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
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

  if (!GA_ID || !load) return null;

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
