import { Link } from '@/i18n/navigation';

// Shared shell for the legal pages (Impressum, Privacy) — the v2 editorial
// look on paper: ivory ground, Fraunces headings, brass hairlines.
const IVORY = '#f6f3ec';
const INK = '#1c1a15';
const BRASS = '#b08d57';
const BRASS_DARK = '#8a6b3f';

export function LegalPage({
  label,
  title,
  meta,
  intro,
  children,
}: {
  label: string;
  title: string;
  meta?: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen" style={{ backgroundColor: IVORY }}>
      <div className="max-w-[780px] mx-auto px-5 md:px-8 py-12 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[3px] font-semibold no-underline mb-12"
          style={{ color: BRASS_DARK }}
        >
          <span aria-hidden>←</span> Kotli Retreat
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <span className="w-10 h-px" style={{ backgroundColor: BRASS }} />
          <span className="text-[10px] uppercase tracking-[4px] font-semibold" style={{ color: BRASS_DARK }}>
            {label}
          </span>
        </div>
        <h1 className="font-display font-light text-[clamp(34px,5vw,54px)] leading-[1.05]" style={{ color: INK }}>
          {title}
        </h1>
        {meta && (
          <p className="text-[11px] uppercase tracking-[2px] mt-4" style={{ color: 'rgba(28,26,21,0.45)' }}>
            {meta}
          </p>
        )}
        {intro && (
          <p className="font-serif italic text-[17px] leading-relaxed mt-6" style={{ color: 'rgba(28,26,21,0.68)' }}>
            {intro}
          </p>
        )}

        <div className="flex flex-col gap-12 mt-12">{children}</div>
      </div>
    </main>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 pt-8" style={{ borderTop: '1px solid rgba(28,26,21,0.12)' }}>
      <h2 className="font-display text-[22px] md:text-[26px] leading-tight mb-5" style={{ color: INK }}>
        {title}
      </h2>
      <div className="text-[15px] leading-relaxed flex flex-col gap-3" style={{ color: 'rgba(28,26,21,0.72)' }}>
        {children}
      </div>
    </section>
  );
}

// Label / value rows for company facts.
export function LegalFacts({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <dl className="grid grid-cols-[minmax(110px,auto)_1fr] gap-x-6 gap-y-2.5 text-[14.5px]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-[10px] uppercase tracking-[2px] font-semibold pt-[5px]" style={{ color: BRASS_DARK }}>
            {k}
          </dt>
          <dd style={{ color: INK }}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
