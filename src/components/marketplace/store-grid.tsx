import StoreCard from "@/components/marketplace/store-card";
import { stores } from "@/lib/data/stores";

export default function StoreGrid() {
  return (
    <section className="bg-[var(--bg-base)] px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--text-primary)] sm:text-4xl">
              Discover Stores
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[var(--text-muted)]">
              Navigate our specialized stores tailored for distinct industrial,
              energy, and structural needs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous stores"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-muted)] shadow-sm"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current">
                <path d="M12.5 5 7.5 10l5 5M8 10h8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next stores"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-muted)] shadow-sm"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current">
                <path d="M7.5 5 12.5 10l-5 5M4 10h8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-9">
          {stores.map((store) => (
            <StoreCard key={store.name} store={store} />
          ))}
        </div>
      </div>
    </section>
  );
}
