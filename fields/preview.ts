export function previewFromPath(
  path?: string | null,
  slug?: string | null,
): string | null {
  const raw = path || (slug ? `/${slug}` : null);
  if (!raw) return null;

  const segments = raw.split("/").filter((segment) => segment.length > 0);
  if (
    segments.some(
      (segment) => segment === "null" || segment === "undefined",
    )
  ) {
    return null;
  }

  const normalized = segments.length === 0 ? "/" : `/${segments.join("/")}`;
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return normalized;

  return `/next/preview?path=${encodeURIComponent(normalized)}&previewSecret=${encodeURIComponent(secret)}`;
}
