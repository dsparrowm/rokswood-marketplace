import { formatCurrency } from "@/lib/cart";
import { cn } from "@/lib/utils";
import type { TrackedOrder, TrackOrderStatusTone } from "@/types/order-tracking";

import TrackOrderTimeline from "@/components/track-order/track-order-timeline";

type TrackOrderResultProps = {
  order: TrackedOrder;
};

const statusToneClassName: Record<TrackOrderStatusTone, string> = {
  info: "bg-[var(--state-info-soft)] text-[var(--accent-payment)]",
  success: "bg-[var(--state-success-soft)] text-[var(--state-success)]",
  warning: "bg-[var(--state-warning-soft)] text-[var(--state-warning-text)]",
};

export default function TrackOrderResult({ order }: TrackOrderResultProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm">
      <div className="bg-[var(--bg-dark)] px-5 py-5 text-[var(--text-on-dark)] sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-light)]">
              Live Tracking
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[var(--text-on-dark)]">
              {order.orderNumber}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-on-dark-muted)]">
              {order.statusNote}
            </p>
          </div>

          <span
            className={cn(
              "inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold",
              statusToneClassName[order.statusTone],
            )}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {order.highlights.map((highlight) => (
            <div
              key={highlight.label}
              className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-3"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-light)]">
                {highlight.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{highlight.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-4 sm:p-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Shipment Snapshot</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{order.lastUpdated}</p>
            </div>
            <p className="text-xs text-[var(--text-muted)]">Tracking Ref {order.reference}</p>
          </div>

          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-[var(--text-light)]">Estimated Delivery</dt>
              <dd className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{order.estimatedDelivery}</dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--text-light)]">Carrier</dt>
              <dd className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{order.carrier}</dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--text-light)]">Destination</dt>
              <dd className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{order.destination}</dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--text-light)]">Order Value</dt>
              <dd className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{formatCurrency(order.totalValue)}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Store Breakdown</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">Items grouped by storefront</p>
            </div>
            <p className="text-xs text-[var(--text-light)]">{order.storeSummaries.length} stores</p>
          </div>

          <ul className="mt-4 space-y-3">
            {order.storeSummaries.map((store) => (
              <li key={store.storeSlug} className="rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: store.accentColor }} />
                      <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{store.storeName}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{store.note}</p>
                  </div>

                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: store.accentColor }}
                  >
                    {store.itemCount} {store.itemCount === 1 ? "item" : "items"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <TrackOrderTimeline steps={order.timeline} />

        <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-4 sm:p-5">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Need help updating delivery details?</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
            Contact enterprise support if access windows, site instructions, or receiving contacts need to change.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${order.supportEmail}`}
              className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--accent-primary)] px-5 text-sm font-semibold text-white"
            >
              Email Support
            </a>
            <a
              href={`tel:${order.supportPhone.replace(/[^+\d]/g, "")}`}
              className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-5 text-sm font-semibold text-[var(--text-primary)]"
            >
              Call Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}