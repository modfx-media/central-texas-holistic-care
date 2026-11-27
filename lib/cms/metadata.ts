import type { Metadata } from "next";

import { queryRoutedContentByPath } from "./query";
import { resolveRoutedMetadata } from "./resolve-metadata";
import { withCMS } from "./safe";
import { normalizeCmsPath } from "./url";

export { metadataFromDoc, resolveRoutedMetadata } from "./resolve-metadata";

export async function cmsMetadata(
  path: string,
  fallback: Metadata,
): Promise<Metadata> {
  return withCMS(async () => {
    const routed = await queryRoutedContentByPath(normalizeCmsPath(path));
    return resolveRoutedMetadata(path, fallback, routed?.doc ?? null);
  }, resolveRoutedMetadata(path, fallback, null));
}
