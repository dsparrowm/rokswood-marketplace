import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-primary" />
              <span className="text-xs uppercase tracking-[0.4em] text-bone/70">Contact</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] gradient-text text-balance">
              Procurement, support and <span className="italic font-light">partnerships.</span>
            </h1>
            <p className="mt-6 max-w-xl text-bone/70 leading-relaxed">
              Reach the right team for marketplace orders, technical questions, agent applications or bulk purchase requests.
            </p>
          </div>
          <form className="lg:col-span-5 rounded-2xl border border-border bg-gradient-card p-6 shadow-elegant">
            <div className="grid gap-4">
              <input required placeholder="Full name" className="h-12 rounded-xl border border-border bg-card px-4 text-ivory outline-none placeholder:text-bone/40 focus:border-primary/60" />
              <input required type="email" placeholder="Email address" className="h-12 rounded-xl border border-border bg-card px-4 text-ivory outline-none placeholder:text-bone/40 focus:border-primary/60" />
              <select className="h-12 rounded-xl border border-border bg-card px-4 text-ivory outline-none">
                <option>Order support</option>
                <option>Bulk procurement</option>
                <option>Technical product question</option>
                <option>Agent program</option>
              </select>
              <textarea required placeholder="How can we help?" rows={5} className="rounded-xl border border-border bg-card px-4 py-3 text-ivory outline-none placeholder:text-bone/40 focus:border-primary/60" />
              <button className="h-12 rounded-full bg-primary text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground">
                Send message
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="py-16">
        <div className="container grid gap-5 md:grid-cols-3">
          {[
            ["Marketplace", "orders@rokswood.com"],
            ["Procurement", "procurement@rokswood.com"],
            ["Agents", "agents@rokswood.com"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-border bg-gradient-card p-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
              <div className="mt-3 font-display text-2xl text-ivory">{value}</div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
