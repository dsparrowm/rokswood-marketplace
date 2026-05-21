type StoreTechnicalCtaProps = {
  title: string;
  description: string;
};

export default function StoreTechnicalCta({
  title,
  description,
}: StoreTechnicalCtaProps) {
  return (
    <section className="bg-[var(--bg-base)] px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-xl font-bold tracking-[-0.01em] text-[var(--text-primary)] sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[var(--text-muted)] sm:mt-8">
          {description}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
          <a
            href="mailto:enterprise@rokswood.com"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[var(--accent-primary)] px-6 text-sm font-semibold text-white sm:w-auto"
          >
            Contact Sales
          </a>
          <a
            href="mailto:enterprise@rokswood.com?subject=Request%20Quotation"
            className="inline-flex h-11 w-full items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-6 text-sm font-semibold text-[var(--text-primary)] sm:w-auto"
          >
            Request Quotation
          </a>
        </div>
      </div>
    </section>
  );
}
