import Link from "next/link";
import { BadgeCheck } from "lucide-react";

export default function AgentHero() {
  return (
    <section className="flex items-center bg-[color-mix(in_srgb,var(--accent-payment)_9%,var(--bg-base))] px-4 py-16 text-center sm:px-6 lg:min-h-[calc(100vh-72px)] lg:px-10 lg:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-surface)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[var(--state-success)]" />
          Partner Program Open
        </span>
        <h1 className="mt-8 max-w-2xl text-4xl font-bold leading-[0.98] tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
          Become a Rokswood Marketplace Agent
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">
          Join our verified agent network to distribute industrial, energy, agricultural, and
          infrastructure solutions across your region.
        </p>
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="#agent-registration"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent-payment)] px-7 text-sm font-semibold text-[var(--text-on-dark)] shadow-lg shadow-[color-mix(in_srgb,var(--accent-payment)_24%,transparent)] transition-colors hover:bg-[color-mix(in_srgb,var(--accent-payment)_88%,var(--bg-dark))] sm:w-auto"
          >
            Start Application
          </Link>
          <Link
            href="#commission-tiers"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--bg-surface)] px-7 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-colors hover:bg-[var(--bg-tag)] sm:w-auto"
          >
            View Commission Tiers
          </Link>
        </div>
        <div className="mt-8 flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] sm:hidden">
          <BadgeCheck className="h-4 w-4 text-[var(--accent-payment)]" aria-hidden="true" />
          Verified onboarding with dashboard access
        </div>
      </div>
    </section>
  );
}
