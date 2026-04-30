import { notFound } from "next/navigation";
import ProductsPage from "@/app/products/page";
import { categoryMap } from "@/lib/marketplace";

export function generateStaticParams() {
  return Array.from(categoryMap.keys()).map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!categoryMap.has(category)) notFound();
  return <ProductsPage searchParams={Promise.resolve({ category })} />;
}
