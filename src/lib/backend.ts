type MarketplaceApiOptions = {
  cache?: RequestCache;
  revalidate?: number;
};

export function getMarketplaceApiBaseUrl() {
  return (
    process.env.ROKSWOOD_HIVE_BACKEND_API_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    null
  );
}

export async function fetchMarketplaceApi<T>(
  path: string,
  options?: MarketplaceApiOptions,
) {
  const baseUrl = getMarketplaceApiBaseUrl();

  if (!baseUrl) {
    return null;
  }

  try {
    const response = await fetch(new URL(path, baseUrl), {
      headers: {
        Accept: "application/json",
      },
      ...(options?.cache ? { cache: options.cache } : {}),
      ...(options?.revalidate ? { next: { revalidate: options.revalidate } } : {}),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}
