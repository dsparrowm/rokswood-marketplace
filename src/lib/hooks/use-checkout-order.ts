"use client";

import { useMutation } from "@tanstack/react-query";

import type { CartItem } from "@/types/cart";
import type { CheckoutFormValues, CheckoutSubmissionResponse } from "@/types/checkout";

export type CheckoutOrderMutationInput = CheckoutFormValues & {
  cartItems: CartItem[];
};

async function submitCheckoutOrder(input: CheckoutOrderMutationInput): Promise<CheckoutSubmissionResponse & { storeSlug: string }> {
  const response = await fetch("/api/checkout/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const payload = await response.json();

  if (!response.ok || !payload?.status) {
    throw new Error(payload?.message ?? "Checkout submission failed");
  }

  return payload.data as CheckoutSubmissionResponse & { storeSlug: string };
}

export function useCheckoutOrderMutation() {
  return useMutation({
    mutationFn: submitCheckoutOrder,
  });
}