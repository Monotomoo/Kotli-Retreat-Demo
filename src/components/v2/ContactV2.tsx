'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

// V2 Contact — "Plan your journey", form v2.2.
// The form sits on a glass card; dropdowns replaced with selectable brass chips.
// Submits directly to info@kotliretreat.com via Web3Forms (no backend to run)
// and shows an in-place thank-you confirmation. Needs a free access key in
// NEXT_PUBLIC_WEB3FORMS_KEY; without it, it falls back to a prefilled mailto so
// the form is never dead.
const INK = '#0d120c';
const IVORY = '#f6f3ec';
const BRASS = '#b08d57';
const BRASS_LIGHT = '#d3b787';

// Web3Forms access key. Safe to ship in client code — it only routes submissions
// to info@kotliretreat.com; it cannot read past submissions. Env var overrides it.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'c1d2f99d-0782-40f2-a192-fd4047bf1a8f';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

// Small left-column copy not present in messages/*.json yet — kept here per locale
// (move into the i18n files with Darko later).
const LOCAL_UI: Record<
  string,
  {
    caption: string;
    stepsLabel: string;
    steps: string[];
    sending: string;
    thankTitle: string;
    thankBody: string;
    errorText: string;
  }
> = {
  de: {
    caption: 'Wir sehen uns in Kotli.',
    stepsLabel: "So funktioniert's",
    steps: ['Anfrage senden — unverbindlich', 'Antwort innerhalb von 24 Stunden', 'Individuelles Angebot & Wunschtermin'],
    sending: 'Wird gesendet…',
    thankTitle: 'Danke für Ihre Anfrage!',
    thankBody: 'Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden mit einem individuellen Angebot.',
    errorText: 'Etwas ist schiefgelaufen. Bitte schreiben Sie uns direkt an info@kotliretreat.com oder per WhatsApp.',
  },
  en: {
    caption: 'See you in Kotli.',
    stepsLabel: 'How it works',
    steps: ['Send an inquiry — no obligation', 'Reply within 24 hours', 'Personal offer & your date'],
    sending: 'Sending…',
    thankTitle: 'Thank you for your inquiry!',
    thankBody: "We've received your message and will get back to you within 24 hours with a personal offer.",
    errorText: 'Something went wrong. Please email us directly at info@kotliretreat.com or via WhatsApp.',
  },
  hr: {
    caption: 'Vidimo se u Kotlima.',
    stepsLabel: 'Kako funkcionira',
    steps: ['Pošaljite upit — bez obveze', 'Odgovor unutar 24 sata', 'Osobna ponuda i termin'],
    sending: 'Šalje se…',
    thankTitle: 'Hvala na upitu!',
    thankBody: 'Primili smo vašu poruku i javit ćemo se unutar 24 sata s osobnom ponudom.',
    errorText: 'Nešto je pošlo po zlu. Pišite nam izravno na info@kotliretreat.com ili putem WhatsAppa.',
  },
};

const inputCls =
  'w-full bg-transparent border-0 border-b border-[#f6f3ec]/20 focus:border-[#d3b787] focus:outline-none py-2.5 text-[14px] font-sans transition-colors duration-300 rounded-none placeholder:text-[#f6f3ec]/25';
const labelCls =
  'block text-[9px] uppercase tracking-[2.5px] font-semibold mb-2 transition-colors duration-300 text-[#f6f3ec]/45 group-focus-within:text-[#d3b787]';

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className="px-3.5 py-1.5 rounded-full text-[11.5px] font-sans cursor-pointer transition-all duration-300"
              style={
                selected
                  ? { backgroundColor: BRASS_LIGHT, color: '#141a12', border: '1px solid transparent', fontWeight: 600 }
                  : {
                      backgroundColor: 'transparent',
                      color: 'rgba(246,243,236,0.6)',
                      border: '1px solid rgba(246,243,236,0.2)',
                    }
              }
              onMouseEnter={(e) => {
                if (!selected) {
                  e.currentTarget.style.borderColor = 'rgba(211,183,135,0.6)';
                  e.currentTarget.style.color = 'rgba(246,243,236,0.9)';
                }
              }}
              onMouseLeave={(e) => {
                if (!selected) {
                  e.currentTarget.style.borderColor = 'rgba(246,243,236,0.2)';
                  e.currentTarget.style.color = 'rgba(246,243,236,0.6)';
                }
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ContactV2() {
  const t = useTranslations('contact');
  const tGdpr = useTranslations('gdpr');
  const locale = useLocale();
  const ui = LOCAL_UI[locale] ?? LOCAL_UI.de;

  const groupSizes = t.raw('form.groupSizeOptions') as string[];
  const dates = t.raw('form.dateOptions') as string[];
  const packages = t.raw('form.packageOptions') as string[];
  const dietary = t.raw('form.dietaryOptions') as string[];

  // Friendly defaults: smallest group, flexible date, undecided package, no dietary needs
  const [choices, setChoices] = useState(() => ({
    groupSize: groupSizes[0] ?? '',
    date: dates[dates.length - 1] ?? '',
    package: packages[packages.length - 1] ?? '',
    dietary: dietary[0] ?? '',
  }));

  const setChoice = (key: keyof typeof choices) => (v: string) =>
    setChoices((c) => ({ ...c, [key]: v }));

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Capture synchronously — the event is gone after the first await.
    const first = String(data.get('firstName') ?? '');
    const last = String(data.get('lastName') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');

    // No key configured → graceful fallback: prefilled email in the mail client.
    if (!WEB3FORMS_KEY) {
      const body = [
        `${t('form.firstName')}: ${first}`,
        `${t('form.lastName')}: ${last}`,
        `${t('form.email')}: ${email}`,
        `${t('form.groupSize')}: ${choices.groupSize}`,
        `${t('form.date')}: ${choices.date}`,
        `${t('form.package')}: ${choices.package}`,
        `${t('form.dietary')}: ${choices.dietary}`,
        '',
        message,
      ].join('\n');
      window.location.href = `mailto:info@kotliretreat.com?subject=${encodeURIComponent(
        `Kotli Retreat — ${first} ${last}`
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Kotli Retreat — Inquiry from ${first} ${last}`,
          from_name: `${first} ${last}`.trim() || 'Kotli Retreat Website',
          replyto: email,
          botcheck: String(data.get('botcheck') ?? ''),
          [t('form.firstName')]: first,
          [t('form.lastName')]: last,
          [t('form.email')]: email,
          [t('form.groupSize')]: choices.groupSize,
          [t('form.date')]: choices.date,
          [t('form.package')]: choices.package,
          [t('form.dietary')]: choices.dietary,
          [t('form.message')]: message,
        }),
      });
      clearTimeout(timer);
      const json = await res.json();
      if (json.success) setStatus('success');
      else setStatus('error');
    } catch {
      clearTimeout(timer);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative" style={{ backgroundColor: INK }}>
      <div
        className="absolute right-0 top-0 w-[55vw] h-[55vh] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(176,141,87,0.12), transparent 60%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: GRAIN, opacity: 0.06 }}
      />

      <div className="relative px-5 md:px-[6vw] pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — pitch + channels */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
              <span className="text-[10px] uppercase tracking-[4px] font-sans font-semibold" style={{ color: BRASS_LIGHT }}>
                {t('label')}
              </span>
            </div>
            <h2 className="font-display font-light text-[clamp(32px,3.8vw,54px)] leading-[1.03]" style={{ color: IVORY }}>
              {t('title')}
            </h2>
            <p className="font-serif italic text-[16px] leading-relaxed mt-4 max-w-[420px]" style={{ color: 'rgba(246,243,236,0.6)' }}>
              {t('subtitle')}
            </p>

            {/* The invitation — set table in Kotli */}
            <div className="mt-10 max-w-[380px]">
              <div
                className="relative h-[235px] rounded-[3px] overflow-hidden shadow-[0_26px_60px_rgba(0,0,0,0.5)]"
                style={{ border: '5px solid rgba(246,243,236,0.94)', transform: 'rotate(-1.5deg)' }}
              >
                <Image src="/images/kotli/stone-tables.jpg" alt="Kotli" fill className="object-cover" sizes="380px" />
              </div>
              <p className="font-serif italic text-[15.5px] mt-4 ml-1" style={{ color: 'rgba(211,183,135,0.9)' }}>
                {ui.caption}
              </p>
            </div>

            {/* What happens next */}
            <div className="mt-8 max-w-[380px]">
              <div className="text-[9px] uppercase tracking-[3px] font-semibold mb-1.5" style={{ color: 'rgba(246,243,236,0.4)' }}>
                {ui.stepsLabel}
              </div>
              {ui.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-4 py-2.5"
                  style={i > 0 ? { borderTop: '1px solid rgba(246,243,236,0.07)' } : undefined}
                >
                  <span className="font-serif italic text-[13px] w-6 shrink-0" style={{ color: BRASS }}>
                    0{i + 1}
                  </span>
                  <span className="text-[13.5px] leading-snug" style={{ color: 'rgba(246,243,236,0.72)' }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 max-w-[380px]">
              <a
                href="https://wa.me/385992563862"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 rounded-[4px] no-underline transition-colors duration-300 group"
                style={{ border: '1px solid rgba(176,141,87,0.4)' }}
              >
                <span>
                  <span className="block text-[9px] uppercase tracking-[2.5px] font-semibold" style={{ color: BRASS_LIGHT }}>
                    {t('whatsapp')}
                  </span>
                  <span className="block text-[14px] mt-1" style={{ color: 'rgba(246,243,236,0.9)' }}>
                    +385 99 256 3862
                  </span>
                </span>
                <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1" style={{ color: BRASS_LIGHT }}>
                  →
                </span>
              </a>
              <div className="flex flex-col gap-2.5 px-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-[9px] uppercase tracking-[2.5px] font-semibold w-16 shrink-0" style={{ color: 'rgba(246,243,236,0.4)' }}>
                    {t('emailLabel')}
                  </span>
                  <a href="mailto:info@kotliretreat.com" className="text-[14px] no-underline" style={{ color: 'rgba(246,243,236,0.85)' }}>
                    info@kotliretreat.com
                  </a>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-[9px] uppercase tracking-[2.5px] font-semibold w-16 shrink-0" style={{ color: 'rgba(246,243,236,0.4)' }}>
                    {t('phoneLabel')}
                  </span>
                  <span className="text-[14px]" style={{ color: 'rgba(246,243,236,0.85)' }}>
                    +385 99 256 3862
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {(t.raw('trustItems') as string[]).map((item, i) => (
                  <span
                    key={i}
                    className="text-[9px] uppercase tracking-[1.5px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ border: '1px solid rgba(246,243,236,0.15)', color: 'rgba(246,243,236,0.45)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — the inquiry card */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative rounded-[6px] p-7 md:p-9"
              style={{
                backgroundColor: 'rgba(246,243,236,0.035)',
                border: '1px solid rgba(246,243,236,0.1)',
                boxShadow: '0 30px 70px rgba(0,0,0,0.35)',
              }}
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="thanks"
                    className="py-10 md:py-16 flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{ backgroundColor: 'rgba(211,183,135,0.15)', border: '1px solid rgba(211,183,135,0.45)' }}
                    >
                      <Check className="w-8 h-8" style={{ color: BRASS_LIGHT }} strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-[26px] md:text-[30px] leading-tight" style={{ color: IVORY }}>
                      {ui.thankTitle}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed mt-4 max-w-[420px]" style={{ color: 'rgba(246,243,236,0.65)' }}>
                      {ui.thankBody}
                    </p>
                    <a
                      href="https://wa.me/385992563862"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 px-6 py-3 text-[10px] font-semibold uppercase tracking-[2.5px] font-sans no-underline rounded-[3px] transition-colors duration-300"
                      style={{ border: '1px solid rgba(176,141,87,0.45)', color: BRASS_LIGHT }}
                    >
                      WhatsApp →
                    </a>
                  </motion.div>
                ) : (
                  <motion.div key="form" exit={{ opacity: 0 }}>
                    {/* Card seam */}
                    <div className="flex items-center justify-between mb-7">
                      <span className="text-[9px] uppercase tracking-[3px] font-semibold" style={{ color: BRASS_LIGHT }}>
                        {t('form.submit')}
                      </span>
                      <span className="text-[12px]" style={{ color: 'rgba(176,141,87,0.7)' }}>
                        ✦
                      </span>
                    </div>

                    <form onSubmit={onSubmit} className="flex flex-col gap-7">
                {/* Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                  <div className="group">
                    <label className={labelCls}>{t('form.firstName')}</label>
                    <input
                      name="firstName"
                      required
                      placeholder={t('form.firstNamePlaceholder')}
                      className={inputCls}
                      style={{ color: IVORY }}
                    />
                  </div>
                  <div className="group">
                    <label className={labelCls}>{t('form.lastName')}</label>
                    <input
                      name="lastName"
                      required
                      placeholder={t('form.lastNamePlaceholder')}
                      className={inputCls}
                      style={{ color: IVORY }}
                    />
                  </div>
                  <div className="group sm:col-span-2">
                    <label className={labelCls}>{t('form.email')}</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={t('form.emailPlaceholder')}
                      className={inputCls}
                      style={{ color: IVORY }}
                    />
                  </div>
                </div>

                {/* Choice chips — all options visible */}
                <ChipGroup
                  label={t('form.groupSize')}
                  options={groupSizes}
                  value={choices.groupSize}
                  onChange={setChoice('groupSize')}
                />
                <ChipGroup label={t('form.date')} options={dates} value={choices.date} onChange={setChoice('date')} />
                <ChipGroup
                  label={t('form.package')}
                  options={packages}
                  value={choices.package}
                  onChange={setChoice('package')}
                />
                <ChipGroup
                  label={t('form.dietary')}
                  options={dietary}
                  value={choices.dietary}
                  onChange={setChoice('dietary')}
                />

                {/* Message */}
                <div className="group">
                  <label className={labelCls}>{t('form.message')}</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder={t('form.messagePlaceholder')}
                    className={`${inputCls} resize-none`}
                    style={{ color: IVORY }}
                  />
                </div>

                {/* GDPR */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    className="mt-[3px] w-[15px] h-[15px] shrink-0 cursor-pointer accent-[#b08d57]"
                  />
                  <span className="text-[12px] leading-relaxed" style={{ color: 'rgba(246,243,236,0.55)' }}>
                    {tGdpr('consent')}{' '}
                    <a href={`/${locale}/privacy`} className="underline underline-offset-2" style={{ color: 'rgba(246,243,236,0.75)' }}>
                      {tGdpr('policyLink')}
                    </a>
                  </span>
                </label>

                {/* Honeypot — bots tick every box; real users never see this */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-4 text-[11px] font-semibold uppercase tracking-[2.5px] font-sans cursor-pointer border-none rounded-[3px] transition-colors duration-300 disabled:cursor-wait"
                    style={{ backgroundColor: IVORY, color: '#141a12', opacity: status === 'sending' ? 0.7 : 1 }}
                    onMouseEnter={(e) => {
                      if (status !== 'sending') e.currentTarget.style.backgroundColor = BRASS_LIGHT;
                    }}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = IVORY)}
                  >
                    {status === 'sending' ? ui.sending : `${t('form.submit')} →`}
                  </button>
                  {status === 'error' ? (
                    <p className="text-[12.5px] leading-relaxed mt-3.5" style={{ color: '#e0a58f' }}>
                      {ui.errorText}
                    </p>
                  ) : (
                    <div className="flex items-center gap-2.5 mt-3.5">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: BRASS }} />
                      <p className="font-serif italic text-[12.5px]" style={{ color: 'rgba(246,243,236,0.5)' }}>
                        {t('form.disclaimer')}
                      </p>
                    </div>
                  )}
                </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
