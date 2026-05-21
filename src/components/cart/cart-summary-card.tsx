import Link from "next/link";

import { formatCurrency } from "@/lib/cart";
import type { CartSummaryTotals } from "@/types/cart";

type CartSummaryCardProps = {
  totals: CartSummaryTotals;
  itemCount: number;
  isEmpty: boolean;
};

export default function CartSummaryCard({ totals, itemCount, isEmpty }: CartSummaryCardProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm">
      <div className="border-b border-[var(--border-default)] px-5 py-5">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Order Summary</h2>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          {itemCount} {itemCount === 1 ? "item" : "items"} across a single procurement order
        </p>
      </div>

      <div className="space-y-4 px-5 py-5">
        <div className="flex items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
          <span>Subtotal</span>
          <span className="font-medium text-[var(--text-primary)]">{formatCurrency(totals.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
          <span>Estimated Shipping</span>
          <span className="font-medium text-[var(--text-primary)]">
            {isEmpty ? formatCurrency(0) : formatCurrency(totals.estimatedShipping)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
          <span>Estimated Tax</span>
          <span className="font-medium text-[var(--text-primary)]">
            {isEmpty ? formatCurrency(0) : formatCurrency(totals.estimatedTax)}
          </span>
        </div>

        <div className="border-t border-[var(--border-default)] pt-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)]">Estimated Total</p>
              <p className="text-[11px] text-[var(--text-light)]">USD · Multi-store order</p>
            </div>
            <p className="text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              {formatCurrency(isEmpty ? 0 : totals.total)}
            </p>
          </div>
        </div>

        <Link
          href="/checkout"
          aria-disabled={isEmpty}
          className={`inline-flex h-12 w-full items-center justify-center rounded-md bg-[var(--accent-primary)] px-4 text-sm font-semibold text-white transition-colors ${
            isEmpty ? "pointer-events-none opacity-60" : "hover:opacity-95"
          }`}
        >
          Proceed to Checkout
        </Link>

        <p className="text-center text-xs text-[var(--text-light)]">
          Enterprise checkout supports multi-store procurement, tax review, and invoice-ready orders.
        </p>
      </div>
    </section>
  );
}