"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FilterBar } from "@/components/marketplace/filter-bar";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";
import { ProductGrid } from "@/components/marketplace/product-grid";
import { stores, type StoreConfig } from "@/data/stores";

const ease = [0.22, 1, 0.36, 1] as const;

export function StoreClient({ store }: { store: StoreConfig }) {
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? store.products : store.products.filter((product) => product.category === active)),
    [active, store],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={store.hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className={`absolute inset-0 bg-gradient-to-br ${store.accent}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          <div className="absolute inset-0 grid-noise opacity-50" />
        </div>

        <div className="container">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-bone/70 hover:text-ivory transition-colors group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Marketplace
            </Link>
          </motion.div>

          <div className="mt-10 grid lg:grid-cols-12 gap-10 items-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }} className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-primary" />
                <span className="text-xs uppercase tracking-[0.4em] text-bone/70">{store.badge}</span>
              </div>
              <h1 className="font-display text-6xl md:text-8xl leading-[0.95] gradient-text text-balance">
                {store.title} <span className="italic font-light">{store.italic}</span>
              </h1>
              <p className="mt-6 max-w-xl text-bone/70 leading-relaxed text-pretty">{store.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }} className="lg:col-span-4 grid grid-cols-3 gap-6">
              {[
                ["Items", store.products.length.toString()],
                ["Categories", (store.categories.length - 1).toString()],
                ["Ships", "Global"],
              ].map(([key, value]) => (
                <div key={key} className="border-l border-border pl-3">
                  <div className="font-display text-2xl text-ivory">{value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{key}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-40 backdrop-blur-xl bg-background/70 border-y border-border/60">
        <div className="container py-4 flex items-center justify-between gap-6">
          <FilterBar categories={store.categories} active={active} onChange={setActive} />
          <div className="hidden md:block text-xs uppercase tracking-[0.3em] text-muted-foreground shrink-0">{filtered.length} results</div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <ProductGrid products={filtered} storeSlug={store.slug} />
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container">
          <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-8">Continue exploring</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.values(stores)
              .filter((item) => item.slug !== store.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/store/${item.slug}`}
                  className="group flex items-center justify-between p-6 rounded-2xl border border-border bg-gradient-card hover:border-primary/40 transition-all duration-500 ease-silk"
                >
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{item.badge}</div>
                    <div className="font-display text-2xl text-ivory mt-2">Rokswood {item.name}</div>
                    <div className="text-sm text-bone/70 mt-1">{item.tagline}</div>
                  </div>
                  <span className="text-bone/60 group-hover:text-ivory group-hover:translate-x-1 transition-all duration-500">→</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
