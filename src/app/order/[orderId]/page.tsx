import { Check, PackageCheck, ReceiptText, Truck } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const steps = [
    ["Order confirmed", "Receipt issued and payment marked for settlement.", Check],
    ["Preparing dispatch", "Rokswood operations is validating stock and packaging.", PackageCheck],
    ["Courier handoff", "Tracking link appears here once the shipment leaves the warehouse.", Truck],
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs uppercase tracking-[0.4em] text-bone/70">Guest Order</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] gradient-text">
            {orderId}
          </h1>
          <p className="mt-6 max-w-xl text-bone/70 leading-relaxed">
            This page is accessible from your receipt link. No shopper account is needed to view order progress.
          </p>
        </div>
      </section>
      <section className="pb-24">
        <div className="container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 rounded-2xl border border-border bg-gradient-card p-6">
            <div className="flex items-center gap-3 border-b border-border pb-5">
              <ReceiptText className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl text-ivory">Order timeline</h2>
            </div>
            <div className="mt-8 space-y-5">
              {steps.map(([title, body, Icon], index) => (
                <div key={title as string} className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Stage {index + 1}</div>
                    <h3 className="mt-1 font-display text-xl text-ivory">{title as string}</h3>
                    <p className="mt-1 text-sm text-bone/70">{body as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4 rounded-2xl border border-border bg-gradient-card p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Need help?</div>
            <p className="mt-4 text-sm leading-relaxed text-bone/70">
              Share this reference with support for shipping changes, invoice requests or delivery questions.
            </p>
            <Link href="/support" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">
              Contact support
            </Link>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
