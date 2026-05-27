"use client";

import { useQuery } from "@tanstack/react-query";
import type { StoreCardData } from "@/types/store";

export type StoreDirectoryResponse = {
  stores: StoreCardData[];
  total: number;
};

async function fetchStoreDirectory(): Promise<StoreDirectoryResponse> {
  const response = await fetch("/api/stores", {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load stores directory");
  }

  return (await response.json()) as StoreDirectoryResponse;
}

export function useStoreDirectoryQuery() {
  return useQuery({
    queryKey: ["stores", "directory"],
    queryFn: fetchStoreDirectory,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}