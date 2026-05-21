import Nav from "@/components/marketplace/nav";
import Hero from "@/components/marketplace/hero";
import TrustBar from "@/components/marketplace/trust-bar";
import StoreGrid from "@/components/marketplace/store-grid";
import AgentCta from "@/components/marketplace/agent-cta";
import Footer from "@/components/marketplace/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <Nav />
      <Hero />
      <TrustBar />
      <StoreGrid />
      <AgentCta />
      <Footer />
    </div>
  );
}
