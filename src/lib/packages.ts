// Every bookable package is one entry here. A package page lives at
// /<slug> (/de/<slug>, …) and is rendered from the message namespace `ns`,
// which has the same shape for every package: meta, hero, agenda, pricing,
// includes. Soil and Soul predates the registry, so its namespace is the root.
export interface PackageDef {
  slug: string;
  ns: string; // '' = root namespace (hero, agenda, …)
  cardKey: string; // home.packages.cards.<cardKey>
  image: string; // card + hero fallback image
  inset: string; // second photo on the /packages spread
  dayImages: { src: string; alt: string }[];
  /** fixed open dates (ISO, arrival → departure); turns on the dated pricing layout */
  dates?: { from: string; to: string; guaranteed?: boolean }[];
  /** extra Soil-and-Soul-only sections (hosts, destinations) */
  full?: boolean;
  /** turns on the accommodation + why sections, from the package's own namespace; [main, accent] photo per reason */
  whyLayers?: { main: string; accent: string }[];
}

export const PACKAGES: PackageDef[] = [
  {
    slug: 'soil-and-soul',
    ns: '',
    cardKey: 'soilAndSoul',
    image: '/images/agenda/day3.png',
    inset: '/images/agenda/day2.jpg',
    full: true,
    dayImages: [
      { src: '/images/agenda/day1.jpg', alt: 'Arrival in Kotli' },
      { src: '/images/agenda/day2.jpg', alt: 'Truffle hunt with the Karlić family' },
      { src: '/images/agenda/day3.png', alt: 'Olive oil and wine at sunset' },
      { src: '/images/agenda/day4.jpg', alt: 'Michelin dinner in Rovinj' },
      { src: '/images/agenda/day5.avif', alt: 'Farewell morning on the terrace' },
    ],
  },
  {
    slug: 'winter-truffles',
    ns: 'winter',
    cardKey: 'winter',
    image: '/images/kotli/interior-fireplace.jpg',
    inset: '/images/hosts/vineyard.jpg',
    whyLayers: [
      { main: '/images/hosts/host-1.png', accent: '/images/destinations/motovun-hilltop.jpg' },
      { main: '/images/hosts/vineyard.jpg', accent: '/images/hosts/host-2.png' },
      { main: '/images/kotli/interior-fireplace.jpg', accent: '/images/kotli/interior-dining.jpg' },
      { main: '/images/destinations/hum-b.jpg', accent: '/images/destinations/motovun-a.jpg' },
      { main: '/images/kotli/houses-overview.jpg', accent: '/images/kotli/river-mill.jpg' },
    ],
    dayImages: [
      { src: '/images/kotli/interior-fireplace.jpg', alt: 'Fireplace in a Kotli stone house' },
      { src: '/images/hosts/host-1.png', alt: 'Truffle lunch with the Karlić family' },
      { src: '/images/destinations/hum-b.jpg', alt: 'Hum, the smallest town in the world' },
    ],
    dates: [
      { from: '2026-11-27', to: '2026-11-29' },
      { from: '2026-12-11', to: '2026-12-13' },
      { from: '2026-12-18', to: '2026-12-20' },
      { from: '2027-01-15', to: '2027-01-17', guaranteed: true },
      { from: '2027-01-29', to: '2027-01-31' },
      { from: '2027-02-12', to: '2027-02-14', guaranteed: true },
      { from: '2027-02-26', to: '2027-02-28' },
      { from: '2027-03-12', to: '2027-03-14' },
    ],
  },
];

export const packageBySlug = (slug: string) => PACKAGES.find((p) => p.slug === slug);

/** Namespace helper: tNs('', 'agenda') → 'agenda', tNs('winter', 'agenda') → 'winter.agenda' */
export const tNs = (ns: string | undefined, key: string) => (ns ? `${ns}.${key}` : key);
