import { storeList, type Product } from "@/data/stores";

export type CatalogProduct = Product & {
  storeName: string;
  storeSlug: string;
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const allProducts: CatalogProduct[] = storeList.flatMap((store) =>
  store.products.map((product) => ({
    ...product,
    storeName: store.name,
    storeSlug: store.slug,
  })),
);

export const allCategories = Array.from(new Set(allProducts.map((product) => product.category)));

export const categoryMap = new Map(allCategories.map((category) => [slugify(category), category]));

export const getProductHref = (product: CatalogProduct) =>
  `/store/${product.storeSlug}/product/${product.id}`;

export const getStoreHref = (slug: string) => `/store/${slug}`;

export const featuredAgentProducts = storeList.map((store) => ({
  ...store.products[0],
  storeSlug: store.slug,
  storeName: store.name,
}));
