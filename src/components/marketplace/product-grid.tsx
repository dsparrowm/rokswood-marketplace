"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/data/stores";
import { useCart } from "@/context/cart-context";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductGrid({ products, storeSlug }: { products: Product[]; storeSlug: string }) {
  const { add } = useCart();

  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <AnimatePresence mode="popLayout">
        {products.map((product, i) => (
          <motion.article
            key={product.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.6, ease, delay: Math.min(i * 0.04, 0.3) }}
            whileHover={{ y: -6 }}
            className="group relative rounded-3xl border border-border bg-gradient-card overflow-hidden shadow-elegant"
          >
            <Link href={`/store/${storeSlug}/product/${product.id}`} className="block" aria-label={`View ${product.name}`}>
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-black/8" />
                {product.tag && (
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground backdrop-blur">
                    {product.tag}
                  </span>
                )}
                <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.25em] text-white px-2.5 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur">
                  {product.category}
                </span>
              </div>
            </Link>

            <div className="p-5 flex items-end justify-between gap-4">
              <Link href={`/store/${storeSlug}/product/${product.id}`} className="min-w-0 flex-1">
                <h3 className="font-display text-lg text-ivory leading-tight truncate hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="text-sm text-bone/70 mt-1">{product.price}</div>
              </Link>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  add(product, storeSlug);
                }}
                aria-label={`Add ${product.name} to cart`}
                className="shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-ash hover:bg-primary text-bone hover:text-primary-foreground transition-all duration-500 ease-silk"
              >
                <Plus className="w-4 h-4 hover:rotate-90 transition-transform duration-500 ease-silk" />
              </button>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
