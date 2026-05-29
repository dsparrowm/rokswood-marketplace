"use client";

import { useQuery } from "@tanstack/react-query";

import type { CheckoutSupportData } from "@/types/checkout";

async function fetchCheckoutSupport(): Promise<CheckoutSupportData> {
  const response = await fetch("/api/checkout/support", {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load checkout support data");
  }

  return (await response.json()) as CheckoutSupportData;
}

export function useCheckoutSupportQuery() {
  return useQuery({
    queryKey: ["checkout", "support"],
    queryFn: fetchCheckoutSupport,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}