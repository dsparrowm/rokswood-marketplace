import { ChartNoAxesCombined, Link2, ShoppingBag, Wallet } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";

export default function AgentDashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Agent Portal</div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] gradient-text">
            Storefront, sales and wallet.
          </h1>
          <p className="mt-6 max-w-xl text-bone/70 leading-relaxed">
            This is the agent-facing account area. It is separate from customer shopping and separate from your admin system.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container grid gap-5 md:grid-cols-4">
          {[
            ["Sales", "₦4.82M", ShoppingBag],
            ["Commission", "₦612k", ChartNoAxesCombined],
            ["Wallet", "₦284k", Wallet],
            ["Referral", "RWA-2045", Link2],
          ].map(([label, value, Icon]) => (
            <div key={label as string} className="rounded-2xl border border-border bg-gradient-card p-6">
              <Icon className="h-5 w-5 text-primary" />
              <div className="mt-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label as string}</div>
              <div className="mt-2 font-display text-3xl text-ivory">{value as string}</div>
            </div>
          ))}
        </div>
        <div className="container mt-8">
          <div className="rounded-2xl border border-border bg-gradient-card p-7">
            <h2 className="font-display text-3xl text-ivory">Public storefront</h2>
            <p className="mt-3 text-sm text-bone/70">Share your storefront and referral code with customers. They still checkout as guests.</p>
            <Link href="/agent/ada" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">
              View storefront
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
