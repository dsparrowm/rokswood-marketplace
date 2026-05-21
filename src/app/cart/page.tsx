import type { Metadata } from "next";

import CartPage from "@/components/cart/cart-page";

export const metadata: Metadata = {
  title: "Procurement Cart | Rokswood Marketplace",
  description: "Review multi-store procurement items before checkout.",
};

export default function CartRoute() {
  return <CartPage />;
}