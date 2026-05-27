export default function ProductPageLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-surface)] font-sans text-[var(--text-primary)]">
      <div className="h-20 border-b border-[var(--border-default)] bg-[var(--bg-surface)]" />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-8 w-64 rounded-full bg-[var(--bg-base)]" />
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="h-[640px] rounded-[28px] bg-[var(--bg-base)] shadow-sm" />
          <div className="h-[640px] rounded-[28px] bg-[var(--bg-base)] shadow-sm" />
        </div>
      </main>
    </div>
  );
}