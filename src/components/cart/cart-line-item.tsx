import Image from "next/image";

import QuantityStepper from "@/components/cart/quantity-stepper";
import { formatCurrency } from "@/lib/cart";
import type { CartItem } from "@/types/cart";

type CartLineItemProps = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

function RemoveIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 stroke-current">
      <path
        d="M7 4.5h6m-7 2h8l-.7 8.2a1.5 1.5 0 0 1-1.5 1.3H8.2a1.5 1.5 0 0 1-1.5-1.3L6 6.5Zm2 0V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5M8.5 9v4.5M11.5 9v4.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function CartLineItem({ item, onIncrease, onDecrease, onRemove }: CartLineItemProps) {
  return (
    <article className="grid gap-4 py-5 md:grid-cols-[minmax(0,1fr)_160px_120px_120px] md:items-center md:gap-6">
      <div className="flex min-w-0 gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] sm:h-22 sm:w-22">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="88px"
            className="object-contain p-2"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-[var(--text-light)]">SKU: {item.sku}</p>
          <h3 className="mt-1 text-sm font-semibold leading-5 text-[var(--text-primary)] sm:text-base">
            {item.name}
          </h3>
          <p className="mt-1 text-xs leading-5 text-[var(--text-muted)] md:max-w-md">
            {item.description}
          </p>

          <button
            type="button"
            onClick={onRemove}
            className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[var(--text-light)] transition-colors hover:text-[var(--state-error)]"
          >
            <RemoveIcon />
            Remove
          </button>
        </div>
      </div>

      <div className="flex items-center md:justify-center">
        <div className="flex items-center gap-3 md:hidden">
          <span className="text-xs font-medium text-[var(--text-light)]">Quantity</span>
          <QuantityStepper
            value={item.quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            decreaseDisabled={item.quantity <= 1}
          />
        </div>

        <div className="hidden md:block">
          <QuantityStepper
            value={item.quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            decreaseDisabled={item.quantity <= 1}
          />
        </div>
      </div>

      <div className="flex items-center justify-between md:block md:justify-self-end md:text-right">
        <span className="text-xs font-medium text-[var(--text-light)] md:hidden">Unit Price</span>
        <p className="text-sm font-medium text-[var(--text-primary)]">{formatCurrency(item.price)}</p>
      </div>

      <div className="flex items-center justify-between md:block md:justify-self-end md:text-right">
        <span className="text-xs font-medium text-[var(--text-light)] md:hidden">Total</span>
        <p className="text-sm font-bold text-[var(--text-primary)]">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </article>
  );
}