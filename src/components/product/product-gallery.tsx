import Image from "next/image";
import type { ProductDetailData } from "@/types/product";

type ProductGalleryProps = {
  product: ProductDetailData;
};

export default function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <div>
      <div className="relative flex aspect-square items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)]">
        <span className="absolute left-4 top-4 rounded bg-[var(--bg-surface)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)] shadow-sm">
          {product.badge}
        </span>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 520px"
          className="object-contain p-10 sm:p-16 lg:p-20"
        />
      </div>

      <div className="mt-5 grid grid-cols-4 gap-3 sm:gap-4">
        {product.gallery.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={`relative aspect-square rounded-md border bg-[var(--bg-base)] ${
              index === 0 ? "border-[var(--bg-dark)]" : "border-[var(--border-default)]"
            }`}
          >
            <Image
              src={image}
              alt={`${product.name} gallery thumbnail ${index + 1}`}
              fill
              sizes="120px"
              className="object-contain p-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
