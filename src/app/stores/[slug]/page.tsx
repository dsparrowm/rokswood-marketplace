import Footer from "@/components/marketplace/footer";
import Nav from "@/components/marketplace/nav";
import StorePageClient from "@/components/store/store-page";

export const dynamic = "force-dynamic";

export default function StorePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <Nav />
      <StorePageClient />
      <Footer />
    </div>
  );
}
