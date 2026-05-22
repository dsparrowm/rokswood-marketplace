import { Search, Truck } from "lucide-react";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-primary" />
              <span className="text-xs uppercase tracking-[0.4em] text-bone/70">Order Tracking</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] gradient-text text-balance">
              Track by reference, <span className="italic font-light">not account.</span>
            </h1>
            <p className="mt-6 max-w-xl text-bone/70 leading-relaxed">
              Use the order reference from your receipt. Guest checkout stays simple after purchase too.
            </p>
          </div>
          <form action="/order/RW-0429-8742" className="lg:col-span-5 rounded-2xl border border-border bg-gradient-card p-6 shadow-elegant">
            <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Order reference</label>
            <input required placeholder="RW-0429-8742" className="mt-3 h-12 w-full rounded-xl border border-border bg-card px-4 font-mono text-ivory outline-none placeholder:text-bone/40 focus:border-primary/60" />
            <label className="mt-4 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Email or phone</label>
            <input required placeholder="Used at checkout" className="mt-3 h-12 w-full rounded-xl border border-border bg-card px-4 text-ivory outline-none placeholder:text-bone/40 focus:border-primary/60" />
            <button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground">
              <Search className="h-4 w-4" />
              Track order
            </button>
          </form>
        </div>
      </section>
      <section className="py-16">
        <div className="container grid gap-4 md:grid-cols-3">
          {["Confirmed", "Preparing dispatch", "In transit"].map((step, index) => (
            <div key={step} className="rounded-2xl border border-border bg-gradient-card p-6">
              <Truck className="h-5 w-5 text-primary" />
              <div className="mt-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Step {index + 1}</div>
              <h2 className="mt-2 font-display text-2xl text-ivory">{step}</h2>
              <p className="mt-3 text-sm leading-relaxed text-bone/70">Live status appears here once the order reference is verified.</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
