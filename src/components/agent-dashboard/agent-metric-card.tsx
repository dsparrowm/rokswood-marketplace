import {
  Banknote,
  ChartNoAxesCombined,
  Clock3,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { AgentMetric, AgentMetricTone } from "@/types/agent-dashboard";

const metricIcons: Record<AgentMetricTone, LucideIcon> = {
  sales: ChartNoAxesCombined,
  commission: Banknote,
  wallet: WalletCards,
  pending: Clock3,
};

const metricToneClasses: Record<AgentMetricTone, string> = {
  sales: "bg-[var(--state-info-soft)] text-[var(--accent-payment)]",
  commission: "bg-[var(--state-success-soft)] text-[var(--state-success)]",
  wallet: "bg-[var(--accent-purple-soft)] text-[var(--accent-purple)]",
  pending: "bg-[var(--state-warning-soft)] text-[var(--state-warning)]",
};

type AgentMetricCardProps = {
  metric: AgentMetric;
};

export default function AgentMetricCard({ metric }: AgentMetricCardProps) {
  const Icon = metricIcons[metric.tone];
  const isTrend = metric.helper.startsWith("↑");

  return (
    <article className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--text-muted)]">{metric.label}</p>
          <p className="mt-4 text-2xl font-bold tracking-normal text-[var(--text-primary)]">
            {metric.value}
          </p>
          <p className={`mt-2 text-xs ${isTrend ? "text-[var(--state-success)]" : "text-[var(--text-light)]"}`}>
            {metric.helper}
          </p>
        </div>
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${metricToneClasses[metric.tone]}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
