"use client";

import { useQuery } from "@tanstack/react-query";
import type { StoreDetailData } from "@/types/store";

async function fetchStorePage(slug: string): Promise<StoreDetailData> {
  const response = await fetch(`/api/stores/${slug}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load store details");
  }

  return (await response.json()) as StoreDetailData;
}

export function useStorePageQuery(slug: string) {
  return useQuery({
    queryKey: ["stores", "detail", slug],
    queryFn: () => fetchStorePage(slug),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}