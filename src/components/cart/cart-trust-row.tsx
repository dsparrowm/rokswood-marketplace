const trustBadges = [
  {
    title: "Secure Procurement",
    description: "PO-friendly checkout",
    icon: "shield",
  },
  {
    title: "Multi-Store Support",
    description: "One cart, many stores",
    icon: "layers",
  },
  {
    title: "Enterprise Invoicing",
    description: "Invoice-ready paperwork",
    icon: "receipt",
  },
  {
    title: "Verified Gateway",
    description: "Protected transactions",
    icon: "gateway",
  },
] as const;

function TrustBadgeIcon({ icon }: { icon: (typeof trustBadges)[number]["icon"] }) {
  if (icon === "layers") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-[var(--text-light)]">
        <path d="M12 4 4.5 8l7.5 4 7.5-4-7.5-4Zm0 8-7.5-4v4l7.5 4 7.5-4v-4L12 12Zm0 4-7.5-4v4l7.5 4 7.5-4v-4l-7.5 4Z" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "receipt") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-[var(--text-light)]">
        <path d="M7 4h10v16l-2-1.5L13 20l-2-1.5L9 20l-2-1.5Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="M9 8h6M9 11h6M9 14h4" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "gateway") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-[var(--text-light)]">
        <path d="M6 8h12M7 5h10M7 19h10" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M8 8v8m8-8v8M10 12h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-[var(--text-light)]">
      <path d="M12 3 5 6v5c0 4.5 2.8 8.2 7 10 4.2-1.8 7-5.5 7-10V6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="m9.5 12 1.8 1.8L15 10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export default function CartTrustRow() {
  return (
    <section className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2">
        {trustBadges.map((badge) => (
          <div key={badge.title} className="flex items-start gap-3 rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] p-3">
            <TrustBadgeIcon icon={badge.icon} />
            <div>
              <h3 className="text-xs font-semibold text-[var(--text-primary)]">{badge.title}</h3>
              <p className="mt-1 text-[11px] leading-4 text-[var(--text-muted)]">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}