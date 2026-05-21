import Image from "next/image";

import { formatCurrency } from "@/lib/cart";
import { cn } from "@/lib/utils";
import type { CartStoreGroup } from "@/types/cart";
import type { CheckoutTotals } from "@/types/checkout";

type CheckoutOrderSummaryProps = {
  groups: CartStoreGroup[];
  totals: CheckoutTotals;
  isEmpty: boolean;
};

function StoreBadge({ label, accentColor }: { label: string; accentColor: string }) {
  return (
    <span
      className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
      style={{ backgroundColor: accentColor }}
    >
      {label}
    </span>
  );
}

function SummaryItem({
  item,
}: {
  item: CartStoreGroup["items"][number];
}) {
  return (
    <div className="flex items-start gap-3 border-t border-[var(--border-default)] py-3 first:border-t-0 first:pt-0 last:pb-0">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-[var(--border-default)] bg-[var(--bg-base)]">
        <Image src={item.image} alt={item.imageAlt} fill sizes="40px" className="object-contain p-1.5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{item.name}</p>
          <p className="shrink-0 text-sm font-semibold text-[var(--text-primary)]">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
        <p className="mt-1 text-[11px] text-[var(--text-muted)]">SKU {item.sku} · Qty {item.quantity}</p>
      </div>
    </div>
  );
}

export default function CheckoutOrderSummary({ groups, totals, isEmpty }: CheckoutOrderSummaryProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm">
      <div className="bg-[var(--bg-dark)] px-5 py-4 text-[var(--text-on-dark)]">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <p className="mt-1 text-xs text-[var(--text-on-dark-muted)]">Multi-store procurement breakdown</p>
      </div>

      <div className="space-y-5 px-5 py-5">
        {isEmpty ? (
          <div className="rounded-md border border-dashed border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-6 text-center">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Your cart is empty</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Add products before you can complete checkout.</p>
          </div>
        ) : (
          groups.map((group) => (
            <section key={group.storeSlug} className="rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] p-3">
              <div className="flex items-start justify-between gap-3">
                <StoreBadge label={group.storeName} accentColor={group.accentColor} />
                <p className="text-sm font-semibold text-[var(--text-primary)]">{formatCurrency(group.subtotal)}</p>
              </div>

              <div className="mt-3 divide-y divide-[var(--border-default)]">
                {group.items.map((item) => (
                    <SummaryItem key={item.id} item={item} />
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[var(--border-default)] pt-3 text-sm">
                <span className="text-[var(--text-muted)]">Store Subtotal</span>
                <span className="font-semibold text-[var(--text-primary)]">{formatCurrency(group.subtotal)}</span>
              </div>
            </section>
          ))
        )}

        <div className={cn("space-y-3 border-t border-[var(--border-default)] pt-5", isEmpty && "opacity-60") }>
          <div className="flex items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
            <span>Global Subtotal</span>
            <span className="font-medium text-[var(--text-primary)]">{formatCurrency(totals.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
            <span>Shipping ({totals.shippingLabel})</span>
            <span className="font-medium text-[var(--text-primary)]">
              {totals.shipping > 0 ? formatCurrency(totals.shipping) : "Custom"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
            <span>Taxes ({totals.taxRateLabel})</span>
            <span className="font-medium text-[var(--text-primary)]">{formatCurrency(totals.tax)}</span>
          </div>

          <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">Grand Total</p>
                <p className="mt-2 flex items-center gap-2 text-[11px] text-[var(--text-light)]">
                  <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-[var(--accent-payment)]" />
                  <span>Live conversion</span>
                  <span>{formatCurrency(totals.euroTotal, { currency: "EUR" })}</span>
                </p>
              </div>
              <p className="text-[26px] font-bold tracking-[-0.04em] text-[var(--accent-payment)] sm:text-[28px]">
                {formatCurrency(totals.total)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}