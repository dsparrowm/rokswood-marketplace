import Link from "next/link";

const quickLinks = [
  { label: "Stores Directory", href: "/stores" },
  { label: "Support Center", href: "/support" },
  { label: "Become an Agent", href: "/agents" },
  { label: "Track Order", href: "/track-order" },
];

function FooterLogo() {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-5 w-5 items-center justify-center text-[var(--text-primary)]">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12 3.5 3.5 7.5 12 11.5l8.5-4L12 3.5Z" />
          <path d="M12 12.8 4.5 9.3v2.8L12 15.7l7.5-3.6V9.3L12 12.8Z" opacity="0.82" />
          <path d="M12 17 4.5 13.5v2.8L12 20l7.5-3.7v-2.8L12 17Z" opacity="0.68" />
        </svg>
      </span>
      <span className="text-base leading-none">
        <span className="font-bold text-[var(--text-primary)]">Rokswood</span>
        <span className="text-[var(--text-muted)]"> Marketplace</span>
      </span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-surface)] px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1360px] py-16">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          <div>
            <FooterLogo />
            <p className="mt-8 max-w-xs text-sm leading-6 text-[var(--text-muted)]">
              The premier enterprise ecosystem for industrial, tech, and
              infrastructure solutions globally.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">Quick Links</h2>
            <ul className="mt-6 space-y-4 text-sm text-[var(--text-muted)]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-[var(--text-primary)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">Contact</h2>
            <ul className="mt-6 space-y-4 text-sm text-[var(--text-muted)]">
              <li className="flex items-center gap-3">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current">
                  <path d="M3 5h14v10H3z" strokeLinejoin="round" strokeWidth="1.6" />
                  <path d="m3 6 7 5 7-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                </svg>
                <span>enterprise@rokswood.com</span>
              </li>
              <li className="flex items-center gap-3">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current">
                  <path d="M6 3.5 8.2 8l-1.6 1.4a9.7 9.7 0 0 0 4 4l1.4-1.6 4.5 2.2-1.1 2.4c-.3.6-.9 1-1.6.9C8 16.9 3.1 12 2.7 6.2c-.1-.7.3-1.3.9-1.6L6 3.5Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                </svg>
                <span>+1 (800) 555-0199</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-4 text-[var(--text-muted)]">
              <Link href="/linkedin" aria-label="LinkedIn" className="transition-colors hover:text-[var(--text-primary)]">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-current">
                  <path d="M4.1 6.4h3v9.5h-3V6.4Zm1.5-4.5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Zm3.4 4.5h2.9v1.3h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.6 2 3.6 4.6v5.2h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.5v4.7h-3V6.4Z" />
                </svg>
              </Link>
              <Link href="/twitter" aria-label="Twitter" className="transition-colors hover:text-[var(--text-primary)]">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-current">
                  <path d="M18 5.4c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8A3.3 3.3 0 0 0 9.8 8c0 .3 0 .5.1.8A9.3 9.3 0 0 1 3.1 5.3a3.3 3.3 0 0 0 1 4.4c-.5 0-1-.2-1.5-.4a3.3 3.3 0 0 0 2.6 3.2c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1a3.3 3.3 0 0 0 3.1 2.3A6.6 6.6 0 0 1 2 16.2a9.3 9.3 0 0 0 5 1.5c6 0 9.3-5 9.3-9.3v-.4A6.6 6.6 0 0 0 18 5.4Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1360px] flex-col gap-4 border-t border-[var(--border-default)] py-8 text-xs text-[var(--text-light)] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Rokswood Group. All rights reserved.</p>
        <div className="flex items-center gap-8">
          <Link href="/privacy" className="hover:text-[var(--text-muted)]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[var(--text-muted)]">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
