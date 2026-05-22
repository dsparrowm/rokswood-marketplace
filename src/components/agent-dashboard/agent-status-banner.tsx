import { TriangleAlert } from "lucide-react";

type AgentStatusBannerProps = {
  alert: string;
  badges: string[];
};

export default function AgentStatusBanner({ alert, badges }: AgentStatusBannerProps) {
  return (
    <section className="border-b border-[var(--state-warning)] bg-[var(--state-warning-soft)]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3 text-sm text-[var(--state-warning-text)]">
          <TriangleAlert className="h-4 w-4 shrink-0 text-[var(--state-warning)]" aria-hidden="true" />
          <p>
            <span className="font-bold">Action Required:</span>
            {alert}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {badges.map((badge) => {
            const isVerified = badge.includes("Verified");

            return (
              <span
                key={badge}
                className={`rounded-md px-3 py-1 text-xs ${
                  isVerified
                    ? "bg-[var(--state-success-soft)] text-[var(--state-success)]"
                    : "bg-[var(--state-warning-soft)] text-[var(--state-warning-text)]"
                }`}
              >
                {badge}
              </span>
            );
          })}
          <button
            type="button"
            className="rounded-md bg-[var(--state-warning)] px-4 py-2 text-xs font-medium text-[var(--text-on-dark)]"
          >
            Verify Identity
          </button>
        </div>
      </div>
    </section>
  );
}
