import type { Metadata } from "next";

import { clampSeoMetadata } from "@/lib/seo-length";

import { queryRoutedContentByPath } from "./query";
import { withCMS } from "./safe";
import type { CmsRoutedDoc } from "./types";
import { getPublicSiteURL, normalizeCmsPath, publicPathFromCms } from "./url";

function mediaImage(image: CmsRoutedDoc["meta"]): {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
} | undefined {
  const value = image?.image;
  if (!value || typeof value !== "object" || !("url" in value) || !value.url) return undefined;
  const record = value as {
    url: string;
    width?: number | null;
    height?: number | null;
    alt?: string | null;
  };
  return {
    url: record.url,
    ...(typeof record.width === "number" ? { width: record.width } : {}),
    ...(typeof record.height === "number" ? { height: record.height } : {}),
    ...(record.alt ? { alt: record.alt } : {}),
  };
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
  const image = mediaImage(doc.meta);

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
                url: image.url,
                ...(image.width ? { width: image.width } : {}),
                ...(image.height ? { height: image.height } : {}),
                alt: image.alt || title || "Central Texas Holistic Care",
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
      ...(image ? { images: [image.url] } : {}),
    },
  };
}

export async function cmsMetadata(
  path: string,
  fallback: Metadata,
): Promise<Metadata> {
  return withCMS(async () => {
    const routed = await queryRoutedContentByPath(normalizeCmsPath(path));
    if (!routed) return clampSeoMetadata(fallback);
    return clampSeoMetadata(metadataFromDoc(routed.doc, fallback));
  }, clampSeoMetadata(fallback));
}
