import Link from "next/link";
import type { StoreCardData } from "@/types/store";
import StoreIcon from "@/components/marketplace/store-icon";

type StoreCardProps = {
  store: StoreCardData;
};

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <article
      className={`flex min-h-[330px] flex-col rounded-lg border-t-4 bg-[var(--bg-surface)] p-8 shadow-[0_18px_35px_color-mix(in_srgb,var(--text-muted)_18%,transparent)] ${store.accentClassName}`}
    >
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[var(--bg-base)]">
          <StoreIcon icon={store.icon} logoSrc={store.logoSrc} logoAlt={store.logoAlt ?? `${store.name} logo`} />
        </div>
        <span className="rounded-md bg-[var(--bg-tag)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
          {store.category}
        </span>
      </div>

      <h3 className="text-2xl font-bold tracking-[-0.01em]">{store.name}</h3>
      <p className="mt-7 min-h-14 text-sm leading-6 text-[var(--text-muted)]">
        {store.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {store.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-[var(--bg-tag)] px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={store.href}
        className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] text-sm font-semibold text-[var(--text-primary)]"
      >
        Visit Store
        <svg aria-hidden="true" viewBox="0 0 20 20" className="ml-2 h-4 w-4 fill-none stroke-current">
          <path d="M4 10h10m-4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      </Link>
    </article>
  );
}
