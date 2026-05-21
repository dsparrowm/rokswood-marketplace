import StoreIcon from "@/components/marketplace/store-icon";
import type { StoreDetailData } from "@/types/store";

type StoreHeroProps = {
  store: StoreDetailData;
};

export default function StoreHero({ store }: StoreHeroProps) {
  return (
    <section className={`${store.heroClassName} px-4 py-12 text-[var(--text-on-dark)] sm:px-6 sm:py-16 lg:px-10 lg:py-28`}>
      <div className="mx-auto max-w-[980px] lg:max-w-[1000px]">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-surface)] shadow-sm sm:h-16 sm:w-16">
            <StoreIcon icon={store.icon} />
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.01em] sm:text-4xl">
            {store.name}
          </h1>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--text-on-dark)] sm:mt-6 sm:text-lg sm:leading-8">
          {store.heroDescription}
        </p>

        <div className="mt-6 flex flex-wrap gap-2 sm:mt-9 sm:gap-3">
          {store.tags.map((tag, index) => (
            <span
              key={tag}
              className={`rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-[var(--text-on-dark)] sm:px-4 sm:py-2 ${
                index > 1 ? "hidden sm:inline-flex" : "inline-flex"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
