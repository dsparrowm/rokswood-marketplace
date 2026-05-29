import type { Metadata } from "next";

import CheckoutPage from "@/components/checkout/checkout-page";
import QueryProvider from "@/components/providers/query-provider";

export const metadata: Metadata = {
  title: "Secure Checkout | Rokswood Marketplace",
  description: "Complete your enterprise procurement order.",
};

export default function CheckoutRoute() {
  return (
    <QueryProvider>
      <CheckoutPage />
    </QueryProvider>
  );
}