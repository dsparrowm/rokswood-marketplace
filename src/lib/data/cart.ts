import { getProductDetailBySlug } from "@/lib/data/products";
import type { CartItem } from "@/types/cart";

type CartSeed = {
  storeSlug: string;
  productSlug: string;
  quantity: number;
};

const cartSeeds: CartSeed[] = [
  {
    storeSlug: "rokswood-energy",
    productSlug: "rx-9000-smart-industrial-inverter",
    quantity: 2,
  },
  {
    storeSlug: "rokswood-energy",
    productSlug: "ecohome-energy-monitor",
    quantity: 10,
  },
  {
    storeSlug: "agrify",
    productSlug: "soilgrid-monitor",
    quantity: 3,
  },
];

export const initialCartItems: CartItem[] = cartSeeds.map((seed) => {
  const detail = getProductDetailBySlug(seed.storeSlug, seed.productSlug);

  if (!detail) {
    throw new Error(`Unable to seed cart item for ${seed.storeSlug}/${seed.productSlug}`);
  }

  return {
    id: `${seed.storeSlug}:${detail.product.slug}`,
    productId: detail.product.slug,
    productSlug: detail.product.slug,
    storeSlug: detail.store.slug,
    sku: detail.product.sku,
    name: detail.product.name,
    description: detail.product.description,
    price: detail.product.price ?? 0,
    quantity: seed.quantity,
    image: detail.product.image,
    imageAlt: detail.product.imageAlt,
    category: detail.product.category,
  };
});