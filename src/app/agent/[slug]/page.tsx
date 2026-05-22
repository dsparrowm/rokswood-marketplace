import Link from "next/link";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";
import { featuredAgentProducts, getProductHref } from "@/lib/marketplace";

export default async function AgentStorefrontPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agentName = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Certified Agent Storefront</div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] gradient-text">
            {agentName}
          </h1>
          <p className="mt-6 max-w-xl text-bone/70 leading-relaxed">
            Shop Rokswood products through this agent storefront. Checkout remains guest-first, with referral attribution handled in the background.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container">
          <div className="mb-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">Featured picks</div>
          <div className="grid gap-5 md:grid-cols-3">
            {featuredAgentProducts.map((product) => (
              <Link key={product.id} href={`${getProductHref(product)}?agent=${slug}`} className="group rounded-2xl border border-border bg-gradient-card overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-silk group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/5" />
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Rokswood {product.storeName}</div>
                  <h2 className="mt-2 font-display text-xl text-ivory">{product.name}</h2>
                  <div className="mt-3 text-sm text-bone/70">{product.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
