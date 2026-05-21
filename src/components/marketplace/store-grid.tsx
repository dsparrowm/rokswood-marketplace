import Link from "next/link";

const stores = [
  {
    name: "Arackteck",
    category: "Infrastructure",
    description:
      "Industrial engineering, heavy machinery, gas generators, and PRMS infrastructure systems.",
    tags: ["Heavy Machinery", "Generators"],
    accentClass: "border-t-[var(--store-arackteck)] text-[var(--store-arackteck)]",
    icon: "gears",
  },
  {
    name: "Rokswood Pulse",
    category: "IoT Tech",
    description:
      "Smart technology, remote monitoring sensors, and real-time IoT devices.",
    tags: ["Sensors", "IoT Devices"],
    accentClass: "border-t-[var(--store-pulse)] text-[var(--store-pulse)]",
    icon: "pulse",
  },
  {
    name: "Metals Extras",
    category: "Fabrication",
    description:
      "Luxury industrial metallic engineering, prefabricated components, and Oil & Gas infrastructure.",
    tags: ["Prefab Components", "Oil & Gas"],
    accentClass: "border-t-[var(--store-metals)] text-[var(--store-metals)]",
    icon: "metals",
  },
  {
    name: "Agrify",
    category: "Agrotech",
    description:
      "Agrotech Solutions, Processed Agricultural Products Farm Technology",
    tags: ["Sustainability", "Smart farming"],
    accentClass: "border-t-[var(--store-agrify)] text-[var(--store-agrify)]",
    icon: "gears",
  },
  {
    name: "Rokswood Energy",
    category: "IoT Tech",
    description:
      "Energy technology and utility systems. Smart Energy Meters. Energy Monitoring Accessories. Power Management Systems",
    tags: ["Meters", "IoT Devices"],
    accentClass: "border-t-[var(--store-energy)] text-[var(--store-energy)]",
    icon: "energy",
  },
  {
    name: "RokswoodEfab",
    category: "Fabrication",
    description:
      "Engineering fabrication and structural precision. Prefabricated Steel Components",
    tags: ["Structural Systems", "Industrial Fabrication"],
    accentClass: "border-t-[var(--store-efab)] text-[var(--store-efab)]",
    icon: "efab",
  },
];

function StoreIcon({ icon }: { icon: string }) {
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

export default function StoreGrid() {
  return (
    <section className="bg-[var(--bg-base)] px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--text-primary)] sm:text-4xl">
              Discover Stores
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[var(--text-muted)]">
              Navigate our specialized stores tailored for distinct industrial,
              energy, and structural needs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous stores"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-muted)] shadow-sm"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current">
                <path d="M12.5 5 7.5 10l5 5M8 10h8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next stores"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-muted)] shadow-sm"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current">
                <path d="M7.5 5 12.5 10l-5 5M4 10h8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-9">
          {stores.map((store) => (
            <article
              key={store.name}
              className={`flex min-h-[330px] flex-col rounded-lg border-t-4 bg-[var(--bg-surface)] p-8 shadow-[0_18px_35px_color-mix(in_srgb,var(--text-muted)_18%,transparent)] ${store.accentClass}`}
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[var(--bg-base)]">
                  <StoreIcon icon={store.icon} />
                </div>
                <span className="rounded-md bg-[var(--bg-tag)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                  {store.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-[-0.01em]">{store.name}</h3>
              <p className="mt-7 min-h-14 text-sm leading-6 text-[var(--text-muted)]">
                {store.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {store.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-[var(--bg-tag)] px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/stores"
                className="mt-auto inline-flex h-12 w-full items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] text-sm font-semibold text-[var(--text-primary)]"
              >
                Visit Store
                <svg aria-hidden="true" viewBox="0 0 20 20" className="ml-2 h-4 w-4 fill-none stroke-current">
                  <path d="M4 10h10m-4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
