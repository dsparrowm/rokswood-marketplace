type ExchangeRateWidgetProps = {
  usdTotal: number;
  euroTotal: number;
  rate: number;
};

const trendBars = [28, 44, 34, 56, 40, 62, 50] as const;

export default function ExchangeRateWidget({ usdTotal, euroTotal, rate }: ExchangeRateWidgetProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm">
      <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Exchange Rate Trend</h2>
          <p className="mt-1 text-xs text-[var(--text-light)]">USD/EUR</p>
        </div>
        <p className="text-xs font-medium text-[var(--text-muted)]">1 USD = {rate.toFixed(2)} EUR</p>
      </div>

      <div className="space-y-4 p-5">
        <div className="grid grid-cols-7 items-end gap-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-4">
          {trendBars.map((height, index) => (
            <span
              key={index}
              className="block rounded-full bg-[var(--accent-payment)]/80"
              style={{ height: `${height}px` }}
            />
          ))}
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] p-3">
            <p className="text-xs text-[var(--text-light)]">USD Total</p>
            <p className="mt-1 font-semibold text-[var(--text-primary)]">${usdTotal.toFixed(2)}</p>
          </div>
          <div className="rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] p-3">
            <p className="text-xs text-[var(--text-light)]">EUR Estimate</p>
            <p className="mt-1 font-semibold text-[var(--text-primary)]">€{euroTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}