import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "@/types/store";

type StoreProductCardProps = {
  product: StoreProduct;
  storeSlug: string;
  accentTextClassName: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price);
}

export default function StoreProductCard({
  product,
  storeSlug,
  accentTextClassName,
}: StoreProductCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm">
      <div className="relative flex aspect-[4/1.7] items-center justify-center border-b border-[var(--border-default)] bg-[var(--bg-base)] sm:aspect-[4/2.15]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 360px"
          className="object-contain p-4 sm:p-5"
        />
      </div>

      <div className="p-4 sm:p-5">
        <p className={`text-xs font-bold ${accentTextClassName}`}>
          {product.category}
        </p>
        <h2 className="mt-2 text-base font-bold leading-6 text-[var(--text-primary)] sm:mt-3">
          {product.name}
        </h2>
        <p className="mt-2 overflow-hidden text-xs leading-5 text-[var(--text-muted)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:min-h-12 sm:[-webkit-line-clamp:3]">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-4 sm:mt-6">
          <p className="text-lg font-bold text-[var(--text-primary)]">
            {product.price === null ? "Request Quote" : formatPrice(product.price)}
          </p>
          <Link
            href={`/stores/${storeSlug}/products/${product.slug}`}
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-[var(--accent-primary)]"
          >
            View Details
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
