"use client";

import { ArrowRight, LockKeyhole, Mail, MapPin, Truck } from "lucide-react";
import Link from "next/link";
import { FormEvent } from "react";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";
import { useCart } from "@/context/cart-context";

const fmt = (value: number) => `₦${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export function CheckoutClient() {
  const { items, subtotal, count, clear } = useCart();
  const shipping = items.length ? 4500 : 0;
  const tax = Math.round(subtotal * 0.075);
  const total = subtotal + shipping + tax;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clear();
    window.location.href = "/checkout/success?ref=RW-0429-8742";
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-12 border-b border-border bg-gradient-hero">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs uppercase tracking-[0.4em] text-bone/70">Guest Checkout</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] gradient-text text-balance">
            Buy without creating <span className="italic font-light">an account.</span>
          </h1>
          <p className="mt-6 max-w-xl text-bone/70 leading-relaxed">
            We only ask for the details required to deliver your order and send your tracking reference.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-12">
          <form onSubmit={onSubmit} className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl border border-border bg-gradient-card p-6">
              <div className="mb-5 flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <h2 className="font-display text-2xl text-ivory">Contact</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Full name" autoComplete="name" className="h-12 rounded-xl border border-border bg-card px-4 text-ivory outline-none placeholder:text-bone/40 focus:border-primary/60" />
                <input required type="email" placeholder="Email for receipt" autoComplete="email" className="h-12 rounded-xl border border-border bg-card px-4 text-ivory outline-none placeholder:text-bone/40 focus:border-primary/60" />
                <input required placeholder="Phone number" autoComplete="tel" className="h-12 rounded-xl border border-border bg-card px-4 text-ivory outline-none placeholder:text-bone/40 focus:border-primary/60 sm:col-span-2" />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-gradient-card p-6">
              <div className="mb-5 flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <h2 className="font-display text-2xl text-ivory">Delivery</h2>
              </div>
              <div className="grid gap-4">
                <input required placeholder="Street address" autoComplete="shipping street-address" className="h-12 rounded-xl border border-border bg-card px-4 text-ivory outline-none placeholder:text-bone/40 focus:border-primary/60" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <input required placeholder="City" autoComplete="shipping address-level2" className="h-12 rounded-xl border border-border bg-card px-4 text-ivory outline-none placeholder:text-bone/40 focus:border-primary/60" />
                  <input required placeholder="State / Province" autoComplete="shipping address-level1" className="h-12 rounded-xl border border-border bg-card px-4 text-ivory outline-none placeholder:text-bone/40 focus:border-primary/60" />
                  <input required placeholder="Country" autoComplete="shipping country-name" className="h-12 rounded-xl border border-border bg-card px-4 text-ivory outline-none placeholder:text-bone/40 focus:border-primary/60" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-gradient-card p-6">
              <div className="mb-5 flex items-center gap-3">
                <LockKeyhole className="h-4 w-4 text-primary" />
                <h2 className="font-display text-2xl text-ivory">Payment</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="rounded-xl border border-primary/50 bg-primary/10 p-4 text-sm text-ivory">
                  <input type="radio" name="payment" defaultChecked className="mr-2 accent-primary" />
                  Paystack card or transfer
                </label>
                <label className="rounded-xl border border-border bg-card p-4 text-sm text-bone">
                  <input type="radio" name="payment" className="mr-2 accent-primary" />
                  Stripe international card
                </label>
              </div>
            </div>

            <button disabled={!items.length} className="h-12 w-full rounded-full bg-primary text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40">
              Place guest order
            </button>
          </form>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-border bg-gradient-card p-6 shadow-elegant">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Order summary</div>
              <h2 className="mt-2 font-display text-3xl text-ivory">{count || "No"} items</h2>
              {items.length ? (
                <ul className="mt-6 space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <img src={item.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm text-ivory">{item.name}</div>
                        <div className="text-xs text-bone/60">Qty {item.qty}</div>
                      </div>
                      <div className="text-sm text-bone">{item.price}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <Link href="/products" className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
                  Browse products <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                <div className="flex justify-between"><dt className="text-bone">Subtotal</dt><dd className="text-ivory">{fmt(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-bone">Shipping</dt><dd className="text-ivory">{fmt(shipping)}</dd></div>
                <div className="flex justify-between"><dt className="text-bone">VAT</dt><dd className="text-ivory">{fmt(tax)}</dd></div>
                <div className="flex justify-between border-t border-border pt-4 text-lg"><dt className="text-bone">Total</dt><dd className="font-display text-ivory">{fmt(total)}</dd></div>
              </dl>
              <div className="mt-6 flex items-start gap-2 rounded-xl border border-border p-3 text-[11px] uppercase tracking-[0.18em] text-bone/70">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Tracking code sent immediately after payment.
              </div>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
