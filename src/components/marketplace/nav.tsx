"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/", active: true },
  { label: "Stores", href: "/stores" },
  { label: "Become an Agent", href: "/agents" },
  { label: "Track Order", href: "/track-order" },
];

function LogoMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-dark)] text-[var(--text-on-dark)] shadow-sm">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none">
        <path
          d="M12 4.5 4.5 8l7.5 3.5L19.5 8 12 4.5Z"
          fill="currentColor"
          opacity="0.98"
        />
        <path
          d="M12 11 4.5 14.5 12 18l7.5-3.5L12 11Z"
          fill="currentColor"
          opacity="0.82"
        />
        <path
          d="M12 17.25 6 14.5v1.9L12 19l6-2.6v-1.9L12 17.25Z"
          fill="currentColor"
          opacity="0.68"
        />
      </svg>
    </div>
  );
}

function CartIcon() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center text-[var(--text-primary)]">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 stroke-current">
        <path
          d="M3 5h2l2 10h10l2-7H7.25"
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="19" r="1.25" fill="currentColor" />
        <circle cx="17" cy="19" r="1.25" fill="currentColor" />
      </svg>
      <span className="absolute right-0 top-0 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent-primary)] px-1 text-[11px] font-semibold leading-none text-white shadow-sm">
        2
      </span>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 stroke-current">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-default)] bg-white">
      <div className="relative mx-auto flex h-[72px] max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3 justify-self-start">
          <LogoMark />
          <span className="flex items-baseline gap-1 text-[15px] leading-none tracking-[-0.02em] sm:text-[17px]">
            <span className="font-semibold text-[var(--text-primary)]">Rokswood</span>
            <span className="font-normal text-[var(--text-muted)]">Marketplace</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-6 whitespace-nowrap lg:gap-8 xl:gap-10">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`text-sm ${
                    item.active
                      ? "border-b-2 border-[var(--text-primary)] pb-2 font-medium text-[var(--text-primary)]"
                      : "text-[var(--text-primary)]/80 transition-colors hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-4 lg:flex lg:gap-5 xl:gap-6">
          <button
            type="button"
            aria-label="Cart with 2 items"
            className="inline-flex items-center justify-center"
          >
            <CartIcon />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--text-primary)]"
            aria-label="Currency selector"
          >
            <span>USD</span>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current">
              <path d="m6 8 4 4 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <Link
            href="/auth/signin"
            className="inline-flex h-10 items-center rounded-lg bg-[var(--bg-dark)] px-5 text-sm font-medium text-[var(--text-on-dark)] shadow-sm transition-colors hover:bg-[var(--text-primary)]"
          >
            Log in / Profile
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Cart with 2 items"
            className="inline-flex items-center justify-center"
          >
            <CartIcon />
          </button>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-default)] bg-white text-[var(--text-primary)]"
          >
            <MenuIcon />
          </button>
        </div>

        {menuOpen ? (
          <div
            id="mobile-nav-menu"
            className="absolute left-0 top-full z-50 w-full border-b border-[var(--border-default)] bg-white px-4 py-4 shadow-lg lg:hidden sm:px-6"
          >
            <nav aria-label="Mobile primary">
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`block text-sm ${
                        item.active
                          ? "font-medium text-[var(--text-primary)]"
                          : "text-[var(--text-primary)]/80"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-4 flex items-center justify-between border-t border-[var(--border-default)] pt-4">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--text-primary)]"
                aria-label="Currency selector"
              >
                <span>USD</span>
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current">
                  <path d="m6 8 4 4 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <Link
                href="/auth/signin"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-10 items-center rounded-lg bg-[var(--bg-dark)] px-4 text-sm font-medium text-[var(--text-on-dark)] shadow-sm transition-colors hover:bg-[var(--text-primary)]"
              >
                Log in / Profile
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
