import Link from "next/link";

export default function AgentDashboardFooter() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-surface)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[var(--bg-tag)] text-xs font-bold text-[var(--text-muted)]">
            R
          </span>
          <p>© 2023 Rokswood Marketplace. All rights reserved.</p>
        </div>
        <nav aria-label="Agent footer">
          <ul className="flex items-center gap-8">
            <li>
              <Link href="/support" className="hover:text-[var(--text-primary)]">
                Support
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[var(--text-primary)]">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[var(--text-primary)]">
                Privacy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
