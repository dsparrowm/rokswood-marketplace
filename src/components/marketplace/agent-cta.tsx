import Link from "next/link";

export default function AgentCta() {
  return (
    <section className="bg-[var(--bg-surface)] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1000px]">
        <div className="grid overflow-hidden rounded-2xl bg-[var(--bg-dark)] px-8 py-12 text-[var(--text-on-dark)] shadow-[0_30px_50px_color-mix(in_srgb,var(--text-primary)_28%,transparent)] sm:px-14 lg:grid-cols-[1fr_260px] lg:items-center lg:px-16 lg:py-16">
          <div>
            <h2 className="max-w-xl text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
              Become a Rokswood Agent
            </h2>
            <p className="mt-8 max-w-lg text-base leading-7 text-[var(--text-on-dark-muted)]">
              Partner with us to distribute industrial, energy, and
              infrastructure solutions across regions. Scale your business with
              enterprise backing.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/agents"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--bg-surface)] px-7 text-sm font-bold text-[var(--text-primary)]"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--text-on-dark)_24%,transparent)] px-7 text-sm font-bold text-[var(--text-on-dark)]"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          <div className="mt-12 flex justify-center lg:mt-0 lg:justify-end">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-[5px] border-[color-mix(in_srgb,var(--text-light)_24%,transparent)] text-[var(--text-light)]">
              <svg aria-hidden="true" viewBox="0 0 64 64" className="h-20 w-20 fill-none stroke-current">
                <path d="M14 30h8l8-8a7 7 0 0 1 10 0l2 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                <path d="m26 34 8-8 12 12a5 5 0 0 1-7 7L27 33" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                <path d="M42 25h8v18h-8M14 27H8v18h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                <path d="M22 42h5M29 47h5" strokeLinecap="round" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
