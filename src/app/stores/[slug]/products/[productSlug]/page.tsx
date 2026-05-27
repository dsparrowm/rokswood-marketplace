import { notFound } from "next/navigation";
import Footer from "@/components/marketplace/footer";
import Nav from "@/components/marketplace/nav";
import ProductDetailLayout from "@/components/product/product-detail-layout";
import { getProductDetailBySlug } from "@/lib/data/products";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{
    slug: string;
    productSlug: string;
  }>;
};

export function generateStaticParams() {
  return [];
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productSlug } = await params;
  const detail = await getProductDetailBySlug(slug, productSlug);

  if (!detail) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-surface)] font-sans text-[var(--text-primary)]">
      <Nav />
      <ProductDetailLayout store={detail.store} product={detail.product} />
      <Footer />
    </div>
  );
}
