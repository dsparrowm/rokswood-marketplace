"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { initialCartItems } from "@/lib/data/cart";
import type { CartItem } from "@/types/cart";

type CartItemInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItemInput) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
};

function mergeCartItem(items: CartItem[], item: CartItemInput) {
  const quantity = item.quantity ?? 1;
  const existingItem = items.find((currentItem) => currentItem.productId === item.productId);

  if (!existingItem) {
    return [...items, { ...item, quantity }];
  }

  return items.map((currentItem) =>
    currentItem.productId === item.productId
      ? { ...currentItem, quantity: currentItem.quantity + quantity }
      : currentItem,
  );
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: initialCartItems,
      addItem: (item) =>
        set((state) => ({
          items: mergeCartItem(state.items, item),
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      clearCart: () => set({ items: [] }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.productId !== productId)
              : state.items.map((item) =>
                  item.productId === productId ? { ...item, quantity } : item,
                ),
        })),
      increaseQuantity: (productId) => {
        const currentItem = get().items.find((item) => item.productId === productId);

        if (!currentItem) {
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }));
      },
      decreaseQuantity: (productId) => {
        const currentItem = get().items.find((item) => item.productId === productId);

        if (!currentItem || currentItem.quantity <= 1) {
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item,
          ),
        }));
      },
    }),
    {
      name: "rokswood-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);