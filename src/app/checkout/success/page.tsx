import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/marketplace/footer";
import { Nav } from "@/components/marketplace/nav";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref = "RW-0429-8742" } = await searchParams;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-36 pb-24">
        <div className="container max-w-3xl text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
          <h1 className="mt-8 font-display text-5xl md:text-7xl leading-[0.95] gradient-text text-balance">
            Order received.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-bone/70 leading-relaxed">
            Your guest order reference is <span className="font-mono text-ivory">{ref}</span>. We sent the receipt and tracking instructions to your email.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href={`/order/${ref}`} className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
              View order
            </Link>
            <Link href="/track-order" className="rounded-full border border-border px-6 py-3 text-sm text-bone hover:text-ivory">
              Track another order
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
