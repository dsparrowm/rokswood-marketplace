"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProductDetailData } from "@/types/product";

type ProductGalleryProps = {
  product: ProductDetailData;
};

export default function ProductGallery({ product }: ProductGalleryProps) {
  const galleryImages = useMemo(
    () => [product.image, ...product.gallery].filter((image, index, images) => images.indexOf(image) === index),
    [product.gallery, product.image],
  );
  const [activeImage, setActiveImage] = useState(galleryImages[0] ?? product.image);
  const activeIndex = Math.max(galleryImages.indexOf(activeImage), 0);

  return (
    <div>
      <div className="relative flex aspect-square items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)]">
        <span className="absolute left-4 top-4 rounded bg-[var(--bg-surface)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)] shadow-sm">
          {product.badge}
        </span>
        <Image
          src={activeImage}
          alt={
            activeIndex === 0
              ? product.imageAlt
              : `${product.name} gallery image ${activeIndex + 1}`
          }
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 1024px) 100vw, 520px"
          className="object-contain p-10 sm:p-16 lg:p-20"
        />
      </div>

      <div className="mt-5 grid grid-cols-4 gap-3 sm:gap-4">
        {galleryImages.slice(0, 4).map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            aria-label={`Show ${product.name} gallery image ${index + 1}`}
            aria-pressed={image === activeImage}
            onClick={() => setActiveImage(image)}
            className={`relative aspect-square rounded-md border bg-[var(--bg-base)] transition-colors ${
              image === activeImage ? "border-[var(--bg-dark)]" : "border-[var(--border-default)]"
            }`}
          >
            <Image
              src={image}
              alt={`${product.name} gallery thumbnail ${index + 1}`}
              fill
              sizes="120px"
              className="object-contain p-3"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
