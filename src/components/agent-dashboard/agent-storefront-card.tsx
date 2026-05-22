import { Copy, Store } from "lucide-react";

type AgentStorefrontCardProps = {
  name: string;
  status: string;
  assignedBrands: string;
  totalVisitors: string;
  conversionRate: string;
  referralLink: string;
};

export default function AgentStorefrontCard({
  name,
  status,
  assignedBrands,
  totalVisitors,
  conversionRate,
  referralLink,
}: AgentStorefrontCardProps) {
  return (
    <section className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6 shadow-sm">
      <h2 className="text-base font-bold text-[var(--text-primary)]">Your Storefront</h2>

      <div className="mt-6 flex items-center gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] text-[var(--text-muted)]">
          <Store className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <p className="font-bold text-[var(--text-primary)]">{name}</p>
          <p className="mt-2 inline-flex items-center gap-2 text-xs text-[var(--state-success)]">
            <span className="h-2 w-2 rounded-full bg-[var(--state-success)]" />
            {status}
          </p>
        </div>
      </div>

      <dl className="mt-6 space-y-5 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[var(--text-muted)]">Assigned Brands</dt>
          <dd className="font-medium text-[var(--text-primary)]">{assignedBrands}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[var(--text-muted)]">Total Visitors</dt>
          <dd className="font-medium text-[var(--text-primary)]">{totalVisitors}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[var(--text-muted)]">Conversion Rate</dt>
          <dd className="font-medium text-[var(--text-primary)]">{conversionRate}</dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-[var(--border-default)] pt-4">
        <label className="text-xs text-[var(--text-muted)]" htmlFor="agent-referral-link">
          Referral Link
        </label>
        <div className="mt-2 flex overflow-hidden rounded-md border border-[var(--border-default)] bg-[var(--bg-base)]">
          <input
            id="agent-referral-link"
            readOnly
            value={referralLink}
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-[var(--text-primary)] outline-none"
          />
          <button
            type="button"
            className="inline-flex w-10 items-center justify-center border-l border-[var(--border-default)] text-[var(--text-muted)]"
            aria-label="Copy referral link"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
