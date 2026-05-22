"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { TrackOrderLookupValues } from "@/types/order-tracking";

type TrackOrderLookupFormProps = {
  register: UseFormRegister<TrackOrderLookupValues>;
  errors: FieldErrors<TrackOrderLookupValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onUseDemoOrder: () => void;
  isSubmitting: boolean;
  demoOrderNumber: string;
  demoEmail: string;
  formError?: string;
};

const inputClassName =
  "h-12 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-light)] focus:border-[var(--accent-payment)]";

export default function TrackOrderLookupForm({
  register,
  errors,
  onSubmit,
  onUseDemoOrder,
  isSubmitting,
  demoOrderNumber,
  demoEmail,
  formError,
}: TrackOrderLookupFormProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm">
      <div className="border-b border-[var(--border-default)] px-5 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-payment)]">
          Order Lookup
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-2xl">
          Find your shipment
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
          Enter the order number from your confirmation email and the email address used at checkout.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5 px-5 py-5 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Order Number</span>
            <input
              {...register("orderNumber")}
              type="text"
              autoComplete="off"
              placeholder="RW-20489"
              className={`${inputClassName} mt-2`}
            />
            {errors.orderNumber?.message ? (
              <span className="mt-1 block text-xs text-[var(--state-error)]">{errors.orderNumber.message}</span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Email Address</span>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="ops@enterprise.com"
              className={`${inputClassName} mt-2`}
            />
            {errors.email?.message ? (
              <span className="mt-1 block text-xs text-[var(--state-error)]">{errors.email.message}</span>
            ) : null}
          </label>
        </div>

        {formError ? (
          <div className="rounded-md border border-[color-mix(in_srgb,var(--state-error)_30%,var(--border-default))] bg-[color-mix(in_srgb,var(--state-error)_7%,var(--bg-surface))] px-3 py-2 text-xs font-medium text-[var(--state-error)]">
            {formError}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center rounded-md bg-[var(--bg-dark)] px-5 text-sm font-semibold text-[var(--text-on-dark)] transition-colors hover:bg-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            Track Order
          </button>

          <button
            type="button"
            onClick={onUseDemoOrder}
            className="inline-flex h-12 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] px-4 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-tag)]"
          >
            Use Demo
          </button>
        </div>

        <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-light)]">
                Demo order
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{demoOrderNumber}</p>
              <p className="mt-1 break-all text-xs text-[var(--text-muted)]">{demoEmail}</p>
            </div>
            <p className="max-w-xs text-xs leading-5 text-[var(--text-muted)] sm:text-right">
              Perfect for previewing the tracking layout without needing a live backend.
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}