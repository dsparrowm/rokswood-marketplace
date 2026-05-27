"use client";

import StoreGrid from "@/components/marketplace/store-grid";
import { useStoreDirectoryQuery } from "@/lib/hooks/use-store-directory";

function StoresDirectoryLoading() {
  return (
    <section className="bg-[var(--bg-base)] px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="h-10 w-60 rounded-full bg-[var(--bg-surface)]" />
            <div className="mt-6 h-5 w-full max-w-md rounded-full bg-[var(--bg-surface)]" />
            <div className="mt-4 h-6 w-36 rounded-full bg-[var(--bg-surface)]" />
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-9">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[420px] animate-pulse rounded-[28px] border border-[var(--border-default)] bg-[var(--bg-surface)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoresDirectoryError({ onRetry }: { onRetry: () => void }) {
  return (
    <section className="bg-[var(--bg-base)] px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto flex max-w-[1360px] flex-col items-start rounded-[28px] border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Stores Directory
        </p>
        <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-[var(--text-primary)]">
          We could not load the store catalogue right now.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-muted)]">
          The backend stores endpoint is unavailable or returned an error. Try again to refetch the latest catalogue.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Retry load
        </button>
      </div>
    </section>
  );
}

export default function StoresDirectory() {
  const { data, isLoading, isError, refetch } = useStoreDirectoryQuery();

  if (isLoading) {
    return <StoresDirectoryLoading />;
  }

  if (isError || !data) {
    return <StoresDirectoryError onRetry={() => void refetch()} />;
  }

  return <StoreGrid stores={data.stores} storeCount={data.total} />;
}