import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Warranty</div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] gradient-text">Verified product coverage.</h1>
          <div className="mt-10 space-y-7 text-bone/75 leading-relaxed">
            <p>Most listed Rokswood products include warranty coverage shown on the product page. Coverage starts from confirmed delivery or commissioning date where applicable.</p>
            <p>Warranty claims require order reference, product serial or batch number, installation context and issue description.</p>
            <p>Certified agents may help coordinate verification, replacement parts and service escalation for local customers.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
