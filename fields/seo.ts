import type { Field } from "payload";

export const seoFields: Field[] = [
  {
    name: "canonicalUrl",
    type: "text",
    admin: {
      description: "Must match the public path when set.",
    },
  },
  {
    name: "noIndex",
    type: "checkbox",
    defaultValue: false,
  },
  {
    name: "noFollow",
    type: "checkbox",
    defaultValue: false,
  },
  {
    name: "excludeFromSitemap",
    type: "checkbox",
    defaultValue: false,
  },
  {
    name: "meta",
    type: "group",
    label: "SEO",
    fields: [
      {
        name: "title",
        type: "text",
      },
      {
        name: "description",
        type: "textarea",
      },
      {
        name: "image",
        type: "upload",
        relationTo: "media",
      },
    ],
  },
];
