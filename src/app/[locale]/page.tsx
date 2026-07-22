import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

export default async function LocaleRoot({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === 'string') qs.set(k, v);
    else if (Array.isArray(v)) v.forEach((val) => qs.append(k, val));
  }
  const queryStr = qs.toString();
  redirect(`/${locale}/istria${queryStr ? `?${queryStr}` : ''}`);
}
