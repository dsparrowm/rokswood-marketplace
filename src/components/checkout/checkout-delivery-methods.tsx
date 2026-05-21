import { cn } from "@/lib/utils";
import { checkoutDeliveryMethods } from "@/lib/data/checkout";
import type { CheckoutDeliveryMethodId, CheckoutFormValues } from "@/types/checkout";
import type { FieldError, UseFormRegister } from "react-hook-form";

type CheckoutDeliveryMethodsProps = {
  register: UseFormRegister<CheckoutFormValues>;
  selectedMethod: CheckoutDeliveryMethodId;
  error?: FieldError;
};

function DeliveryIcon({ methodId }: { methodId: CheckoutDeliveryMethodId }) {
  if (methodId === "express") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current">
        <path d="M3 15h8l5-8h4l-4 8h1l-2 4H8l1-4H4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (methodId === "enterprise") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current">
        <path d="M4 19V9h16v10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="M7 9V5h10v4M9 19v-6h6v6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current">
      <path d="M3 16h12l4-4H8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M5 16v-5h8l2 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="16" cy="18" r="1.5" />
    </svg>
  );
}

export default function CheckoutDeliveryMethods({ register, selectedMethod, error }: CheckoutDeliveryMethodsProps) {
  return (
    <div>
      <div className="grid gap-3 lg:grid-cols-3">
        {checkoutDeliveryMethods.map((method) => {
          const isSelected = method.id === selectedMethod;

          return (
            <label
              key={method.id}
              className={cn(
                "flex cursor-pointer flex-col rounded-md border p-4 transition-colors",
                isSelected
                  ? "border-[var(--accent-payment)] bg-[color-mix(in_srgb,var(--accent-payment)_8%,var(--bg-surface))]"
                  : "border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]",
              )}
            >
              <input
                {...register("deliveryMethod")}
                type="radio"
                value={method.id}
                className="sr-only"
              />

              <div className="flex items-start justify-between gap-3">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", isSelected ? "bg-[var(--accent-payment)] text-white" : "bg-[var(--bg-base)] text-[var(--text-light)]")}>
                  <DeliveryIcon methodId={method.id} />
                </div>

                <p className="text-sm font-semibold text-[var(--text-primary)]">{method.priceLabel}</p>
              </div>

              <div className="mt-3 space-y-1">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{method.title}</h3>
                <p className="text-xs text-[var(--text-muted)]">{method.description}</p>
                <p className="text-xs font-medium text-[var(--state-success)]">{method.availability}</p>
                <p className="text-xs text-[var(--text-muted)]">{method.note}</p>
              </div>
            </label>
          );
        })}
      </div>

      {error ? <p className="mt-2 text-xs text-[var(--state-error)]">{error.message}</p> : null}
    </div>
  );
}