"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/cart-context";

const ease = [0.22, 1, 0.36, 1] as const;

const fmt = (value: number) =>
  value >= 1000 ? `₦${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : `₦${value.toFixed(0)}`;

export function CartDrawer() {
  const { open, setOpen, items, subtotal, setQty, remove, count } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease }}
            className="fixed top-0 right-0 z-[61] h-full w-full sm:w-[440px] bg-background border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-border">
              <div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Cart</div>
                <div className="font-display text-xl text-ivory">
                  {count} {count === 1 ? "item" : "items"}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="p-2.5 rounded-full hover:bg-ash text-bone hover:text-ivory transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center gap-4 py-20"
                >
                  <div className="h-16 w-16 rounded-full bg-ash grid place-items-center text-bone">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="font-display text-2xl text-ivory">Your cart is empty</div>
                  <p className="text-sm text-bone/70 max-w-xs">Browse the stores and add precision-built hardware to your cart.</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-2 text-xs uppercase tracking-[0.3em] text-primary hover:text-ivory transition-colors"
                  >
                    Continue shopping →
                  </button>
                </motion.div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, transition: { duration: 0.3 } }}
                        transition={{ duration: 0.4, ease }}
                        className="flex gap-4 p-3 rounded-2xl border border-border bg-gradient-card"
                      >
                        <Link
                          href={`/store/${item.storeSlug}/product/${item.id}`}
                          onClick={() => setOpen(false)}
                          className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0"
                        >
                          <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                        </Link>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/store/${item.storeSlug}/product/${item.id}`}
                              onClick={() => setOpen(false)}
                              className="font-display text-sm text-ivory leading-snug line-clamp-2 hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => remove(item.id)}
                              className="text-bone/50 hover:text-primary transition-colors shrink-0"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">{item.category}</div>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center rounded-full border border-border">
                              <button onClick={() => setQty(item.id, item.qty - 1)} className="h-7 w-7 grid place-items-center text-bone hover:text-ivory" aria-label="Decrease quantity">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs text-ivory">{item.qty}</span>
                              <button onClick={() => setQty(item.id, item.qty + 1)} className="h-7 w-7 grid place-items-center text-bone hover:text-ivory" aria-label="Increase quantity">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-sm text-ivory font-medium">{item.price}</div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Subtotal</span>
                  <span className="font-display text-2xl text-ivory">{fmt(subtotal)}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">Shipping and taxes calculated at checkout.</div>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center h-12 leading-[3rem] rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.3em] hover:opacity-90 transition-opacity"
                >
                  View cart and checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
