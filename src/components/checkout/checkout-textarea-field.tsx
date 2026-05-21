import type { TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type CheckoutTextareaFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  rows?: number;
  autoComplete?: string;
  inputMode?: TextareaHTMLAttributes<HTMLTextAreaElement>["inputMode"];
};

export default function CheckoutTextareaField({
  label,
  registration,
  error,
  placeholder,
  rows = 4,
}: CheckoutTextareaFieldProps) {
  return (
    <label className="block">
      <span className="text-xs text-[var(--text-muted)]">{label}</span>
      <textarea
        {...registration}
        rows={rows}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-light)] focus:border-[var(--accent-payment)]"
      />
      {error ? <p className="mt-1 text-xs text-[var(--state-error)]">{error}</p> : null}
    </label>
  );
}