import type { BlogBlock } from "@/lib/blog-data";

import { publicMediaUrl } from "./media-url";

type LexNode = {
  type?: string;
  text?: string;
  tag?: string;
  listType?: string;
  children?: LexNode[];
  fields?: {
    url?: string | null;
    linkType?: string | null;
    doc?: {
      value?: { path?: string | null; slug?: string | null } | string | number | null;
    } | null;
  } | null;
  value?: unknown;
};

function linkHref(node: LexNode): string | null {
  const fields = node.fields;
  if (!fields) return null;
  if (typeof fields.url === "string" && fields.url.trim()) return fields.url.trim();

  const value = fields.doc?.value;
  if (value && typeof value === "object") {
    if (typeof value.path === "string" && value.path.trim()) {
      const path = value.path.trim();
      return path.endsWith("/") ? path : `${path}/`;
    }
    if (typeof value.slug === "string" && value.slug.trim()) {
      return `/blog/${value.slug.trim()}/`;
    }
  }
  return null;
}

function nodeText(node: LexNode | undefined): string {
  if (!node) return "";
  if (node.type === "text") return node.text ?? "";
  if (node.type === "linebreak") return " ";
  if (node.type === "tab") return " ";
  if (node.type === "upload") return "";
  if (node.type === "link" || node.type === "autolink") {
    const label = (node.children ?? []).map((child) => nodeText(child)).join("").trim();
    const href = linkHref(node);
    if (label && href) return `[${label}](${href})`;
    return label;
  }
  return (node.children ?? []).map((child) => nodeText(child)).join("");
}

function imageFromUpload(node: LexNode): Extract<BlogBlock, { type: "image" }> | null {
  const src = publicMediaUrl(node.value);
  if (!src) return null;
  const alt =
    node.value &&
    typeof node.value === "object" &&
    "alt" in node.value &&
    typeof (node.value as { alt?: unknown }).alt === "string"
      ? (node.value as { alt: string }).alt.trim()
      : "";
  return { type: "image", src, alt: alt || undefined };
}

function emitInline(nodes: LexNode[], out: BlogBlock[]) {
  let buffer: LexNode[] = [];

  const flush = () => {
    const text = buffer
      .map((node) => nodeText(node))
      .join("")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{2,}/g, "\n")
      .replace(/[ \t]{2,}/g, " ")
      .trim();
    buffer = [];
    if (text) out.push({ type: "p", text });
  };

  for (const child of nodes) {
    if (child.type === "upload") {
      flush();
      const image = imageFromUpload(child);
      if (image) out.push(image);
      continue;
    }
    buffer.push(child);
  }
  flush();
}

function walkBlocks(nodes: LexNode[], out: BlogBlock[]) {
  for (const node of nodes) {
    if (!node || typeof node !== "object") continue;

    switch (node.type) {
      case "heading": {
        const text = nodeText(node).replace(/\s+/g, " ").trim();
        if (!text) break;
        const tag = node.tag === "h3" || node.tag === "h4" || node.tag === "h5" || node.tag === "h6" ? "h3" : "h2";
        out.push({ type: tag, text });
        break;
      }
      case "quote": {
        const text = nodeText(node).replace(/\s+/g, " ").trim();
        if (text) out.push({ type: "quote", text });
        break;
      }
      case "list": {
        const items = (node.children ?? [])
          .map((item) => nodeText(item).replace(/\s+/g, " ").trim())
          .filter((item) => item.length > 0);
        if (items.length === 0) break;
        if (node.listType === "number") {
          out.push({ type: "steps", items: items.map((text) => ({ text })) });
        } else {
          out.push({ type: "list", items });
        }
        break;
      }
      case "upload": {
        const image = imageFromUpload(node);
        if (image) out.push(image);
        break;
      }
      case "paragraph":
        emitInline(node.children ?? [], out);
        break;
      case "horizontalrule":
        break;
      default: {
        const children = node.children ?? [];
        const hasBlocks = children.some(
          (child) =>
            child.type &&
            child.type !== "text" &&
            child.type !== "link" &&
            child.type !== "autolink" &&
            child.type !== "linebreak" &&
            child.type !== "tab",
        );
        if (hasBlocks) walkBlocks(children, out);
        else emitInline(children.length > 0 ? children : [node], out);
      }
    }
  }
}

/** Convert a Payload lexical document into the designed article blocks. */
export function lexicalToBlocks(content: unknown): BlogBlock[] {
  if (!content || typeof content !== "object") return [];
  const root = (content as { root?: { children?: LexNode[] } }).root;
  if (!root || !Array.isArray(root.children)) return [];
  const blocks: BlogBlock[] = [];
  walkBlocks(root.children, blocks);
  return blocks;
}
