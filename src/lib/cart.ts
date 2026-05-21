import { stores } from "@/lib/data/stores";
import { formatCurrency } from "@/lib/utils";
import type { CartItem, CartStoreGroup, CartSummaryTotals } from "@/types/cart";

const storeAccentColorMap: Record<string, string> = {
  arackteck: "var(--store-arackteck)",
  "rokswood-pulse": "var(--store-pulse)",
  "metals-extras": "var(--store-metals)",
  agrify: "var(--store-agrify)",
  "rokswood-energy": "var(--store-energy)",
  rokswoodefab: "var(--store-efab)",
};

const storeBySlug = new Map(stores.map((store) => [store.slug, store]));

export function getStoreAccentColor(storeSlug: string) {
  return storeAccentColorMap[storeSlug] ?? "var(--border-strong)";
}

export function getCartLineItemCount(items: CartItem[]) {
  return items.length;
}

export function calculateCartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateCartTotals(items: CartItem[]): CartSummaryTotals {
  const subtotal = calculateCartSubtotal(items);
  const estimatedShipping = subtotal > 0 ? 245 : 0;
  const estimatedTax = subtotal > 0 ? subtotal * 0.08 : 0;
  const total = subtotal + estimatedShipping + estimatedTax;
  const exchangeRate = 0.92;

  return {
    subtotal,
    estimatedShipping,
    estimatedTax,
    total,
    exchangeRate,
    euroTotal: total * exchangeRate,
  };
}

export function groupCartItems(items: CartItem[]): CartStoreGroup[] {
  const groupedItems = new Map<string, CartItem[]>();

  items.forEach((item) => {
    const currentItems = groupedItems.get(item.storeSlug) ?? [];
    groupedItems.set(item.storeSlug, [...currentItems, item]);
  });

  return Array.from(groupedItems.entries()).map(([storeSlug, groupedItemsForStore]) => {
    const store = storeBySlug.get(storeSlug);

    return {
      storeSlug,
      storeName: store?.name ?? storeSlug,
      accentTextClassName: store?.accentTextClassName ?? "text-[var(--text-primary)]",
      accentColor: getStoreAccentColor(storeSlug),
      itemCount: groupedItemsForStore.length,
      subtotal: calculateCartSubtotal(groupedItemsForStore),
      items: groupedItemsForStore,
    };
  });
}

export { formatCurrency };