import Footer from "@/components/marketplace/footer";
import Nav from "@/components/marketplace/nav";
import QueryProvider from "@/components/providers/query-provider";
import StorePageClient from "@/components/store/store-page";

export const dynamic = "force-dynamic";

type StorePageProps = {
  params: {
    slug: string;
  };
};

export default async function StorePage({ params }: StorePageProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <Nav />
      <QueryProvider>
        <StorePageClient slug={params.slug} />
      </QueryProvider>
      <Footer />
    </div>
  );
}
