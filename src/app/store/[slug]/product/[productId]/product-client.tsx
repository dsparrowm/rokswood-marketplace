"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Minus, Plus, RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";
import { useCart } from "@/context/cart-context";
import type { Product, StoreConfig } from "@/data/stores";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const specsFor = (storeSlug: string) => {
  const base = [
    ["Warranty", "24 months"],
    ["Certification", "ISO 9001 · CE"],
    ["Lead time", "5-9 business days"],
  ];
  if (storeSlug === "aracktech") {
    return [
      ["Class", "Class 1 accuracy"],
      ["Voltage", "230V / 400V AC"],
      ["Comms", "RF · GPRS · NB-IoT"],
      ["Enclosure", "IP54 polycarbonate"],
      ...base,
    ];
  }
  if (storeSlug === "pulse") {
    return [
      ["Protocol", "MQTT · Modbus · LoRaWAN"],
      ["Power", "12-24V DC / Battery"],
      ["Range", "Up to 10 km LoS"],
      ["Operating temp", "-20C to 70C"],
      ...base,
    ];
  }
  if (storeSlug === "agrify") {
    return [
      ["Power", "Solar / 12-24V DC"],
      ["Connectivity", "LoRaWAN · 4G · Bluetooth"],
      ["Ingress", "IP65 field enclosure"],
      ["Operating temp", "-10C to 60C"],
      ...base,
    ];
  }
  return [
    ["Material", "Galvanized steel · Composite"],
    ["Load class", "Engineered to spec"],
    ["Insulation", "U-value 0.18 W/m2K"],
    ["Assembly", "Bolt-together modular"],
    ...base,
  ];
};

export function ProductClient({ store, product }: { store: StoreConfig; product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const gallery = useMemo(() => [product.image, store.hero, product.image, store.hero], [product, store]);
  const specs = specsFor(store.slug);
  const related = store.products.filter((item) => item.id !== product.id).slice(0, 3);

  const onAdd = () => {
    add(product, store.slug, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-28 pb-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            <Link href="/" className="hover:text-ivory transition-colors">Marketplace</Link>
            <span>/</span>
            <Link href={`/store/${store.slug}`} className="hover:text-ivory transition-colors">{store.name}</Link>
            <span>/</span>
            <span className="text-bone/80 truncate">{product.category}</span>
          </motion.div>

          <Link href={`/store/${store.slug}`} className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-bone/70 hover:text-ivory transition-colors group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to {store.name}
          </Link>
        </div>
      </section>

      <section className="pb-20">
        <div className="container grid lg:grid-cols-12 gap-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="lg:col-span-7">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-gradient-card shadow-elegant">
              <div className={`absolute inset-0 bg-gradient-to-br ${store.accent} opacity-60`} />
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={gallery[activeImg]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-black/5" />
              {product.tag && (
                <span className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground backdrop-blur">
                  {product.tag}
                </span>
              )}
              <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/82">
                <Sparkles className="w-3 h-3" />
                Rokswood Verified
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((image, i) => (
                <button
                  key={`${image}-${i}`}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "relative aspect-square rounded-xl overflow-hidden border transition-all duration-500 ease-silk",
                    activeImg === i ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-bone/40",
                  )}
                  aria-label={`Show product image ${i + 1}`}
                >
                  <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }} className="lg:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.4em] text-primary">{store.badge}</div>
            <h1 className="mt-3 font-display text-4xl md:text-5xl leading-[1.05] gradient-text text-balance">{product.name}</h1>
            <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{product.category}</div>
            <div className="mt-6 flex items-end gap-4">
              <div className="font-display text-4xl text-ivory">{product.price}</div>
              <div className="text-xs text-muted-foreground pb-2">incl. taxes · ships globally</div>
            </div>
            <p className="mt-6 text-bone/75 leading-relaxed text-pretty">
              {product.name} is engineered by Rokswood {store.name} for industrial-grade reliability.
              Precision-built, field-tested, and supported by a global network of certified agents.
            </p>

            <div className="mt-8 flex items-stretch gap-3">
              <div className="flex items-center rounded-full border border-border bg-card overflow-hidden">
                <button onClick={() => setQty((current) => Math.max(1, current - 1))} className="h-12 w-12 grid place-items-center text-bone/70 hover:text-ivory hover:bg-ash transition-colors" aria-label="Decrease quantity">
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-10 text-center font-display text-lg text-ivory">{qty}</div>
                <button onClick={() => setQty((current) => current + 1)} className="h-12 w-12 grid place-items-center text-bone/70 hover:text-ivory hover:bg-ash transition-colors" aria-label="Increase quantity">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <motion.button whileTap={{ scale: 0.97 }} onClick={onAdd} className="relative flex-1 h-12 rounded-full bg-primary text-primary-foreground font-medium overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="ok" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} className="relative flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" /> Added to cart
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} className="relative flex items-center justify-center gap-2 tracking-wide uppercase text-xs">
                      Add to cart · {qty}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Global shipping" },
                { icon: ShieldCheck, label: "2-yr warranty" },
                { icon: RotateCcw, label: "30-day returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-start gap-2 p-4 rounded-2xl border border-border bg-gradient-card">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-bone/80 leading-tight">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">Specifications</div>
              <dl className="divide-y divide-border border-y border-border">
                {specs.map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3.5">
                    <dt className="text-sm text-bone/70">{key}</dt>
                    <dd className="text-sm text-ivory font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-border">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">More from</div>
              <h2 className="font-display text-3xl text-ivory mt-2">Rokswood {store.name}</h2>
            </div>
            <Link href={`/store/${store.slug}`} className="text-xs uppercase tracking-[0.3em] text-bone/70 hover:text-ivory transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease, delay: i * 0.05 }}>
                <Link href={`/store/${store.slug}/product/${item.id}`} className="group block rounded-3xl border border-border bg-gradient-card overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/5" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-ivory leading-tight truncate">{item.name}</h3>
                    <div className="text-sm text-bone/70 mt-1">{item.price}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
