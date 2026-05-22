import { Headphones, PackageOpen, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";

const topics = [
  ["Order support", "Track references, receipts, invoice corrections and delivery changes.", PackageOpen],
  ["Shipping", "Global freight, local dispatch windows and delivery documentation.", Truck],
  ["Warranty", "Coverage, product verification and certified service channels.", ShieldCheck],
  ["Procurement", "Bulk quotes, technical questions and project supply coordination.", Headphones],
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs uppercase tracking-[0.4em] text-bone/70">Support Center</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] gradient-text text-balance">
            Help for orders, <span className="italic font-light">shipping and specs.</span>
          </h1>
          <p className="mt-6 max-w-xl text-bone/70 leading-relaxed">
            Get marketplace help without creating an account. Use your order reference when you have one.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {topics.map(([title, body, Icon]) => (
            <div key={title as string} className="rounded-2xl border border-border bg-gradient-card p-6">
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="mt-5 font-display text-2xl text-ivory">{title as string}</h2>
              <p className="mt-3 text-sm leading-relaxed text-bone/70">{body as string}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="pb-24">
        <div className="container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-2xl border border-border bg-gradient-card p-7">
            <h2 className="font-display text-3xl text-ivory">Common questions</h2>
            <div className="mt-6 divide-y divide-border">
              {[
                ["Do shoppers need accounts?", "No. Customers can browse, pay and track orders with a reference code."],
                ["Can I request a bulk quote?", "Yes. Use the contact page for procurement support and technical packaging."],
                ["Which payment gateways are planned?", "Paystack for Nigeria and Stripe for international cards."],
              ].map(([q, a]) => (
                <div key={q} className="py-5">
                  <h3 className="font-display text-xl text-ivory">{q}</h3>
                  <p className="mt-2 text-sm text-bone/70">{a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 rounded-2xl border border-border bg-gradient-card p-7">
            <h2 className="font-display text-3xl text-ivory">Talk to Rokswood</h2>
            <p className="mt-4 text-sm leading-relaxed text-bone/70">
              Send order references, project specs, delivery requirements or warranty questions.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">Contact support</Link>
              <Link href="/track-order" className="rounded-full border border-border px-5 py-3 text-sm text-bone hover:text-ivory">Track order</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
