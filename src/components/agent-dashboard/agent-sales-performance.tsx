import { ChevronDown } from "lucide-react";

import type { AgentSalesSummaryItem } from "@/types/agent-dashboard";

type AgentSalesPerformanceProps = {
  summary: AgentSalesSummaryItem[];
};

export default function AgentSalesPerformance({ summary }: AgentSalesPerformanceProps) {
  return (
    <section className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[var(--border-default)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-bold text-[var(--text-primary)]">Sales Performance</h2>
        <button
          type="button"
          className="inline-flex h-8 w-fit items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)]"
        >
          Last 30 Days
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="p-6">
        <div className="grid max-w-md grid-cols-3 gap-5">
          {summary.map((item) => (
            <div key={item.label}>
              <p className="max-w-20 text-sm leading-5 text-[var(--text-muted)]">{item.label}</p>
              <p className="mt-2 text-xl font-bold text-[var(--text-primary)]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 h-[280px] w-full overflow-hidden">
          <svg viewBox="0 0 760 280" role="img" aria-label="Sales trend chart from Monday to Sunday" className="h-full w-full">
            <g className="stroke-[var(--border-default)]">
              {[40, 84, 128, 172, 216].map((y) => (
                <line key={y} x1="44" x2="740" y1={y} y2={y} strokeWidth="1" />
              ))}
            </g>
            <g className="fill-[var(--text-light)] text-[11px]">
              {["$2500", "$2000", "$1500", "$1000", "$500", "$0"].map((label, index) => (
                <text key={label} x="0" y={44 + index * 44}>
                  {label}
                </text>
              ))}
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label, index) => (
                <text key={label} x={44 + index * 116} y="270">
                  {label}
                </text>
              ))}
            </g>
            <path
              d="M44 156 C82 120 108 104 150 96 C198 88 220 128 260 132 C316 138 338 72 392 70 C448 68 454 120 512 106 C566 92 580 32 630 24 C672 18 706 32 740 52 L740 258 L44 258 Z"
              className="fill-[var(--agent-chart-fill)]"
            />
            <path
              d="M44 156 C82 120 108 104 150 96 C198 88 220 128 260 132 C316 138 338 72 392 70 C448 68 454 120 512 106 C566 92 580 32 630 24 C672 18 706 32 740 52"
              className="fill-none stroke-[var(--accent-payment)]"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
