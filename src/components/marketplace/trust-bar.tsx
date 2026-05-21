const trustItems = [
  {
    label: "Secure Transactions",
    icon: (
      <path
        d="M12 3.5 6.5 6.2V10c0 4 2.5 7.2 5.5 8.8 3-1.6 5.5-4.8 5.5-8.8V6.2L12 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Enterprise Procurement",
    icon: (
      <path
        d="M7 4.5h10v15H7zM10 7h4M10 10.5h4M10 14h4M4.5 8.5H7M4.5 12h2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Industrial-Grade Products",
    icon: (
      <path
        d="M4.5 16.5V9.8L12 5.5l7.5 4.3v6.7L12 20.5l-7.5-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Nationwide Delivery",
    icon: (
      <path
        d="M3.5 15.5V8.8h10.2l3.1 3.1V15.5H3.5ZM13.7 11.1h2.1l2.7 2.8v1.6h-4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Verified Suppliers",
    icon: (
      <path
        d="M12 3.8 13.8 6.7 17 7.2l-2.3 2.2.5 3.2L12 11.8l-3.2 1.8.5-3.2L7 7.2l3.2-.5L12 3.8Zm-5 8.4 1.8 1.8L12 12.3l3.2 1.7 1.8-1.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function TrustBar() {
  return (
    <section className="bg-[var(--bg-dark)] text-[var(--text-on-dark)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--text-on-dark)_6%,transparent),inset_0_-1px_0_color-mix(in_srgb,var(--text-on-dark)_6%,transparent)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <ul className="grid gap-3 py-4 sm:gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-4 lg:py-4">
          {trustItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-[var(--text-light)] lg:justify-center lg:text-[15px]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[var(--text-light)]">
                {item.icon}
              </svg>
              <span className="whitespace-nowrap">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
