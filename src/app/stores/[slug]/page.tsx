import { notFound } from "next/navigation";
import Footer from "@/components/marketplace/footer";
import Nav from "@/components/marketplace/nav";
import StoreHero from "@/components/store/store-hero";
import StoreProductBrowser from "@/components/store/store-product-browser";
import StoreTechnicalCta from "@/components/store/store-technical-cta";
import StoreTrustRow from "@/components/store/store-trust-row";
import { getPublicStorePageData } from "@/lib/data/stores";

export const dynamic = "force-dynamic";

type StorePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return [];
}

export default async function StorePage({ params }: StorePageProps) {
  const { slug } = await params;
  const store = await getPublicStorePageData(slug);

  if (!store) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <Nav />
      <StoreHero store={store} />
      <StoreProductBrowser store={store} />
      <StoreTrustRow badges={store.trustBadges} />
      <StoreTechnicalCta title={store.ctaTitle} description={store.ctaDescription} />
      <Footer />
    </div>
  );
}
