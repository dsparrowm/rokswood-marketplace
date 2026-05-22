import { ChevronDown, UserRound } from "lucide-react";
import Link from "next/link";

type AgentDashboardHeaderProps = {
  agentName: string;
};

export default function AgentDashboardHeader({ agentName }: AgentDashboardHeaderProps) {
  return (
    <header className="border-b border-[var(--border-default)] bg-[var(--bg-surface)]">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-dark)] text-sm font-bold text-[var(--text-on-dark)]">
            R
          </span>
          <span className="truncate text-base text-[var(--text-primary)] sm:text-lg">
            Rokswood Marketplace <span className="font-bold">Agent</span>
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center gap-2 border-l border-[var(--border-default)] pl-4 text-sm text-[var(--text-muted)]"
          aria-label="Open agent profile menu"
        >
          <span className="hidden h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-tag)] text-[var(--text-primary)] sm:inline-flex">
            <UserRound className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>{agentName}</span>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
