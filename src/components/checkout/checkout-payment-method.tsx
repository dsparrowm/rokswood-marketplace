import { Building2, Landmark, Lock } from "lucide-react";

import { checkoutPaymentMethods } from "@/lib/data/checkout";
import { cn } from "@/lib/utils";
import type { CheckoutFormValues, CheckoutPaymentMethodId } from "@/types/checkout";
import type { UseFormRegister } from "react-hook-form";

type CheckoutPaymentMethodProps = {
  register: UseFormRegister<CheckoutFormValues>;
  selectedMethod: CheckoutPaymentMethodId;
  cardNumberError?: string;
  cardExpiryError?: string;
  cardCvvError?: string;
  payLabel: string;
};

function PaymentMarks({ methodId }: { methodId: CheckoutPaymentMethodId }) {
  if (methodId === "card") {
    return (
      <div className="flex items-center gap-1.5 text-[10px] font-semibold leading-none">
        <span className="rounded bg-[#1D4ED8] px-1.5 py-1 text-white">VISA</span>
        <span className="rounded bg-[#EF4444] px-1.5 py-1 text-white">MC</span>
        <span className="text-[var(--accent-payment)]">stripe</span>
      </div>
    );
  }

  if (methodId === "bank_transfer") {
    return (
      <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-payment)]">
        <Landmark className="h-4 w-4" strokeWidth={1.8} />
        <span>paystack</span>
      </div>
    );
  }

  return <Building2 className="h-5 w-5 text-[var(--text-light)]" strokeWidth={1.8} />;
}

export default function CheckoutPaymentMethod({
  register,
  selectedMethod,
  cardNumberError,
  cardExpiryError,
  cardCvvError,
  payLabel,
}: CheckoutPaymentMethodProps) {
  const showCardFields = selectedMethod === "card";

  return (
    <section className="overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm">
      <div className="border-b border-[var(--border-default)] px-5 py-4">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Payment Method</h2>
      </div>

      <div className="space-y-4 px-5 py-5">
        <div className="space-y-2">
          {checkoutPaymentMethods.map((method) => {
            const isSelected = method.id === selectedMethod;

            return (
              <label
                key={method.id}
                className={cn(
                  "flex cursor-pointer items-center gap-4 rounded-md border px-4 py-3 transition-colors",
                  isSelected
                    ? "border-[var(--accent-payment)] bg-[color-mix(in_srgb,var(--accent-payment)_8%,var(--bg-surface))]"
                    : "border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]",
                )}
              >
                <input
                  {...register("paymentMethod")}
                  type="radio"
                  value={method.id}
                  className="h-4 w-4 shrink-0 accent-[var(--accent-payment)]"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{method.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{method.description}</p>
                </div>

                <span className="ml-auto shrink-0 text-[var(--text-light)]">
                  <PaymentMarks methodId={method.id} />
                </span>
              </label>
            );
          })}
        </div>

        {showCardFields ? (
          <div className="space-y-3 rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] p-4">
            <div className="grid gap-3">
              <label className="block">
                <span className="text-xs text-[var(--text-muted)]">Card Number</span>
                <input
                  {...register("cardNumber")}
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  className="mt-1 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-light)] focus:border-[var(--accent-payment)]"
                />
                {cardNumberError ? <p className="mt-1 text-xs text-[var(--state-error)]">{cardNumberError}</p> : null}
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs text-[var(--text-muted)]">Expiry</span>
                  <input
                    {...register("cardExpiry")}
                    placeholder="12/25"
                    className="mt-1 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-light)] focus:border-[var(--accent-payment)]"
                  />
                  {cardExpiryError ? <p className="mt-1 text-xs text-[var(--state-error)]">{cardExpiryError}</p> : null}
                </label>

                <label className="block">
                  <span className="text-xs text-[var(--text-muted)]">CVV</span>
                  <input
                    {...register("cardCvv")}
                    inputMode="numeric"
                    placeholder="•••"
                    className="mt-1 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-light)] focus:border-[var(--accent-payment)]"
                  />
                  {cardCvvError ? <p className="mt-1 text-xs text-[var(--state-error)]">{cardCvvError}</p> : null}
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-4 text-sm text-[var(--text-muted)]">
            Payment details will be confirmed after the chosen gateway opens.
          </div>
        )}

        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center rounded-md bg-[var(--accent-payment)] px-4 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
        >
          <Lock className="h-4 w-4" strokeWidth={1.8} />
          <span className="ml-2">Pay {payLabel}</span>
        </button>

        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-colors hover:bg-[var(--bg-base)]"
        >
          Request Proforma Invoice
        </button>

      </div>
    </section>
  );
}