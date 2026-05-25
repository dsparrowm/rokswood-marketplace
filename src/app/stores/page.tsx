import AgentCta from "@/components/marketplace/agent-cta";
import Footer from "@/components/marketplace/footer";
import Nav from "@/components/marketplace/nav";
import StoreGrid from "@/components/marketplace/store-grid";
import { getStoreDirectoryCards } from "@/lib/data/stores";

export default async function StoresPage() {
  const { stores, total } = await getStoreDirectoryCards();

  return (
    <div className="min-h-screen bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <Nav />
      <StoreGrid stores={stores} storeCount={total} />
      <AgentCta />
      <Footer />
    </div>
  );
}
