"use client";

import type { ReactNode } from "react";
import { CartDrawer } from "@/components/marketplace/cart-drawer";
import { CartProvider } from "@/context/cart-context";
import { ThemeProvider } from "@/context/theme-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </ThemeProvider>
  );
}
