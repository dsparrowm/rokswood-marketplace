import StoreFilterSidebar from "@/components/store/store-filter-sidebar";
import StoreProductCard from "@/components/store/store-product-card";
import type { StoreDetailData } from "@/types/store";

type StoreProductBrowserProps = {
  store: StoreDetailData;
};

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 stroke-[var(--text-light)]">
      <circle cx="9" cy="9" r="5.5" fill="none" strokeWidth="1.8" />
      <path d="m13.2 13.2 3 3" fill="none" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 stroke-current">
      <path d="M3 5h14M6 10h8M8 15h4" fill="none" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export default function StoreProductBrowser({ store }: StoreProductBrowserProps) {
  return (
    <section className="border-b border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-8 lg:flex-row">
        <div className="hidden lg:block">
          <StoreFilterSidebar
            categories={store.categories}
            availability={store.availability}
            segments={store.segments}
            idPrefix="desktop"
          />
        </div>

        <div className="min-w-0 flex-1">
          <form className="flex gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-2 shadow-sm sm:gap-3">
            <label className="flex min-h-10 flex-1 items-center gap-3 px-1 sm:px-2">
              <SearchIcon />
              <span className="sr-only">Search products</span>
              <input
                type="search"
                placeholder={store.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              />
            </label>
            <button
              type="submit"
              className="hidden h-10 rounded-md bg-[var(--accent-primary)] px-7 text-sm font-semibold text-white sm:inline-flex sm:items-center"
            >
              Search
            </button>
          </form>

          <details className="mt-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font-semibold text-[var(--text-primary)] marker:hidden">
              <span className="inline-flex items-center gap-2">
                <FilterIcon />
                Filters
              </span>
              <span className="text-xs font-medium text-[var(--text-muted)]">Category, stock, segment</span>
            </summary>
            <div className="border-t border-[var(--border-default)]">
              <StoreFilterSidebar
                categories={store.categories}
                availability={store.availability}
                segments={store.segments}
                idPrefix="mobile"
                framed={false}
              />
            </div>
          </details>

          <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {store.products.map((product) => (
              <StoreProductCard
                key={product.slug}
                product={product}
                storeSlug={store.slug}
                accentTextClassName={store.accentTextClassName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
