type StoreFilterSidebarProps = {
  categories: string[];
  availability: string[];
  segments: string[];
  idPrefix?: string;
  framed?: boolean;
};

export default function StoreFilterSidebar({
  categories,
  availability,
  segments,
  idPrefix = "store",
  framed = true,
}: StoreFilterSidebarProps) {
  const segmentId = `${idPrefix}-industrial-segment`;

  return (
    <aside
      className={`bg-[var(--bg-surface)] p-5 lg:w-60 lg:shrink-0 ${
        framed ? "rounded-lg border border-[var(--border-default)] shadow-sm" : ""
      }`}
    >
      <h2 className="text-sm font-bold text-[var(--text-primary)]">Filters</h2>

      <div className="mt-7">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Category</h3>
        <div className="mt-4 space-y-3">
          {categories.map((category, index) => (
            <label key={category} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <input
                type="checkbox"
                defaultChecked={index === 0}
                className="h-4 w-4 rounded border-[var(--border-strong)] accent-[var(--accent-payment)]"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Availability</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {availability.map((item, index) => (
            <span
              key={item}
              className={`rounded px-3 py-1.5 text-xs font-medium ${
                index === 1
                  ? "border border-[var(--accent-primary)]/25 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                  : "bg-[var(--bg-tag)] text-[var(--text-muted)]"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <label htmlFor={segmentId} className="text-sm font-semibold text-[var(--text-primary)]">
          Industrial Segment
        </label>
        <select
          id={segmentId}
          defaultValue={segments[0]}
          className="mt-4 h-10 w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 text-sm text-[var(--text-primary)]"
        >
          {segments.map((segment) => (
            <option key={segment}>{segment}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
