import { notFound } from "next/navigation";
import { stores } from "@/data/stores";
import { StoreClient } from "./store-client";

export function generateStaticParams() {
  return Object.keys(stores).map((slug) => ({ slug }));
}

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = stores[slug];
  if (!store) notFound();
  return <StoreClient store={store} />;
}
