import type { RoutedContent } from "./types";

/**
 * CMSRoute is mounted around a coded page or article. Publishing the matching
 * document must not replace that template with the generic block renderer.
 * SEO still comes from the published document through cmsMetadata.
 */
export function keepsDesignedLayout(
  collection: RoutedContent["collection"],
): boolean {
  return collection === "pages" || collection === "posts";
}
