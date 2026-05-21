import type { ProductResource } from "@/types/product";
import type { StoreTrustBadge } from "@/types/store";

export function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0 stroke-[var(--text-light)]">
      <path d="m5 10 3 3 7-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 stroke-[var(--text-light)]">
      <path d="M10 3v9m0 0 3-3m-3 3-3-3M4 15.5h12" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function ResourceIcon({ icon }: { icon: ProductResource["icon"] }) {
  if (icon === "certificate") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-[var(--text-light)]">
        <path d="m12 3 1.7 2.6 3.1-.8.8 3.1 2.6 1.7-1.7 2.6.8 3.1-3.1.8-1.7 2.6-2.6-1.7-2.6 1.7-1.7-2.6-3.1-.8.8-3.1-1.7-2.6 2.6-1.7.8-3.1 3.1.8L12 3Z" />
      </svg>
    );
  }

  if (icon === "cad") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-[var(--text-light)]">
        <path d="M5 5h14v14H5zM8 8h8v8H8zM12 5v3M12 16v3M5 12h3M16 12h3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-[var(--text-light)]">
      <path d="M7 3h7l4 4v14H7zM14 3v5h4M10 13h5M10 17h5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function TrustIcon({ icon }: { icon: StoreTrustBadge["icon"] }) {
  if (icon === "delivery") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-[var(--text-light)]">
        <path d="M3 7h11v10H3zM14 11h4l3 3v3h-7z" strokeLinejoin="round" strokeWidth="1.8" />
        <circle cx="7" cy="18" r="1.6" fill="var(--text-light)" stroke="none" />
        <circle cx="18" cy="18" r="1.6" fill="var(--text-light)" stroke="none" />
      </svg>
    );
  }

  if (icon === "support") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-[var(--text-light)]">
        <path d="M5 13a7 7 0 0 1 14 0v4a2 2 0 0 1-2 2h-2v-5h4M5 17a2 2 0 0 0 2 2h2v-5H5v3Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "factory") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-[var(--text-light)]">
        <path d="M8 4h8v16H8zM11 8h2M11 12h2M6 20h12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-[var(--text-light)]">
      <path d="M12 3 5 6v5c0 4.5 2.8 8.2 7 10 4.2-1.8 7-5.5 7-10V6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}
