import type { TrackOrderTimelineStep } from "@/types/order-tracking";

type TrackOrderTimelineProps = {
  steps: TrackOrderTimelineStep[];
};

export default function TrackOrderTimeline({ steps }: TrackOrderTimelineProps) {
  return (
    <section className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">Shipment Timeline</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Latest tracking milestones</p>
        </div>
      </div>

      <ol className="mt-5 space-y-4">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-3 sm:gap-4">
            <div className="flex flex-col items-center pt-1">
              <span
                className={`h-3 w-3 rounded-full border-2 ${
                  step.completed
                    ? "border-[var(--accent-payment)] bg-[var(--accent-payment)]"
                    : "border-[var(--border-strong)] bg-[var(--bg-surface)]"
                }`}
              />
              {index < steps.length - 1 ? (
                <span
                  className={`mt-1 h-8 w-px ${step.completed ? "bg-[var(--border-strong)]" : "bg-[var(--border-default)]"}`}
                />
              ) : null}
            </div>

            <div className="min-w-0 pb-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{step.title}</p>
                <p className="text-xs text-[var(--text-light)]">{step.timestamp}</p>
              </div>
              <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}