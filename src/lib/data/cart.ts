import { stores } from "@/lib/data/stores";
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
  const store = stores.find((item) => item.slug === seed.storeSlug);

  if (!store) {
    throw new Error(`Unable to seed cart store for ${seed.storeSlug}`);
  }

  const detail = store?.products.find((product) => product.slug === seed.productSlug);

  if (!detail) {
    throw new Error(`Unable to seed cart item for ${seed.storeSlug}/${seed.productSlug}`);
  }

  return {
    id: `${seed.storeSlug}:${detail.slug}`,
    productId: detail.slug,
    productSlug: detail.slug,
    storeSlug: store.slug,
    sku: `${store.slug.slice(0, 3).toUpperCase()}-${detail.slug.slice(0, 6).toUpperCase()}`,
    name: detail.name,
    description: detail.description,
    price: detail.price ?? 0,
    quantity: seed.quantity,
    image: detail.image,
    imageAlt: detail.imageAlt,
    category: detail.category,
  };
});