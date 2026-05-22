import { ChartNoAxesCombined, Check, LaptopMinimal, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Benefit = {
  title: string;
  body: string;
  Icon: LucideIcon;
  points: string[];
};

const benefits: Benefit[] = [
  {
    title: "Business Growth Opportunity",
    body: "Scale your operations by adding high-value industrial and energy products to your portfolio without inventory risk.",
    Icon: ChartNoAxesCombined,
    points: ["Commission on every sale", "Performance-based incentives"],
  },
  {
    title: "Nationwide Distribution Network",
    body: "Become the go-to supplier in your region with exclusive access to specific territories and markets.",
    Icon: UsersRound,
    points: ["Regional exclusivity options", "Access to multiple Rokswood stores"],
  },
  {
    title: "Digital Sales Tracking",
    body: "Manage your entire pipeline, track commissions, and monitor deliveries through our enterprise agent portal.",
    Icon: LaptopMinimal,
    points: ["Real-time tracking dashboard", "Official agent certification"],
  },
];

export default function AgentBenefits() {
  return (
    <section className="bg-[var(--bg-surface)] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            Why partner with Rokswood?
          </h2>
          <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
            Equip your business with enterprise-grade tools, exclusive regional access, and
            high-margin industrial products.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.map(({ title, body, Icon, points }) => (
            <article
              key={title}
              className="rounded-lg bg-[var(--bg-base)] p-6 shadow-sm ring-1 ring-[color-mix(in_srgb,var(--border-default)_70%,transparent)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--bg-surface)] text-[var(--accent-payment)] shadow-sm">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-7 text-base font-bold text-[var(--text-primary)]">{title}</h3>
              <p className="mt-5 text-sm leading-6 text-[var(--text-muted)]">{body}</p>
              <ul className="mt-6 space-y-3 text-xs font-medium text-[var(--text-muted)]">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[var(--state-success)]" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
