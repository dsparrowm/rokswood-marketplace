"use client";

import { Download } from "lucide-react";
import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";

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
import { useAgentDashboardQuery } from "@/lib/hooks/use-agent-dashboard";
import type { AgentAuthSession } from "@/types/agent-auth";
import type { AgentDashboardData, AgentActivity, AgentCommission } from "@/types/agent-dashboard";
import type {
  AgentAssignmentRecord,
  AgentBalanceRecord,
  AgentCommissionRecord,
  AgentDashboardApiData,
  AgentDashboardCurrency,
  AgentLedgerRecord,
  AgentWithdrawalRecord,
} from "@/types/agent-dashboard-api";

const sessionStorageKey = "rokswood_agent_session";

function getStoredAgentToken() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawSession = window.sessionStorage.getItem(sessionStorageKey);

    if (!rawSession) {
      return null;
    }

    const session = JSON.parse(rawSession) as AgentAuthSession;

    return session.accessToken ?? session.access?.token ?? null;
  } catch {
    return null;
  }
}

function subscribeToAgentSession(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => window.removeEventListener("storage", onStoreChange);
}

function formatCurrency(amount: number, currency: AgentDashboardCurrency = "NGN") {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function maskAccountNumber(accountNumber?: string) {
  if (!accountNumber) {
    return "Not saved";
  }

  return `**** ${accountNumber.slice(-4)}`;
}

function getPrimaryBalance(balances: AgentBalanceRecord[]) {
  return balances[0] ?? null;
}

function sumCommissionAmounts(commissions: AgentCommissionRecord[], statuses: AgentCommissionRecord["status"][]) {
  return commissions
    .filter((commission) => statuses.includes(commission.status))
    .reduce((total, commission) => total + commission.commissionAmount, 0);
}

function sumOrderSubtotals(commissions: AgentCommissionRecord[]) {
  return commissions.reduce((total, commission) => total + commission.orderSubtotal, 0);
}

function mapCommissionStatus(status: AgentCommissionRecord["status"]): AgentCommission["status"] {
  return status === "earned" || status === "posted" ? "Paid" : "Pending";
}

function mapCommissions(
  commissions: AgentCommissionRecord[],
  assignments: AgentAssignmentRecord[],
): AgentCommission[] {
  const storeNameById = new Map(
    assignments
      .filter((assignment) => assignment.store)
      .map((assignment) => [assignment.store?.id, assignment.store?.name]),
  );

  return commissions.map((commission) => ({
    orderId: commission.order?.orderNumber ?? commission.orderId,
    productStore: storeNameById.get(commission.storeId) ?? "Assigned marketplace store",
    date: formatDate(commission.createdAt),
    amount: formatCurrency(commission.commissionAmount, commission.currency),
    status: mapCommissionStatus(commission.status),
  }));
}

function getActivityTime(value: string) {
  return formatDate(value);
}

function buildActivities(
  commissions: AgentCommissionRecord[],
  ledger: AgentLedgerRecord[],
  withdrawals: AgentWithdrawalRecord[],
): AgentActivity[] {
  const commissionActivities = commissions.slice(0, 2).map<AgentActivity>((commission) => ({
    title: "Commission Recorded",
    detail: `${formatCurrency(commission.commissionAmount, commission.currency)} from ${
      commission.order?.orderNumber ?? commission.orderId
    }`,
    time: getActivityTime(commission.createdAt),
    tone: commission.status === "reversed" || commission.status === "cancelled" ? "muted" : "success",
  }));

  const ledgerActivities = ledger.slice(0, 2).map<AgentActivity>((entry) => ({
    title: entry.type === "credit" ? "Ledger Credit" : "Ledger Debit",
    detail: `${formatCurrency(entry.amount, entry.currency)} via ${entry.channel.replaceAll("_", " ")}`,
    time: getActivityTime(entry.createdAt),
    tone: entry.type === "credit" ? "info" : "muted",
  }));

  const withdrawalActivities = withdrawals.slice(0, 1).map<AgentActivity>((withdrawal) => ({
    title: "Withdrawal Request",
    detail: `${formatCurrency(withdrawal.amount, withdrawal.currency)} to ${withdrawal.bankName}`,
    time: getActivityTime(withdrawal.createdAt),
    tone: withdrawal.status === "failed" ? "muted" : "info",
  }));

  const activities = [...commissionActivities, ...withdrawalActivities, ...ledgerActivities];

  return activities.length > 0 ? activities.slice(0, 3) : agentDashboardData.activities;
}

function mapDashboardData(apiData: AgentDashboardApiData): AgentDashboardData {
  const primaryBalance = getPrimaryBalance(apiData.balances);
  const recentCommissions = apiData.commissions.items;
  const metricCurrency = primaryBalance?.currency ?? recentCommissions[0]?.currency ?? "NGN";
  const activeAssignments = apiData.assignments.filter((assignment) => assignment.status === "active");
  const assignedStoreNames = activeAssignments
    .map((assignment) => assignment.store?.name)
    .filter((name): name is string => Boolean(name));
  const firstStore = activeAssignments.find((assignment) => assignment.store)?.store;
  const firstReferralCode = apiData.referralLinks.find((link) => link.status === "active")?.code;
  const referralLink =
    firstStore && firstReferralCode
      ? `rokswood.com/stores/${firstStore.slug}?ref=${firstReferralCode}`
      : firstReferralCode
        ? `rokswood.com?ref=${firstReferralCode}`
        : "No active referral link";

  return {
    agentName: apiData.profile.fullName,
    alert:
      apiData.profile.kycStatus === "verified"
        ? "Your agent profile is active."
        : "Complete your KYC verification to unlock full wallet withdrawals.",
    statusBadges: [
      `KYC: ${apiData.profile.kycStatus === "verified" ? "Verified" : apiData.profile.kycStatus}`,
      `Agreement: ${apiData.profile.agreementVerified ? "Verified" : "Pending"}`,
    ],
    metrics: [
      {
        label: "Recent Sales",
        value: formatCurrency(sumOrderSubtotals(recentCommissions), metricCurrency),
        helper: "From loaded commission records",
        tone: "sales",
      },
      {
        label: "Commission Earned",
        value: formatCurrency(sumCommissionAmounts(recentCommissions, ["earned", "posted"]), metricCurrency),
        helper: "From earned and posted commissions",
        tone: "commission",
      },
      {
        label: "Wallet Balance",
        value: primaryBalance
          ? formatCurrency(primaryBalance.availableBalance, primaryBalance.currency)
          : formatCurrency(0, metricCurrency),
        helper: primaryBalance?.status === "frozen" ? "Ledger account frozen" : "Available to withdraw",
        tone: "wallet",
      },
      {
        label: "Pending Commission",
        value: formatCurrency(sumCommissionAmounts(recentCommissions, ["pending"]), metricCurrency),
        helper: "Awaiting posting",
        tone: "pending",
      },
    ],
    salesSummary: [
      {
        label: "Recent Sales",
        value: formatCurrency(sumOrderSubtotals(recentCommissions), metricCurrency),
      },
      {
        label: "Commission Rows",
        value: String(apiData.commissions.total),
      },
      {
        label: "Avg. Recent Order",
        value:
          recentCommissions.length > 0
            ? formatCurrency(sumOrderSubtotals(recentCommissions) / recentCommissions.length, metricCurrency)
            : formatCurrency(0, metricCurrency),
      },
    ],
    wallet: {
      availableBalance: primaryBalance
        ? formatCurrency(primaryBalance.availableBalance, primaryBalance.currency)
        : formatCurrency(0, metricCurrency),
      pendingFunds: primaryBalance
        ? formatCurrency(primaryBalance.pendingBalance, primaryBalance.currency)
        : formatCurrency(0, metricCurrency),
      linkedBank: maskAccountNumber(apiData.savedBankDetails?.accountNumber),
    },
    storefront: {
      name: firstStore?.name ?? "Assigned Stores",
      status: activeAssignments.length > 0 ? "Active Store" : "No Active Store",
      assignedBrands: assignedStoreNames.length > 0 ? assignedStoreNames.join(", ") : "No assignments",
      totalVisitors: "Not tracked",
      conversionRate: "Not tracked",
      referralLink,
    },
    commissions: mapCommissions(recentCommissions, apiData.assignments),
    activities: buildActivities(apiData.commissions.items, apiData.ledger.items, apiData.withdrawals.items),
  };
}

export default function AgentDashboardPage() {
  const agentToken = useSyncExternalStore(subscribeToAgentSession, getStoredAgentToken, () => null);
  const dashboardQuery = useAgentDashboardQuery(agentToken);
  const dashboardData = useMemo(
    () => (dashboardQuery.data ? mapDashboardData(dashboardQuery.data) : agentDashboardData),
    [dashboardQuery.data],
  );

  if (!agentToken) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
        <AgentDashboardHeader agentName="Agent Portal" />
        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
          <section className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Agent sign in required</h1>
            <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
              Use your approved agent account to view your dashboard.
            </p>
            <Link
              href="/agents/login"
              className="mt-6 inline-flex h-10 items-center rounded-md bg-[var(--bg-dark)] px-5 text-sm font-medium text-[var(--text-on-dark)]"
            >
              Go to Login
            </Link>
          </section>
        </main>
        <AgentDashboardFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <AgentDashboardHeader agentName={dashboardData.agentName} />
      <AgentStatusBanner alert={dashboardData.alert} badges={dashboardData.statusBadges} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Agent Dashboard</h1>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              {dashboardQuery.isLoading
                ? "Loading your storefront and earnings."
                : "Welcome back, manage your storefront and earnings."}
            </p>
            {dashboardQuery.isError ? (
              <p className="mt-2 text-sm font-medium text-[var(--state-error)]">
                {dashboardQuery.error instanceof Error
                  ? dashboardQuery.error.message
                  : "Agent dashboard data could not be loaded."}
              </p>
            ) : null}
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
          {dashboardData.metrics.map((metric) => (
            <AgentMetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(320px,1fr)]">
          <div className="space-y-8">
            <AgentSalesPerformance summary={dashboardData.salesSummary} />
            <AgentCommissionsTable commissions={dashboardData.commissions} />
          </div>

          <aside className="space-y-8">
            <AgentWalletCard
              availableBalance={dashboardData.wallet.availableBalance}
              pendingFunds={dashboardData.wallet.pendingFunds}
              linkedBank={dashboardData.wallet.linkedBank}
            />
            <AgentStorefrontCard
              name={dashboardData.storefront.name}
              status={dashboardData.storefront.status}
              assignedBrands={dashboardData.storefront.assignedBrands}
              totalVisitors={dashboardData.storefront.totalVisitors}
              conversionRate={dashboardData.storefront.conversionRate}
              referralLink={dashboardData.storefront.referralLink}
            />
            <AgentActivityCard activities={dashboardData.activities} />
          </aside>
        </div>
      </main>

      <AgentDashboardFooter />
    </div>
  );
}
