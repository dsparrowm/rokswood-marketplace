import Nav from "@/components/marketplace/nav";
import Hero from "@/components/marketplace/hero";
import TrustBar from "@/components/marketplace/trust-bar";
import StoreGrid from "@/components/marketplace/store-grid";
import AgentCta from "@/components/marketplace/agent-cta";
import Footer from "@/components/marketplace/footer";
import { stores } from "@/lib/data/stores";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <Nav />
      <Hero />
      <TrustBar />
      <StoreGrid stores={stores} />
      <AgentCta />
      <Footer />
    </div>
  );
}
