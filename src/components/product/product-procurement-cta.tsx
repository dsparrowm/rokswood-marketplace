export default function ProductProcurementCta() {
  return (
    <section className="mx-auto max-w-[1360px] border-t border-[var(--border-default)] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-5 py-12 text-center sm:px-8 lg:py-16">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          Need Technical Procurement Assistance?
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-[var(--text-muted)]">
          Speak with our technical sales specialists for guidance, bulk quotations, and facility deployment recommendations.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--bg-dark)] px-8 text-sm font-bold text-[var(--text-on-dark)]"
          >
            Request Enterprise Quote
          </button>
          <a
            href="mailto:enterprise@rokswood.com"
            className="inline-flex h-12 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-8 text-sm font-bold text-[var(--text-primary)]"
          >
            Contact Sales Team
          </a>
        </div>
      </div>
    </section>
  );
}
