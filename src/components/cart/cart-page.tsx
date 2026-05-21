"use client";

import Link from "next/link";

import CartStoreGroup from "@/components/cart/cart-store-group";
import CartSummaryCard from "@/components/cart/cart-summary-card";
import CartTrustRow from "@/components/cart/cart-trust-row";
import Footer from "@/components/marketplace/footer";
import Nav from "@/components/marketplace/nav";
import { calculateCartTotals, formatCurrency, groupCartItems } from "@/lib/cart";
import { useCartStore } from "@/store/cart.store";

function EmptyCartState() {
  return (
    <section className="rounded-lg border border-dashed border-[var(--border-strong)] bg-[var(--bg-surface)] p-8 text-center shadow-sm sm:p-12">
      <p className="text-sm font-semibold text-[var(--text-primary)]">Your procurement cart is empty</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-muted)]">
        Add industrial products from any store to build a multi-store procurement order.
      </p>
      <Link
        href="/stores"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-[var(--bg-dark)] px-5 text-sm font-semibold text-[var(--text-on-dark)] transition-colors hover:bg-[var(--text-primary)]"
      >
        Browse Stores
      </Link>
    </section>
  );
}

function BackIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current">
      <path
        d="M9 5 4 10m0 0 5 5M4 10h12"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const groupedItems = groupCartItems(items);
  const totals = calculateCartTotals(items);
  const isEmpty = items.length === 0;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Nav />

      <main className="flex-1">
        <section className="border-b border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-[1360px]">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
                Procurement Cart
              </h1>
              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)] sm:text-base">
                Review your multi-store industrial orders before checkout.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_400px]">
              <div className="space-y-6">
                {isEmpty ? (
                  <EmptyCartState />
                ) : (
                  groupedItems.map((group) => (
                    <CartStoreGroup
                      key={group.storeSlug}
                      group={group}
                      onIncrease={increaseQuantity}
                      onDecrease={decreaseQuantity}
                      onRemove={removeItem}
                    />
                  ))
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href="/stores"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-5 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-colors hover:bg-[var(--bg-base)]"
                  >
                    <BackIcon />
                    Continue Shopping
                  </Link>

                  <button
                    type="button"
                    onClick={clearCart}
                    disabled={isEmpty}
                    className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-50 sm:self-center"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                <CartSummaryCard totals={totals} itemCount={items.length} isEmpty={isEmpty} />
                <CartTrustRow />
              </div>
            </div>

            <div className="mt-8 text-xs text-[var(--text-light)] sm:hidden">
              Cart subtotal: {formatCurrency(totals.subtotal)}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}