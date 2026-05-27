"use client";

export default function ProductPageError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-surface)] px-4 text-[var(--text-primary)]">
      <div className="max-w-xl rounded-[28px] border border-[var(--border-default)] bg-[var(--bg-base)] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Product page error
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em]">We could not load this product.</h1>
        <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
          {error.message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex rounded-full bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}