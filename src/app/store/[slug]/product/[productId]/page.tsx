import { notFound } from "next/navigation";
import { stores } from "@/data/stores";
import { ProductClient } from "./product-client";

export function generateStaticParams() {
  return Object.values(stores).flatMap((store) =>
    store.products.map((product) => ({ slug: store.slug, productId: product.id })),
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}) {
  const { slug, productId } = await params;
  const store = stores[slug];
  const product = store?.products.find((item) => item.id === productId);
  if (!store || !product) notFound();
  return <ProductClient store={store} product={product} />;
}
