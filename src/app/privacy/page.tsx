import Link from "next/link";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Privacy</div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] gradient-text">Guest-first data policy.</h1>
          <div className="mt-10 space-y-7 text-bone/75 leading-relaxed">
            <p>General shoppers do not need accounts. We collect checkout details only to process payment, delivery, support and legally required records.</p>
            <p>Agent accounts require additional profile and business information so Rokswood can manage storefronts, referrals, commissions and payouts.</p>
            <p>Payment details are handled by payment providers. Marketplace pages should only store references, receipts and order metadata.</p>
          </div>
          <Link href="/terms" className="mt-10 inline-flex rounded-full border border-border px-5 py-3 text-sm text-bone hover:text-ivory">Terms</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
