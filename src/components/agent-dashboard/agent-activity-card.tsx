import type { AgentActivity, AgentActivityTone } from "@/types/agent-dashboard";

const activityToneClasses: Record<AgentActivityTone, string> = {
  success: "bg-[var(--state-success)]",
  info: "bg-[var(--accent-payment)]",
  muted: "bg-[var(--text-light)]",
};

type AgentActivityCardProps = {
  activities: AgentActivity[];
};

export default function AgentActivityCard({ activities }: AgentActivityCardProps) {
  return (
    <section className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6 shadow-sm">
      <h2 className="text-base font-bold text-[var(--text-primary)]">Recent Activity</h2>

      <ol className="mt-6 space-y-8 border-l border-[var(--border-default)]">
        {activities.map((activity) => (
          <li key={`${activity.title}-${activity.time}`} className="relative pl-6">
            <span
              className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full ${activityToneClasses[activity.tone]}`}
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-[var(--text-primary)]">{activity.title}</p>
            <p className="mt-2 text-xs text-[var(--text-muted)]">{activity.detail}</p>
            <p className="mt-3 text-xs text-[var(--text-light)]">{activity.time}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
