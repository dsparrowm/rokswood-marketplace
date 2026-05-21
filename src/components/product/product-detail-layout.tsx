import Link from "next/link";
import EngineeringResources from "@/components/product/engineering-resources";
import ProductGallery from "@/components/product/product-gallery";
import ProductProcurementCta from "@/components/product/product-procurement-cta";
import ProductPurchasePanel from "@/components/product/product-purchase-panel";
import ProductTabs from "@/components/product/product-tabs";
import ProductTrustRow from "@/components/product/product-trust-row";
import type { ProductDetailData } from "@/types/product";
import type { StoreDetailData } from "@/types/store";

type ProductDetailLayoutProps = {
  store: StoreDetailData;
  product: ProductDetailData;
};

export default function ProductDetailLayout({ store, product }: ProductDetailLayoutProps) {
  return (
    <main className="bg-[var(--bg-surface)]">
      <section className="mx-auto grid max-w-[1360px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1fr] lg:gap-16 lg:px-10 lg:py-14">
        <div>
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)] lg:hidden">
            <Link href="/stores" className="font-semibold text-[var(--text-primary)]">Stores</Link>
            <span>/</span>
            <Link href={store.href} className="font-semibold text-[var(--text-primary)]">{store.name}</Link>
          </nav>
          <ProductGallery product={product} />
        </div>
        <ProductPurchasePanel product={product} />
      </section>

      <ProductTabs product={product} />
      <EngineeringResources resources={product.resources} />
      <ProductProcurementCta />
      <ProductTrustRow badges={product.trustBadges} />
    </main>
  );
}
