export default function StorePageLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <div className="h-20 border-b border-[var(--border-default)] bg-[var(--bg-surface)]" />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-72 rounded-[28px] bg-[var(--bg-surface)] shadow-sm" />
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="h-96 rounded-[28px] bg-[var(--bg-surface)] shadow-sm" />
          <div className="h-[720px] rounded-[28px] bg-[var(--bg-surface)] shadow-sm" />
        </div>
      </main>
    </div>
  );
}