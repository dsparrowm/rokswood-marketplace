import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type CommissionTier = {
  name: string;
  range: string;
  label: string;
  eligibility: string;
  perks: string[];
  featured?: boolean;
  dark?: boolean;
};

const commissionTiers: CommissionTier[] = [
  {
    name: "Standard Agent",
    range: "5-8%",
    label: "per successful sale",
    eligibility: "New applications, basic vetting completed.",
    perks: ["Standard dashboard access", "Digital marketing assets"],
  },
  {
    name: "Silver Tier",
    range: "8-12%",
    label: "per successful sale",
    eligibility: "$50k+ quarterly volume.",
    perks: ["Priority support", "Co-branded materials"],
  },
  {
    name: "Gold Tier",
    range: "12-18%",
    label: "per successful sale",
    eligibility: "$150k+ quarterly volume.",
    perks: ["Dedicated account manager", "Regional lead routing"],
    featured: true,
  },
  {
    name: "Enterprise Partner",
    range: "Custom",
    label: "negotiated rates",
    eligibility: "Large distributors, $500k+ volume.",
    perks: ["Exclusive territory rights", "API integration access"],
    dark: true,
  },
];

export default function AgentCommissionTiers() {
  return (
    <section id="commission-tiers" className="bg-[var(--bg-base)] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            Transparent Commission Structure
          </h2>
          <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
            Clear, tiered rewards designed to scale with your sales volume.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {commissionTiers.map((tier) => (
            <article
              key={tier.name}
              className={cn(
                "relative rounded-lg border p-6 shadow-sm",
                tier.dark
                  ? "border-[var(--bg-dark)] bg-[var(--bg-dark)] text-[var(--text-on-dark)]"
                  : "bg-[var(--bg-surface)]",
                tier.featured
                  ? "border-[var(--accent-payment)] shadow-[0_16px_36px_color-mix(in_srgb,var(--accent-payment)_13%,transparent)]"
                  : "",
                !tier.dark && !tier.featured ? "border-[var(--border-default)]" : "",
              )}
            >
              {tier.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent-payment)] px-4 py-1 text-[11px] font-bold text-[var(--text-on-dark)]">
                  Most Popular
                </span>
              ) : null}
              <p className={cn("text-xs font-bold", tier.dark ? "text-[var(--text-on-dark-muted)]" : "text-[var(--text-muted)]")}>
                {tier.name}
              </p>
              <p className="mt-8 text-4xl font-bold tracking-[-0.03em]">{tier.range}</p>
              <p className={cn("mt-1 text-xs font-semibold", tier.dark ? "text-[var(--text-on-dark-muted)]" : "text-[var(--text-muted)]")}>
                {tier.label}
              </p>
              <div className="mt-8">
                <p className="text-xs font-bold">Eligibility:</p>
                <p className={cn("mt-3 text-xs leading-5", tier.dark ? "text-[var(--text-on-dark-muted)]" : "text-[var(--text-muted)]")}>
                  {tier.eligibility}
                </p>
              </div>
              <ul className={cn("mt-8 space-y-3 text-xs", tier.dark ? "text-[var(--text-on-dark-muted)]" : "text-[var(--text-muted)]")}>
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <Check
                      className={cn(
                        "h-3.5 w-3.5",
                        tier.dark ? "text-[var(--text-on-dark)]" : "text-[var(--accent-payment)]",
                      )}
                      aria-hidden="true"
                    />
                    <span>{perk}</span>
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
