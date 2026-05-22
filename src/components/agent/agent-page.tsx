import AgentBenefits from "@/components/agent/agent-benefits";
import AgentCommissionTiers from "@/components/agent/agent-commission-tiers";
import AgentFaq from "@/components/agent/agent-faq";
import AgentHero from "@/components/agent/agent-hero";
import AgentRegistrationForm from "@/components/agent/agent-registration-form";
import AgentTrustStrip from "@/components/agent/agent-trust-strip";
import Footer from "@/components/marketplace/footer";
import Nav from "@/components/marketplace/nav";

export default function AgentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <Nav />
      <main className="flex-1">
        <AgentHero />
        <AgentTrustStrip />
        <AgentBenefits />
        <AgentCommissionTiers />
        <AgentRegistrationForm />
        <AgentFaq />
      </main>
      <Footer />
    </div>
  );
}
