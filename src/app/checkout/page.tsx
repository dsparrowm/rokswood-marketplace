import type { Metadata } from "next";

import CheckoutPage from "@/components/checkout/checkout-page";

export const metadata: Metadata = {
  title: "Secure Checkout | Rokswood Marketplace",
  description: "Complete your enterprise procurement order.",
};

export default function CheckoutRoute() {
  return <CheckoutPage />;
}
