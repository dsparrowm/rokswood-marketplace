import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Returns</div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] gradient-text">Clear return handling.</h1>
          <div className="mt-10 space-y-7 text-bone/75 leading-relaxed">
            <p>Eligible stock items can be reviewed for return within 30 days when unused, complete and returned with the original order reference.</p>
            <p>Custom fabrication, configured industrial systems and project-specific procurement may require separate cancellation and return terms.</p>
            <p>Start every return through support so the team can confirm eligibility and logistics before goods are shipped back.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
