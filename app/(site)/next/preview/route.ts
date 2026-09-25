import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { normalizeCmsPath, publicPathFromCms } from "@/lib/cms/url";

function isValidPublicPath(path: string): boolean {
  if (!path.startsWith("/")) return false;
  if (path.includes("://")) return false;
  if (path.includes("..")) return false;
  const segments = path.split("/").filter(Boolean);
  if (segments.some((segment) => segment === "null" || segment === "undefined")) {
    return false;
  }
  return true;
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("previewSecret");
  const rawPath = request.nextUrl.searchParams.get("path");

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  if (!rawPath || !isValidPublicPath(rawPath)) {
    return new Response("Invalid preview path", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(publicPathFromCms(normalizeCmsPath(rawPath)));
}
