import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-20">
        <div className="container max-w-5xl">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Shipping</div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] gradient-text">Delivery built for hardware.</h1>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["Local dispatch", "Regional delivery for smaller catalog orders and stocked accessories."],
              ["Freight coordination", "Bulk, prefab and industrial items receive confirmed freight windows."],
              ["Documentation", "Receipts, tracking references and shipping updates are sent by email."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-border bg-gradient-card p-6">
                <h2 className="font-display text-2xl text-ivory">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-bone/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
