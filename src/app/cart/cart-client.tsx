"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";
import { useCart } from "@/context/cart-context";

const ease = [0.22, 1, 0.36, 1] as const;
const fmt = (value: number) => `₦${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export function CartClient() {
  const { items, subtotal, setQty, remove, clear, count } = useCart();
  const shipping = items.length ? 4500 : 0;
  const tax = Math.round(subtotal * 0.075);
  const total = subtotal + shipping + tax;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-12">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-primary" />
              <span className="text-xs uppercase tracking-[0.4em] text-bone">Your Cart</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] gradient-text text-balance">
              {count > 0 ? "Almost yours." : "Nothing yet."}
            </h1>
            <p className="mt-6 max-w-xl text-bone/80 leading-relaxed text-pretty">
              {count > 0
                ? "Review your items, fine-tune quantities, and proceed to a frictionless checkout. Ships globally."
                : "Browse the three Rokswood stores and add precision-built hardware to your cart."}
            </p>
          </motion.div>
        </div>
      </section>

      {items.length === 0 ? (
        <section className="py-20">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }} className="rounded-3xl border border-border bg-gradient-card p-16 text-center">
              <div className="inline-flex h-16 w-16 rounded-full bg-ash items-center justify-center text-bone mb-6">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h2 className="font-display text-3xl text-ivory">Your cart is empty</h2>
              <p className="mt-3 text-bone/70 max-w-md mx-auto">Discover meters, sensors and prefab structures engineered with precision.</p>
              <Link href="/" className="mt-8 inline-flex items-center gap-3 bg-primary text-primary-foreground rounded-full pl-7 pr-2 py-2 text-sm hover:opacity-90 transition-opacity">
                Explore the marketplace
                <span className="flex items-center justify-center h-9 w-9 rounded-full bg-ink/30 text-ivory">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="pb-24">
          <div className="container grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {count} {count === 1 ? "item" : "items"}
                </div>
                <button onClick={clear} className="text-[11px] uppercase tracking-[0.3em] text-bone hover:text-primary transition-colors">
                  Clear cart
                </button>
              </div>

              <ul className="space-y-3">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.li key={item.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.4, ease }} className="flex gap-5 p-4 rounded-2xl border border-border bg-gradient-card">
                      <Link href={`/store/${item.storeSlug}/product/${item.id}`} className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Rokswood {item.storeSlug}</div>
                            <Link href={`/store/${item.storeSlug}/product/${item.id}`} className="font-display text-lg sm:text-xl text-ivory leading-snug hover:text-primary transition-colors block mt-1">
                              {item.name}
                            </Link>
                            <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-1">{item.category}</div>
                          </div>
                          <button onClick={() => remove(item.id)} className="text-bone hover:text-primary transition-colors p-1.5" aria-label={`Remove ${item.name}`}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center rounded-full border border-border">
                            <button onClick={() => setQty(item.id, item.qty - 1)} className="h-9 w-9 grid place-items-center text-bone hover:text-ivory hover:bg-ash transition-colors" aria-label="Decrease">
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm text-ivory">{item.qty}</span>
                            <button onClick={() => setQty(item.id, item.qty + 1)} className="h-9 w-9 grid place-items-center text-bone hover:text-ivory hover:bg-ash transition-colors" aria-label="Increase">
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="font-display text-lg text-ivory">{item.price}</div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }} className="lg:sticky lg:top-28 rounded-3xl border border-border bg-gradient-card p-7 shadow-elegant">
                <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Order summary</div>
                <h3 className="font-display text-3xl text-ivory mt-2">Checkout</h3>
                <dl className="mt-8 space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="text-bone">Subtotal</dt><dd className="text-ivory">{fmt(subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-bone">Shipping</dt><dd className="text-ivory">{fmt(shipping)}</dd></div>
                  <div className="flex justify-between"><dt className="text-bone">VAT (7.5%)</dt><dd className="text-ivory">{fmt(tax)}</dd></div>
                </dl>
                <div className="mt-6 pt-6 border-t border-border flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Total</span>
                  <span className="font-display text-3xl text-ivory">{fmt(total)}</span>
                </div>
                <Link
                  href="/checkout"
                  className="mt-8 w-full h-12 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.3em] hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Proceed to checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-border flex items-start gap-2">
                    <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="text-[10px] uppercase tracking-[0.2em] text-bone leading-tight">Global shipping</div>
                  </div>
                  <div className="p-3 rounded-xl border border-border flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="text-[10px] uppercase tracking-[0.2em] text-bone leading-tight">Secure checkout</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
