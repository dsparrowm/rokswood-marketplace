"use client";

import { useParams } from "next/navigation";
import StoreHero from "@/components/store/store-hero";
import StoreProductBrowser from "@/components/store/store-product-browser";
import StoreTechnicalCta from "@/components/store/store-technical-cta";
import StoreTrustRow from "@/components/store/store-trust-row";
import { useStorePageQuery } from "@/lib/hooks/use-store-page";

function StorePageSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <div className="h-20 border-b border-[var(--border-default)] bg-[var(--bg-surface)]" />
      <section className="bg-[var(--bg-base)] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[980px] lg:max-w-[1000px]">
          <div className="h-12 w-full max-w-md rounded-full bg-[var(--bg-surface)]" />
          <div className="mt-5 h-24 rounded-[28px] bg-[var(--bg-surface)]" />
          <div className="mt-6 flex gap-2">
            <div className="h-8 w-24 rounded-full bg-[var(--bg-surface)]" />
            <div className="h-8 w-28 rounded-full bg-[var(--bg-surface)]" />
            <div className="h-8 w-20 rounded-full bg-[var(--bg-surface)]" />
          </div>
        </div>
      </section>
    </div>
  );
}

function StorePageError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)] px-4 text-[var(--text-primary)]">
      <div className="max-w-xl rounded-[28px] border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Store load error
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em]">We could not load this store.</h1>
        <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
          The store details request failed in the browser. Try again to refetch the public catalogue.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-8 inline-flex rounded-full bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-white"
        >
          Retry load
        </button>
      </div>
    </div>
  );
}

export default function StorePageClient() {
  const params = useParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { data, isLoading, isError, refetch } = useStorePageQuery(slug);

  if (!slug || isLoading) {
    return <StorePageSkeleton />;
  }

  if (isError || !data) {
    return <StorePageError onRetry={() => void refetch()} />;
  }

  return (
    <>
      <StoreHero store={data} />
      <StoreProductBrowser store={data} />
      <StoreTrustRow badges={data.trustBadges} />
      <StoreTechnicalCta title={data.ctaTitle} description={data.ctaDescription} />
    </>
  );
}