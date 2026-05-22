import { Download } from "lucide-react";
import Link from "next/link";

import AgentActivityCard from "@/components/agent-dashboard/agent-activity-card";
import AgentCommissionsTable from "@/components/agent-dashboard/agent-commissions-table";
import AgentDashboardFooter from "@/components/agent-dashboard/agent-dashboard-footer";
import AgentDashboardHeader from "@/components/agent-dashboard/agent-dashboard-header";
import AgentMetricCard from "@/components/agent-dashboard/agent-metric-card";
import AgentSalesPerformance from "@/components/agent-dashboard/agent-sales-performance";
import AgentStatusBanner from "@/components/agent-dashboard/agent-status-banner";
import AgentStorefrontCard from "@/components/agent-dashboard/agent-storefront-card";
import AgentWalletCard from "@/components/agent-dashboard/agent-wallet-card";
import { agentDashboardData } from "@/lib/data/agent-dashboard";

export default function AgentDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <AgentDashboardHeader agentName={agentDashboardData.agentName} />
      <AgentStatusBanner alert={agentDashboardData.alert} badges={agentDashboardData.statusBadges} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Agent Dashboard</h1>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              Welcome back, manage your storefront and earnings.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 text-sm font-medium text-[var(--text-primary)] shadow-sm"
            >
              <Download className="h-4 w-4 text-[var(--text-muted)]" aria-hidden="true" />
              Report
            </button>
            <Link
              href="/stores/rokswood-energy"
              className="inline-flex h-9 items-center rounded-md bg-[var(--bg-dark)] px-4 text-sm font-medium text-[var(--text-on-dark)]"
            >
              View Storefront
            </Link>
          </div>
        </div>

        <section aria-label="Agent metrics" className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agentDashboardData.metrics.map((metric) => (
            <AgentMetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(320px,1fr)]">
          <div className="space-y-8">
            <AgentSalesPerformance summary={agentDashboardData.salesSummary} />
            <AgentCommissionsTable commissions={agentDashboardData.commissions} />
          </div>

          <aside className="space-y-8">
            <AgentWalletCard
              availableBalance={agentDashboardData.wallet.availableBalance}
              pendingFunds={agentDashboardData.wallet.pendingFunds}
              linkedBank={agentDashboardData.wallet.linkedBank}
            />
            <AgentStorefrontCard
              name={agentDashboardData.storefront.name}
              status={agentDashboardData.storefront.status}
              assignedBrands={agentDashboardData.storefront.assignedBrands}
              totalVisitors={agentDashboardData.storefront.totalVisitors}
              conversionRate={agentDashboardData.storefront.conversionRate}
              referralLink={agentDashboardData.storefront.referralLink}
            />
            <AgentActivityCard activities={agentDashboardData.activities} />
          </aside>
        </div>
      </main>

      <AgentDashboardFooter />
    </div>
  );
}
