import Link from "next/link";

const heroBadge = "Rokswood Marketplace";

export default function Hero() {
  return (
    <section className="flex min-h-[520px] items-center bg-[var(--bg-base)] px-4 py-16 sm:min-h-[600px] sm:px-6 sm:py-20 lg:min-h-[720px] lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-1.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-payment)]" aria-hidden="true" />
          <span>{heroBadge}</span>
        </div>

        <h1 className="mt-8 max-w-5xl text-[clamp(2.4rem,4.8vw,4.75rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-[var(--text-primary)]">
          <span className="block">Enterprise Marketplace</span>
          <span className="mt-2 block text-[var(--text-primary)]/80">for Industrial &amp; Tech Solutions</span>
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--text-muted)] sm:text-lg">
          A centralized marketplace for Rokswood Group technologies, products,
          industrial equipment, and infrastructure solutions. Built for scale,
          designed for precision.
        </p>

        <Link
          href="/stores"
          className="mt-8 inline-flex h-14 items-center rounded-full bg-[var(--bg-dark)] px-8 text-base font-semibold text-[var(--text-on-dark)] shadow-[0_10px_24px_color-mix(in_srgb,var(--text-primary)_22%,transparent)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--text-primary)]"
        >
          Explore Stores
          <svg aria-hidden="true" viewBox="0 0 20 20" className="ml-3 h-5 w-5 fill-none stroke-current">
            <path d="M4 10h10m-4-4 4 4-4 4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
