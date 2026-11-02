// GA4 events. Safe to call anywhere: without gtag loaded (no NEXT_PUBLIC_GA_ID)
// it does nothing. Consent Mode in Analytics.tsx decides what Google may store.
export const LEAD_KEY = 'kotli:lead';

export function track(event: string, params: Record<string, unknown> = {}) {
  (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.('event', event, params);
}
