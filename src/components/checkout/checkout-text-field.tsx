import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type CheckoutTextFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
};

export default function CheckoutTextField({
  label,
  registration,
  error,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
}: CheckoutTextFieldProps) {
  return (
    <label className="block">
      <span className="text-xs text-[var(--text-muted)]">{label}</span>
      <input
        {...registration}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="mt-1 w-full border-b border-[var(--border-default)] bg-transparent pb-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-light)] focus:border-[var(--accent-payment)]"
      />
      {error ? <p className="mt-1 text-xs text-[var(--state-error)]">{error}</p> : null}
    </label>
  );
}