import { setRequestLocale } from 'next-intl/server';
import HeaderV2 from '@/components/v2/HeaderV2';
import HeroV2 from '@/components/v2/HeroV2';
import WhyV2 from '@/components/v2/WhyV2';
import HostsV2 from '@/components/v2/HostsV2';
import AgendaV2 from '@/components/v2/AgendaV2';
import DestinationsV2 from '@/components/v2/DestinationsV2';
import IncludesV2 from '@/components/v2/IncludesV2';
import AccommodationV2 from '@/components/v2/AccommodationV2';
import PricingV2 from '@/components/v2/PricingV2';
import ContactV2 from '@/components/v2/ContactV2';
import FaqV2 from '@/components/v2/FaqV2';
import FooterV2 from '@/components/v2/FooterV2';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import StickyMobileCta from '@/components/StickyMobileCta';

// V2 redesign playground — original stays untouched at /istria.
// Sections are swapped to v2 components one by one as the redesign progresses.
export default async function IstriaV2Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeaderV2 />
      <main>
        <HeroV2 />
        <AccommodationV2 />
        <WhyV2 />
        <HostsV2 />
        <AgendaV2 />
        <DestinationsV2 />
        <PricingV2 />
        <IncludesV2 />
        <ContactV2 />
        <FaqV2 />
      </main>
      <FooterV2 />
      <WhatsAppFloat />
      <StickyMobileCta />
    </>
  );
}
