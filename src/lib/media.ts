const rokswoodBlobHostname = "blobs.rokswood.com";

export function resolveMarketplaceImageSource(source?: string | null) {
  const trimmedSource = source?.trim();

  if (!trimmedSource) {
    return undefined;
  }

  if (trimmedSource.startsWith("/")) {
    return trimmedSource;
  }

  try {
    const url = new URL(trimmedSource);

    if (url.hostname !== rokswoodBlobHostname) {
      return undefined;
    }

    url.protocol = "https:";

    return url.toString();
  } catch {
    return undefined;
  }
}
