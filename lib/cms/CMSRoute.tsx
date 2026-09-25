import { draftMode } from "next/headers";
import type { ReactNode } from "react";

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

  return (
    <>
      {draft.isEnabled ? <LivePreviewListener /> : null}
      <RenderRoutedContent doc={routed.doc} collection={routed.collection} />
    </>
  );
}
