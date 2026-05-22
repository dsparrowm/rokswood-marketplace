import { BadgeCheck, FileText, Globe, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TrustItem = {
  label: string;
  Icon: LucideIcon;
};

const trustItems: TrustItem[] = [
  { label: "Verified Marketplace Partner System", Icon: BadgeCheck },
  { label: "Secure Registration Process", Icon: Lock },
  { label: "Global Agent Network", Icon: Globe },
  { label: "Enterprise Compliance Standards", Icon: FileText },
];

export default function AgentTrustStrip() {
  return (
    <section className="bg-[var(--bg-dark)] px-4 py-5 text-[var(--text-on-dark-muted)] sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 text-xs font-medium sm:grid-cols-4">
        {trustItems.map(({ label, Icon }) => (
          <div key={label} className="flex items-center justify-center gap-2 text-center">
            <Icon className="h-4 w-4 shrink-0 text-[var(--accent-payment)]" aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
