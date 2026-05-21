import type { ReactNode } from "react";

type CheckoutSectionProps = {
  step: number;
  title: string;
  children: ReactNode;
  action?: ReactNode;
};

export default function CheckoutSection({ step, title, children, action }: CheckoutSectionProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm">
      <header className="flex items-center justify-between gap-4 border-b border-[var(--border-default)] px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--bg-base)] text-[11px] font-semibold text-[var(--accent-payment)] ring-1 ring-inset ring-[var(--border-default)]">
            {step}
          </span>
          <h2 className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">{title}</h2>
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </header>

      <div className="px-4 py-4 sm:px-5 sm:py-5">{children}</div>
    </section>
  );
}