import Link from "next/link";
import { BadgeCheck, BarChart3, CircleDollarSign, ShieldCheck, Store, WalletCards } from "lucide-react";

import AgentLoginForm from "@/components/agent-login/agent-login-form";

const trustItems = [
  { label: "Verified access", Icon: ShieldCheck },
  { label: "Secure dashboard", Icon: BadgeCheck },
  { label: "Wallet ready", Icon: WalletCards },
];

const operations = [
  {
    label: "Storefront Health",
    value: "94%",
    detail: "Active assigned brands",
    Icon: Store,
  },
  {
    label: "Commission Status",
    value: "$12.8k",
    detail: "Available and pending",
    Icon: CircleDollarSign,
  },
  {
    label: "Sales Trend",
    value: "+18%",
    detail: "Last 30 days",
    Icon: BarChart3,
  },
];

export default function AgentLoginPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-dark)] text-[var(--text-on-dark)] shadow-sm">
              <span className="text-sm font-bold">R</span>
            </span>
            <span className="min-w-0 text-sm leading-tight">
              <span className="block font-semibold text-[var(--text-primary)]">Rokswood Marketplace</span>
              <span className="block text-[var(--text-muted)]">Agent Portal</span>
            </span>
          </Link>
          <Link
            href="/agents"
            className="hidden h-10 items-center rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-tag)] sm:inline-flex"
          >
            Become an Agent
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,440px)] lg:gap-10 lg:py-12">
          <div className="hidden overflow-hidden rounded-lg bg-[var(--bg-dark)] p-8 text-[var(--text-on-dark)] shadow-[0_30px_70px_color-mix(in_srgb,var(--bg-dark)_22%,transparent)] lg:block">
            <div className="max-w-md">
              <span className="inline-flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--text-on-dark)_10%,transparent)] px-3 py-1 text-xs font-semibold text-[var(--text-on-dark)]">
                <span className="h-2 w-2 rounded-full bg-[var(--state-success)]" />
                Agent Access
              </span>
              <h2 className="mt-8 text-5xl font-bold leading-[0.98] tracking-[-0.03em]">
                Rokswood Agent.
              </h2>
              <p className="mt-6 text-sm leading-6 text-[var(--text-on-dark-muted)]">
                Sign in to view sales, wallet, and commissions.
              </p>
            </div>

            <div className="mt-12 grid gap-4">
              {operations.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-[color-mix(in_srgb,var(--text-on-dark)_12%,transparent)] bg-[color-mix(in_srgb,var(--text-on-dark)_6%,transparent)] p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--accent-payment)_24%,transparent)] text-[var(--text-on-dark)]">
                      <item.Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="mt-1 text-xs text-[var(--text-on-dark-muted)]">{item.detail}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <AgentLoginForm />
        </section>

        <footer className="grid gap-3 border-t border-[var(--border-default)] py-5 text-xs text-[var(--text-muted)] sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex flex-wrap gap-3">
            {trustItems.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5">
                <item.Icon className="h-4 w-4 text-[var(--accent-payment)]" aria-hidden="true" />
                {item.label}
              </span>
            ))}
          </div>
          <p>© 2026 Rokswood Marketplace</p>
        </footer>
      </div>
    </main>
  );
}
