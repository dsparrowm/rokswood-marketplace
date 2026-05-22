"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/stores";

export type CartItem = Product & { qty: number; storeSlug: string };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product, storeSlug: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const parsePrice = (value: string) => {
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const loadCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("rw_cart");
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("rw_cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.qty, 0),
      subtotal: items.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0),
      open,
      setOpen,
      add: (product, storeSlug, qty = 1) =>
        setItems((current) => {
          const existing = current.find((item) => item.id === product.id);
          if (existing) {
            return current.map((item) =>
              item.id === product.id ? { ...item, qty: item.qty + qty } : item,
            );
          }
          return [...current, { ...product, qty, storeSlug }];
        }),
      setQty: (id, qty) =>
        setItems((current) =>
          qty <= 0
            ? current.filter((item) => item.id !== id)
            : current.map((item) => (item.id === id ? { ...item, qty } : item)),
        ),
      remove: (id) => setItems((current) => current.filter((item) => item.id !== id)),
      clear: () => setItems([]),
    }),
    [items, open],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

const noop: CartContextValue = {
  items: [],
  count: 0,
  subtotal: 0,
  open: false,
  setOpen: () => {},
  add: () => {},
  setQty: () => {},
  remove: () => {},
  clear: () => {},
};

export function useCart() {
  return useContext(CartContext) ?? noop;
}
