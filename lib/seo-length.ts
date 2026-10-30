import type { Metadata } from "next";

import { SITE_NAME } from "./site";

export const TITLE_LIMIT = 60;
export const DESCRIPTION_LIMIT = 158;

const BRAND_SUFFIX = ` | ${SITE_NAME}`;
const SHORT_SUFFIX = " | CTHC";

const DANGLING =
  /(?:\s+(?:in|via|from|about|and|or|the|a|an|of|for|with|to|at|on|by|near))+$/i;

/** Trim on a word boundary. Never splits a word. */
export function trimAtWord(value: string, max: number): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) {
    return clean.replace(/[\s,;:|–—-]+$/g, "").trim();
  }
  const window = clean.slice(0, max + 1);
  let cutAt = window.lastIndexOf(" ");
  if (cutAt < 24) cutAt = clean.lastIndexOf(" ", max);
  let cut = (cutAt > 0 ? clean.slice(0, cutAt) : clean.slice(0, max)).trim();
  cut = cut.replace(/[\s,;:|–—-]+$/g, "").trim();
  while (DANGLING.test(cut) && cut.length > 24) {
    cut = cut.replace(DANGLING, "").replace(/[\s,;:|–—-]+$/g, "").trim();
  }
  return cut;
}

function stripBrand(value: string): string {
  return value.replace(new RegExp(`\\s*\\|\\s*${SITE_NAME}\\s*$`), "").trim();
}

/**
 * Final document title, at most 60 characters, not cut mid-word.
 * Keeps the full clinic name when it fits, otherwise uses CTHC.
 */
export function fitTitle(input: string): string {
  const clean = input.replace(/\s+/g, " ").trim();
  if (!clean) return clean;

  if (clean.length <= TITLE_LIMIT && clean.includes("|")) return clean;

  const core = stripBrand(clean);
  const withBrand = `${core}${BRAND_SUFFIX}`;
  if (withBrand.length <= TITLE_LIMIT) return withBrand;

  const withoutTx = core.replace(/, TX$/i, "");
  const brandNoTx = `${withoutTx}${BRAND_SUFFIX}`;
  if (withoutTx !== core && brandNoTx.length <= TITLE_LIMIT) return brandNoTx;

  const withShort = `${core}${SHORT_SUFFIX}`;
  if (withShort.length <= TITLE_LIMIT) return withShort;

  const shortNoTx = `${withoutTx}${SHORT_SUFFIX}`;
  if (withoutTx !== core && shortNoTx.length <= TITLE_LIMIT) return shortNoTx;

  const room = TITLE_LIMIT - SHORT_SUFFIX.length;
  const trimmed = trimAtWord(withoutTx, room);
  const fitted = `${trimmed}${SHORT_SUFFIX}`;
  if (fitted.length <= TITLE_LIMIT) return fitted;
  return trimAtWord(clean, TITLE_LIMIT);
}

/** Split on sentence endings, including a period that sits inside a closing quote. */
export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?]['"]?)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * Meta description at most 158 characters.
 * Keeps whole sentences. A single overlong sentence is cut on a comma or
 * semicolon, then closed with a period, so it does not stop mid-phrase.
 */
export function fitDescription(input: string): string {
  const clean = input.replace(/\s+/g, " ").trim();
  if (!clean) return clean;
  if (clean.length <= DESCRIPTION_LIMIT && /[.!?]['"]?$/.test(clean)) return clean;

  const sentences = splitSentences(clean);
  let built = "";
  for (const sentence of sentences) {
    if (sentence.length > DESCRIPTION_LIMIT) break;
    const next = built ? `${built} ${sentence}` : sentence;
    if (next.length <= DESCRIPTION_LIMIT) built = next;
    else break;
  }
  if (built.length >= 40 && /[.!?]['"]?$/.test(built)) return built;

  const source = sentences[0] || clean;
  const room = DESCRIPTION_LIMIT - 1;
  let cutAt = -1;
  for (const mark of [";", ","]) {
    const idx = source.lastIndexOf(mark, room);
    if (idx > cutAt) cutAt = idx;
  }
  const clause = (cutAt >= 40 ? source.slice(0, cutAt) : trimAtWord(source, room))
    .replace(/[\s,;:–—-]+$/g, "")
    .trim();
  return /[.!?]['"]?$/.test(clause) ? clause : `${clause}.`;
}

function titleText(title: Metadata["title"]): string | undefined {
  if (!title) return undefined;
  if (typeof title === "string") return title;
  if ("absolute" in title && typeof title.absolute === "string" && title.absolute) {
    return title.absolute;
  }
  if ("default" in title && typeof title.default === "string") return title.default;
  return undefined;
}

/** Force rendered title and description inside the audit limits. */
export function clampSeoMetadata(meta: Metadata): Metadata {
  const rawTitle = titleText(meta.title);
  const rawDescription = typeof meta.description === "string" ? meta.description : undefined;
  if (!rawTitle && rawDescription === undefined) return meta;

  const title = rawTitle ? fitTitle(rawTitle) : undefined;
  const description = rawDescription !== undefined ? fitDescription(rawDescription) : undefined;

  const openGraph = meta.openGraph
    ? {
        ...meta.openGraph,
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
      }
    : meta.openGraph;

  const twitter = meta.twitter
    ? {
        ...meta.twitter,
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
      }
    : meta.twitter;

  return {
    ...meta,
    ...(title ? { title: { absolute: title } } : {}),
    ...(description !== undefined ? { description } : {}),
    ...(openGraph ? { openGraph } : {}),
    ...(twitter ? { twitter } : {}),
  };
}
