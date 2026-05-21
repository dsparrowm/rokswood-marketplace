import type { StoreTrustBadge } from "@/types/store";

type StoreTrustRowProps = {
  badges: StoreTrustBadge[];
};

function BadgeIcon({ icon }: { icon: StoreTrustBadge["icon"] }) {
  if (icon === "factory") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-[var(--text-light)]">
        <path d="M4 20V8l6 4V8l6 4V5h4v15H4Zm3-3h2v-2H7v2Zm5 0h2v-2h-2v2Zm5 0h2v-2h-2v2Z" />
      </svg>
    );
  }

  if (icon === "delivery") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-[var(--text-light)]">
        <path d="M3 7h11v10H3zM14 11h4l3 3v3h-7z" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="7" cy="18" r="1.8" fill="var(--text-light)" stroke="none" />
        <circle cx="18" cy="18" r="1.8" fill="var(--text-light)" stroke="none" />
      </svg>
    );
  }

  if (icon === "support") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-[var(--text-light)]">
        <path d="M5 13a7 7 0 0 1 14 0v4a2 2 0 0 1-2 2h-2v-5h4M5 17a2 2 0 0 0 2 2h2v-5H5v3Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-[var(--text-light)]">
      <path d="m12 2 2.1 3.2 3.8-1 1 3.8 3.2 2.1-2.1 3.2 1 3.8-3.8 1L15 21.3l-3-2.2-3 2.2-2.1-3.2-3.8-1 1-3.8L2 10.1 5.2 8l1-3.8 3.8 1L12 2Z" />
    </svg>
  );
}

export default function StoreTrustRow({ badges }: StoreTrustRowProps) {
  return (
    <section className="border-b border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
      <div className="mx-auto grid max-w-[1360px] grid-cols-2 gap-x-4 gap-y-7 text-center lg:grid-cols-4 lg:gap-8">
        {badges.map((badge) => (
          <div key={badge.title} className="flex flex-col items-center">
            <BadgeIcon icon={badge.icon} />
            <h2 className="mt-3 text-sm font-bold text-[var(--text-primary)] sm:mt-5">{badge.title}</h2>
            <p className="mt-2 hidden text-xs text-[var(--text-muted)] sm:block lg:mt-4">{badge.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
