import Link from "next/link";

import type { AgentCommission } from "@/types/agent-dashboard";

type AgentCommissionsTableProps = {
  commissions: AgentCommission[];
};

export default function AgentCommissionsTable({ commissions }: AgentCommissionsTableProps) {
  return (
    <section className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <h2 className="text-base font-bold text-[var(--text-primary)]">Recent Commissions</h2>
        <Link href="/agents/dashboard" className="text-sm font-medium text-[var(--accent-payment)]">
          View All
        </Link>
      </div>

      <div className="border-t border-[var(--border-default)] md:hidden">
        <div className="divide-y divide-[var(--border-default)]">
          {commissions.map((commission) => (
            <article key={commission.orderId} className="space-y-4 px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Order ID</p>
                  <p className="mt-1 font-medium text-[var(--text-primary)]">{commission.orderId}</p>
                </div>
                <span
                  className={`shrink-0 rounded-md px-2 py-1 text-xs ${
                    commission.status === "Paid"
                      ? "bg-[var(--state-success-soft)] text-[var(--state-success)]"
                      : "bg-[var(--state-warning-soft)] text-[var(--state-warning-text)]"
                  }`}
                >
                  {commission.status}
                </span>
              </div>

              <div>
                <p className="text-xs text-[var(--text-muted)]">Product / Store</p>
                <p className="mt-1 text-sm text-[var(--text-primary)]">{commission.productStore}</p>
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Date</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{commission.date}</p>
                </div>
                <p className="text-base font-bold text-[var(--text-primary)]">{commission.amount}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hidden overflow-x-auto border-t border-[var(--border-default)] md:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs font-medium text-[var(--text-muted)]">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Product / Store
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((commission) => (
              <tr key={commission.orderId} className="border-t border-[var(--border-default)]">
                <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{commission.orderId}</td>
                <td className="px-6 py-4 text-[var(--text-primary)]">{commission.productStore}</td>
                <td className="px-6 py-4 text-[var(--text-muted)]">{commission.date}</td>
                <td className="px-6 py-4 text-right font-medium text-[var(--text-primary)]">{commission.amount}</td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={`rounded-md px-2 py-1 text-xs ${
                      commission.status === "Paid"
                        ? "bg-[var(--state-success-soft)] text-[var(--state-success)]"
                        : "bg-[var(--state-warning-soft)] text-[var(--state-warning-text)]"
                    }`}
                  >
                    {commission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
