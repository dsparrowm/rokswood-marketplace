import Link from "next/link";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";
import { storeList } from "@/data/stores";
import { allCategories, allProducts, getProductHref, slugify } from "@/lib/marketplace";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; store?: string; category?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().toLowerCase();
  const store = params.store ?? "all";
  const category = params.category ?? "all";
  const products = allProducts.filter((product) => {
    const matchesQuery = query
      ? `${product.name} ${product.category} ${product.storeName}`.toLowerCase().includes(query)
      : true;
    const matchesStore = store === "all" ? true : product.storeSlug === store;
    const matchesCategory = category === "all" ? true : slugify(product.category) === category;
    return matchesQuery && matchesStore && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-14 border-b border-border bg-gradient-hero">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs uppercase tracking-[0.4em] text-bone/70">Global Catalog</span>
          </div>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="font-display text-5xl md:text-7xl leading-[0.95] gradient-text text-balance">
                Search every <span className="italic font-light">Rokswood product.</span>
              </h1>
              <p className="mt-6 max-w-xl text-bone/70 leading-relaxed text-pretty">
                Browse Aracktech, Pulse, Metal Extras and Agrify from one catalog. No account required to shop.
              </p>
            </div>
            <form action="/products" className="lg:col-span-5 rounded-2xl border border-border bg-gradient-card p-4">
              <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Search catalog</label>
              <input
                name="q"
                defaultValue={params.q}
                placeholder="Meters, gateways, prefab homes..."
                className="mt-3 h-12 w-full rounded-xl border border-border bg-card px-4 text-ivory outline-none transition-all placeholder:text-bone/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
              <div className="mt-3 grid grid-cols-2 gap-3">
                <select name="store" defaultValue={store} className="h-11 rounded-xl border border-border bg-card px-3 text-sm text-ivory outline-none">
                  <option value="all">All stores</option>
                  {storeList.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select name="category" defaultValue={category} className="h-11 rounded-xl border border-border bg-card px-3 text-sm text-ivory outline-none">
                  <option value="all">All categories</option>
                  {allCategories.map((item) => (
                    <option key={item} value={slugify(item)}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <button className="mt-4 h-11 w-full rounded-full bg-primary text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground">
                Find products
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{products.length} results</div>
            <Link href="/category/smart-meters" className="text-xs uppercase tracking-[0.3em] text-bone/70 hover:text-ivory">
              Browse categories →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link key={`${product.storeSlug}-${product.id}`} href={getProductHref(product)} className="group rounded-2xl border border-border bg-gradient-card overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-silk group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/5" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur">
                    {product.storeName}
                  </span>
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{product.category}</div>
                  <h2 className="mt-2 font-display text-xl leading-tight text-ivory">{product.name}</h2>
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
