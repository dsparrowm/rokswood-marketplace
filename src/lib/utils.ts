export function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function formatCurrency(value: number, options?: { currency?: "USD" | "EUR" }) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: options?.currency ?? "USD",
    maximumFractionDigits: 2,
  }).format(value);
}