import AgentCta from "@/components/marketplace/agent-cta";
import Footer from "@/components/marketplace/footer";
import Nav from "@/components/marketplace/nav";
import QueryProvider from "@/components/providers/query-provider";
import StoresDirectory from "@/components/marketplace/stores-directory";

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <Nav />
      <QueryProvider>
        <StoresDirectory />
      </QueryProvider>
      <AgentCta />
      <Footer />
    </div>
  );
}
