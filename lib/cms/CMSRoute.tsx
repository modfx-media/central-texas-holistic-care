import { draftMode } from "next/headers";
import type { ReactNode } from "react";

import { keepsDesignedLayout } from "./designed-layout";
import { LivePreviewListener } from "./LivePreviewListener";
import { queryRoutedContentByPath } from "./query";
import { RenderRoutedContent } from "./RenderRoutedContent";
import { normalizeCmsPath } from "./url";

export async function CMSRoute({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  const [routed, draft] = await Promise.all([
    queryRoutedContentByPath(normalizeCmsPath(path)),
    draftMode(),
  ]);

  if (!routed) return children;

  // Designed pages and blog posts use the coded template passed as children.
  // Publishing the CMS document must not swap that template for RenderRoutedContent.
  if (keepsDesignedLayout(routed.collection)) {
    return (
      <>
        {draft.isEnabled ? <LivePreviewListener /> : null}
        {children}
      </>
    );
  }

  return (
    <>
      {draft.isEnabled ? <LivePreviewListener /> : null}
      <RenderRoutedContent doc={routed.doc} collection={routed.collection} />
    </>
  );
}
