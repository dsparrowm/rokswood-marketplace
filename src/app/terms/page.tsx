import Link from "next/link";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Terms</div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] gradient-text">Marketplace terms.</h1>
          <div className="mt-10 space-y-7 text-bone/75 leading-relaxed">
            <p>Rokswood Marketplace lets customers purchase products as guests. Orders are confirmed by payment, receipt email and order reference.</p>
            <p>Product availability, final freight cost and delivery timing may vary by destination, product class and compliance requirements.</p>
            <p>Agent accounts are reserved for approved representatives and are subject to additional program rules, commission terms and identity checks.</p>
          </div>
          <Link href="/privacy" className="mt-10 inline-flex rounded-full border border-border px-5 py-3 text-sm text-bone hover:text-ivory">Privacy policy</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
