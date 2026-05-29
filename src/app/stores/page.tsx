import AgentCta from "@/components/marketplace/agent-cta";
import Footer from "@/components/marketplace/footer";
import Nav from "@/components/marketplace/nav";
import StoresDirectory from "@/components/marketplace/stores-directory";

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <Nav />
      <StoresDirectory />
      <AgentCta />
      <Footer />
    </div>
  );
}
