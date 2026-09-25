import type { Metadata } from "next";

import { queryRoutedContentByPath } from "./query";
import { withCMS } from "./safe";
import type { CmsRoutedDoc } from "./types";
import { getPublicSiteURL, normalizeCmsPath, publicPathFromCms } from "./url";

function mediaUrl(image: CmsRoutedDoc["meta"]): string | undefined {
  const value = image?.image;
  if (value && typeof value === "object" && "url" in value && value.url) {
    return value.url;
  }
  return undefined;
}

export function metadataFromDoc(
  doc: CmsRoutedDoc,
  fallback: Metadata,
): Metadata {
  const site = getPublicSiteURL();
  const title = doc.meta?.title || doc.title || undefined;
  const description = doc.meta?.description || doc.excerpt || undefined;
  const path = doc.path ? publicPathFromCms(doc.path) : undefined;
  const canonical =
    doc.canonicalUrl || (path ? `${site}${path}` : undefined);
  const image = mediaUrl(doc.meta);

  return {
    ...fallback,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    robots: {
      index: !doc.noIndex,
      follow: !doc.noFollow,
    },
    openGraph: {
      ...fallback.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(canonical ? { url: canonical } : {}),
      ...(image
        ? {
            images: [
              {
                url: image,
                width: 1200,
                height: 630,
                alt: title || "Central Texas Holistic Care",
              },
            ],
          }
        : {}),
    },
    twitter: {
      ...fallback.twitter,
      card: "summary_large_image",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
  };
}

export async function cmsMetadata(
  path: string,
  fallback: Metadata,
): Promise<Metadata> {
  return withCMS(async () => {
    const routed = await queryRoutedContentByPath(normalizeCmsPath(path));
    if (!routed) return fallback;
    return metadataFromDoc(routed.doc, fallback);
  }, fallback);
}
