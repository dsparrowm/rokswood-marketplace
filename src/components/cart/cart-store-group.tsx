import CartLineItem from "@/components/cart/cart-line-item";
import { formatCurrency } from "@/lib/cart";
import type { CartStoreGroup } from "@/types/cart";

type CartStoreGroupProps = {
  group: CartStoreGroup;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
};

export default function CartStoreGroup({ group, onIncrease, onDecrease, onRemove }: CartStoreGroupProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm">
      <header className="flex items-center justify-between gap-4 border-b border-[var(--border-default)] px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: group.accentColor }} />
          <h2 className={`truncate text-base font-semibold ${group.accentTextClassName}`}>
            {group.storeName}
          </h2>
          <span className="shrink-0 rounded-full border border-[var(--border-default)] bg-[var(--bg-base)] px-2 py-0.5 text-xs font-medium text-[var(--text-muted)]">
            {group.itemCount} items
          </span>
        </div>

        <p className="text-sm font-semibold text-[var(--text-primary)]">{formatCurrency(group.subtotal)}</p>
      </header>

      <div className="hidden border-b border-[var(--border-default)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-light)] md:grid md:grid-cols-[minmax(0,1fr)_160px_120px_120px] md:gap-6 sm:px-5">
        <span>Product</span>
        <span className="text-center">Quantity</span>
        <span className="text-right">Unit Price</span>
        <span className="text-right">Total</span>
      </div>

      <div className="divide-y divide-[var(--border-default)] px-4 sm:px-5">
        {group.items.map((item) => (
          <CartLineItem
            key={item.id}
            item={item}
            onIncrease={() => onIncrease(item.productId)}
            onDecrease={() => onDecrease(item.productId)}
            onRemove={() => onRemove(item.productId)}
          />
        ))}
      </div>
    </section>
  );
}