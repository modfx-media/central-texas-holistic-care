import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    { name: "heading", type: "text" },
    { name: "subheading", type: "textarea" },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "breadcrumbs",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
};

export const RichTextBlock: Block = {
  slug: "richText",
  labels: { singular: "Rich text", plural: "Rich text" },
  fields: [
    {
      name: "content",
      type: "richText",
    },
  ],
};

export const FaqBlock: Block = {
  slug: "faq",
  labels: { singular: "FAQ", plural: "FAQs" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "intro", type: "textarea" },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
  ],
};

export const CtaBlock: Block = {
  slug: "cta",
  labels: { singular: "CTA", plural: "CTAs" },
  fields: [
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    { name: "buttonLabel", type: "text" },
    { name: "buttonHref", type: "text" },
  ],
};

export const pageBlocks = [HeroBlock, RichTextBlock, FaqBlock, CtaBlock];
