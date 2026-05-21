import type { ProductDetailData } from "@/types/product";
import { DownloadIcon } from "@/components/product/product-icons";

type ProductPurchasePanelProps = {
  product: ProductDetailData;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price);
}

export default function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  return (
    <section>
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-semibold text-[var(--text-muted)]">SKU: {product.sku}</p>
        <span className="inline-flex items-center gap-2 rounded bg-[var(--state-success)]/10 px-3 py-1.5 text-sm font-semibold text-[var(--state-success)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--state-success)]" />
          {product.status}
        </span>
      </div>

      <h1 className="mt-6 text-3xl font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-4xl">
        {product.name}
      </h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-muted)]">
        {product.description}
      </p>

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <p className="text-3xl font-bold text-[var(--text-primary)]">
          {product.price === null ? "Request Quote" : formatPrice(product.price)}
        </p>
        <p className="pb-1 text-sm font-medium text-[var(--text-light)]">{product.unitLabel}</p>
      </div>

      <div className="mt-8 rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-5">
        <h2 className="text-xs font-bold text-[var(--text-light)]">Technical Summary</h2>
        <div className="mt-4 grid gap-x-8 gap-y-5 border-t border-[var(--border-default)] pt-4 sm:grid-cols-2">
          {product.technicalSummary.map((item) => (
            <div key={item.label}>
              <p className="text-xs font-semibold text-[var(--text-light)]">{item.label}</p>
              <p className="mt-2 text-sm font-bold text-[var(--text-muted)]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-[112px_1fr]">
        <div className="grid h-11 grid-cols-3 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] text-sm font-semibold text-[var(--text-light)]">
          <button type="button" aria-label="Decrease quantity" className="flex items-center justify-center">
            -
          </button>
          <span className="flex items-center justify-center text-[var(--text-primary)]">1</span>
          <button type="button" aria-label="Increase quantity" className="flex items-center justify-center">
            +
          </button>
        </div>
        <button
          type="button"
          className="h-11 rounded-md bg-[var(--accent-primary)] px-6 text-sm font-bold text-white"
        >
          Add to Cart
        </button>
      </div>

      <button
        type="button"
        className="mt-3 h-11 w-full rounded-md border border-[var(--bg-dark)] bg-[var(--bg-surface)] px-6 text-sm font-bold text-[var(--text-primary)]"
      >
        Request Enterprise Quote
      </button>

      <div className="mt-7 flex items-center justify-between gap-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-[var(--bg-base)]">
            <DownloadIcon />
          </span>
          <div>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">{product.specificationSheet.title}</h2>
            <p className="mt-1 text-xs font-medium text-[var(--text-light)]">{product.specificationSheet.meta}</p>
          </div>
        </div>
        <DownloadIcon />
      </div>
    </section>
  );
}
