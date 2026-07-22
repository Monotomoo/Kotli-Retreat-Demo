# Soil & Soul Istria — Project Handover

**Landing page za Prava Croatia** — 5-dnevno kulinarsko putovanje kroz Istru za grupe 10–34 osobe. Ciljano DACH tržište (Njemačka, Austrija, Švicarska).

---

## Stack

- **Next.js 16** (App Router + Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS 4** (`@theme inline` — sve varijable u `src/app/globals.css`)
- **framer-motion** (animacije, scroll reveal)
- **next-intl** (i18n — HR / EN / DE)
- **lucide-react** (ikone)
- Node **20+** preporučeno

---

## Kako pokrenuti

```bash
npm install
npm run dev
```

Otvori: `http://localhost:5006/hr/istria` (defaultni razvoj port je 5006 — vidi `package.json`).

Ostale rute:
- `/hr/istria` `/en/istria` `/de/istria` — glavni landing
- `/hr/privacy` `/en/privacy` `/de/privacy` — GDPR privacy policy
- `/hr` `/en` `/de` — root redirect

**Build i test:**
```bash
npm run build     # production build
npm run start     # pokreni production build lokalno
npm run lint      # ESLint
```

---

## Struktura projekta

```
src/
├── app/
│   ├── [locale]/
│   │   ├── istria/page.tsx    ← glavni landing (sve sekcije)
│   │   ├── privacy/page.tsx   ← GDPR privacy policy
│   │   └── layout.tsx         ← locale layout + CookieBanner
│   └── globals.css            ← Tailwind theme (@theme inline)
├── components/
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── WhySection.tsx         ← 5 razloga (URL param ?wv=a|b|c)
│   ├── HostsSection.tsx
│   ├── AgendaSection.tsx      ← 5 dana putovanja
│   ├── AccommodationSection.tsx ← Kotli galerija
│   ├── DestinationsSection.tsx  ← Rovinj/Motovun/Hum
│   ├── IncludesSection.tsx    ← "što je uključeno" (Dark Michelin variant)
│   ├── PricingSection.tsx     ← 3 paketa
│   ├── TrustSection.tsx
│   ├── ContactSection.tsx     ← forma s GDPR checkbox
│   ├── FAQSection.tsx
│   ├── Footer.tsx
│   ├── CookieBanner.tsx       ← GDPR/DSGVO consent
│   ├── WhatsAppFloat.tsx
│   ├── */variants/            ← A/B/C dizajn varijante (query-param switcher)
│   └── motion/                ← Reveal, StaggerContainer helperi
├── messages/                  ← i18n
│   ├── hr.json
│   ├── en.json
│   └── de.json
└── i18n/
    ├── routing.ts             ← next-intl config
    └── request.ts
```

---

## URL query parametri za variant testing

Više sekcija ima A/B/C varijante koje se prebacuju query paramom (npr. za usporedbu dizajna):

| Param | Sekcija | Vrijednosti |
|---|---|---|
| `?wv=` | WhySection | a, b, c (default: b) |
| `?iv=` | IncludesSection | a (jedina aktivna) |
| `?cv=` | ContactSection | b (jedina aktivna) |

Primjer: `http://localhost:5006/hr/istria?wv=c`

---

## i18n — dodavanje novog jezika

1. Kopiraj `src/messages/hr.json` u `src/messages/xx.json`, prevedi
2. U `src/i18n/routing.ts` dodaj `xx` u `locales` polje
3. U `[locale]/layout.tsx` je već dinamički, ništa dodatno

---

## Ključne datoteke za brand/content izmjene

- **Sav copy:** `src/messages/{hr,en,de}.json`
- **Boje i fontovi:** `src/app/globals.css` (`@theme inline`)
- **SEO meta:** `messages/*.json` → `meta.title` / `meta.description`
- **Cijene i paketi:** `messages/*.json` → `pricing.cards`
- **Agenda dan-po-dan:** `messages/*.json` → `agenda.days`
- **Fotografije:** `public/images/`

---

## Deploy

**Preporuka: Vercel** (native Next.js, 1-click).

1. Napravi novi git repo (bez naslijeđenog remote-a)
2. Push na GitHub/GitLab
3. Vercel → Import Project → odaberi repo → Deploy
4. Bez ENV varijabli — sve je static + client-side

**Alternative:**
- Netlify — Next.js podržan preko plugin-a
- Self-hosted: `npm run build` + `npm run start` iza Nginx/PM2
- Statički export nije moguć zbog next-intl middleware-a

---

## Ono što još treba prije produkcije

- [ ] Pravni pregled Privacy Policy teksta (odvjetnik, HR + DE tržište)
- [ ] Impressum / Opći uvjeti / Uvjeti putovanja stranice (footer linkovi trenutno `#`)
- [ ] Kontakt backend — trenutno `useContactSubmit` ne šalje ništa (dodati mail servis: Resend, SendGrid, ili webhook)
- [ ] Google Analytics / Plausible integracija (uz cookie consent koji već postoji)
- [ ] Prava produkcijska domena + SSL
- [ ] Open Graph slike (`/public/og-image.jpg` — trenutno nema)
- [ ] Zamjena preostalih placeholder unsplash slika (day 4 agenda)
- [ ] Impressum je zakonska obveza za DE/AT tržište — DODATI PRIJE LANSIRANJA DACH-a

---

## Kontakt (voditelj projekta)

- Darko — dr.herc@gmail.com
- Prava Croatia — info@pravacroatia.com — +385 99 256 3862

Design brand poruka: *"Original experiences, local stories."*
