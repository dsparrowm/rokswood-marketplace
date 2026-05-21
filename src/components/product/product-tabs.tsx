import { CheckIcon } from "@/components/product/product-icons";
import type { ProductDetailData } from "@/types/product";

type ProductTabsProps = {
  product: ProductDetailData;
};

const tabs = [
  "Technical Specifications",
  "Description & Features",
  "Applications",
  "Installation & Warranty",
];

export default function ProductTabs({ product }: ProductTabsProps) {
  return (
    <section className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="overflow-x-auto border-b border-[var(--border-default)]">
        <div className="flex min-w-max gap-9">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`pb-4 text-sm font-bold ${
                index === 0
                  ? "border-b-2 border-[var(--bg-dark)] text-[var(--text-primary)]"
                  : "text-[var(--text-light)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 pt-8 lg:grid-cols-[1fr_380px] lg:gap-12">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Comprehensive Specifications</h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-[var(--border-default)]">
            {product.specifications.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 border-b border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3 text-sm last:border-b-0 sm:grid-cols-[220px_1fr]"
              >
                <p className="font-bold text-[var(--text-muted)]">{row.label}</p>
                <p className="font-semibold text-[var(--text-primary)]">{row.value}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-6">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Key Enterprise Features</h2>
          <ul className="mt-5 space-y-5">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm leading-6 text-[var(--text-muted)]">
                <CheckIcon />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
