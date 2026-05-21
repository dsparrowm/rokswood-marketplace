type QuantityStepperProps = {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  decreaseDisabled?: boolean;
};

export default function QuantityStepper({
  value,
  onDecrease,
  onIncrease,
  decreaseDisabled = false,
}: QuantityStepperProps) {
  return (
    <div className="inline-flex h-10 overflow-hidden rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] text-sm font-semibold text-[var(--text-primary)] shadow-sm">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrease}
        disabled={decreaseDisabled}
        className="flex w-9 items-center justify-center border-r border-[var(--border-default)] text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-base)] disabled:cursor-not-allowed disabled:text-[var(--text-light)]"
      >
        -
      </button>
      <span className="flex min-w-11 items-center justify-center px-3">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrease}
        className="flex w-9 items-center justify-center border-l border-[var(--border-default)] text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-base)]"
      >
        +
      </button>
    </div>
  );
}