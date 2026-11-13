// GA4 events. Safe to call anywhere: without gtag loaded (no NEXT_PUBLIC_GA_ID,
// or no consent) it does nothing. Consent Mode in Analytics.tsx decides what
// Google may store.
export const LEAD_KEY = 'kotli:lead';

type Gtag = (...args: unknown[]) => void;

// gtag is defined by the init script in Analytics.tsx, which loads after the
// page. An event fired on mount (the thank-you page's generate_lead) can arrive
// before it, so wait up to 10 s for gtag instead of dropping the event.
export function track(event: string, params: Record<string, unknown> = {}) {
  const send = () => {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (!gtag) return false;
    gtag('event', event, params);
    return true;
  };
  if (send()) return;
  let tries = 0;
  const timer = setInterval(() => {
    if (send() || ++tries >= 40) clearInterval(timer);
  }, 250);
}
