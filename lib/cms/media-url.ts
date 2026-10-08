const LOCAL_MEDIA_PATH = /^\/(?:media|api\/media)(?:\/|$)/;

/**
 * Public URL for a Payload media value.
 * Absolute blob URLs are used as stored. Local `/media` paths 404 on Vercel
 * once uploads go to Blob, so those are ignored.
 */
export function publicMediaUrl(value: unknown): string | null {
  if (typeof value === "string") {
    return absoluteOrSitePath(value);
  }
  if (!value || typeof value !== "object") return null;

  const record = value as {
    url?: unknown;
    thumbnailURL?: unknown;
  };

  for (const candidate of [record.url, record.thumbnailURL]) {
    if (typeof candidate !== "string") continue;
    const url = absoluteOrSitePath(candidate);
    if (url) return url;
  }

  return null;
}

function absoluteOrSitePath(value: string): string | null {
  const url = value.trim();
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/") && !LOCAL_MEDIA_PATH.test(url)) return url;
  return null;
}
