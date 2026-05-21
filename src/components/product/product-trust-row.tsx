import { TrustIcon } from "@/components/product/product-icons";
import type { StoreTrustBadge } from "@/types/store";

type ProductTrustRowProps = {
  badges: StoreTrustBadge[];
};

export default function ProductTrustRow({ badges }: ProductTrustRowProps) {
  return (
    <section className="mx-auto max-w-[1360px] border-t border-[var(--border-default)] px-4 py-10 sm:px-6 lg:px-10">
      <div className="grid gap-y-8 text-center sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((badge, index) => (
          <div
            key={badge.title}
            className={`flex flex-col items-center px-6 ${
              index > 0 ? "lg:border-l lg:border-[var(--border-default)]" : ""
            }`}
          >
            <TrustIcon icon={badge.icon} />
            <h2 className="mt-4 text-sm font-bold text-[var(--text-primary)]">{badge.title}</h2>
            <p className="mt-4 text-xs text-[var(--text-muted)]">{badge.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
