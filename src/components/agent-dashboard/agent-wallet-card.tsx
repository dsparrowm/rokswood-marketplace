import { Landmark } from "lucide-react";

type AgentWalletCardProps = {
  availableBalance: string;
  pendingFunds: string;
  linkedBank: string;
};

export default function AgentWalletCard({
  availableBalance,
  pendingFunds,
  linkedBank,
}: AgentWalletCardProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-sm">
      <div className="bg-[var(--bg-dark)] p-6 text-[var(--text-on-dark)]">
        <p className="text-sm text-[var(--text-on-dark-muted)]">Available Wallet Balance</p>
        <p className="mt-5 text-3xl font-bold tracking-normal">{availableBalance}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="h-9 rounded-md bg-[var(--bg-surface)] text-sm font-medium text-[var(--text-primary)]"
          >
            Withdraw
          </button>
          <button
            type="button"
            className="h-9 rounded-md border border-[var(--text-muted)] bg-[var(--text-muted)]/40 text-sm font-medium text-[var(--text-on-dark)]"
          >
            History
          </button>
        </div>
      </div>

      <div className="space-y-5 p-5 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[var(--text-muted)]">Pending Funds</span>
          <span className="font-medium text-[var(--text-primary)]">{pendingFunds}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[var(--text-muted)]">Linked Bank</span>
          <span className="inline-flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <Landmark className="h-4 w-4 text-[var(--text-light)]" aria-hidden="true" />
            {linkedBank}
          </span>
        </div>
      </div>
    </section>
  );
}
