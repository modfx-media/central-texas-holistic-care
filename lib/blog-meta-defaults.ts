import data from "../data/blog-meta-updates.json";

import { normalizeCmsPath } from "./cms/url";

export type BlogMetaUpdate = (typeof data.updates)[number];

/** Curated title and description for the five CMS posts with short or trimmed tags. */
export const BLOG_META_UPDATES: readonly BlogMetaUpdate[] = data.updates;

const byPath = new Map(BLOG_META_UPDATES.map((update) => [update.path, update]));

export function blogMetaForPath(path: string): BlogMetaUpdate | undefined {
  return byPath.get(normalizeCmsPath(path));
}
