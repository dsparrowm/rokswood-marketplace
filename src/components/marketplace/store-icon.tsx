import type { StoreIconName } from "@/types/store";

type StoreIconProps = {
  icon: StoreIconName;
  logoSrc?: string;
  logoAlt?: string;
};

export default function StoreIcon({ icon, logoSrc, logoAlt }: StoreIconProps) {
  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={logoAlt ?? "Store logo"}
        className="h-10 w-10 object-contain sm:h-12 sm:w-12"
      />
    );
  }

  if (icon === "pulse") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8">
        <rect x="4" y="4" width="24" height="24" rx="4" className="fill-[var(--bg-surface)] stroke-[var(--store-pulse)]" strokeWidth="1.5" />
        <path d="M7 19h5l2-9 4 14 2-7h5" className="fill-none stroke-[var(--store-pulse)]" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "metals") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8">
        <circle cx="13" cy="11" r="4" className="fill-none stroke-[var(--store-metals)]" strokeWidth="2" />
        <circle cx="19" cy="18" r="4" className="fill-none stroke-[var(--store-metals)]" strokeWidth="2" />
        <circle cx="11" cy="21" r="4" className="fill-none stroke-[var(--store-metals)]" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "energy") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8">
        <path d="M18 4 7 17h8l-1 11 11-15h-8l1-9Z" className="fill-[var(--store-efab)]" />
        <path d="M18 4 7 17h8l-1 11 11-15h-8l1-9Z" className="fill-[var(--store-energy)] opacity-80" transform="rotate(25 16 16)" />
        <path d="M18 4 7 17h8l-1 11 11-15h-8l1-9Z" className="fill-[var(--store-pulse)] opacity-90" transform="rotate(-22 16 16)" />
      </svg>
    );
  }

  if (icon === "efab") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8">
        <path d="M7 9h10v14H7z" className="fill-[var(--store-efab)]" />
        <path d="M18 11h7v10h-7" className="fill-none stroke-[var(--border-strong)]" strokeWidth="1.8" />
        <path d="M15 16h8" className="stroke-[var(--store-metals)]" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8">
      <path d="m13 8 2-2 3 3-2 2 2 2 2-2 3 3-3 3-2-2-2 2 2 2-3 3-2-2-2 2-3-3 2-2-2-2-2 2-3-3 3-3 2 2 2-2-2-2Z" className="fill-[var(--store-arackteck)]" />
      <circle cx="13" cy="13" r="2" className="fill-[var(--bg-surface)]" />
      <circle cx="19" cy="19" r="2" className="fill-[var(--bg-surface)]" />
    </svg>
  );
}
