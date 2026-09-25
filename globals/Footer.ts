import type { GlobalConfig } from "payload";

import { authenticated } from "../collections/access";

const linkFields = [
  { name: "label", type: "text" as const },
  { name: "href", type: "text" as const },
  { name: "external", type: "checkbox" as const, defaultValue: false },
];

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "tagline",
      type: "text",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "phoneTel",
      type: "text",
    },
    {
      name: "addressLine1",
      type: "text",
    },
    {
      name: "addressLine2",
      type: "text",
    },
    {
      name: "hours",
      type: "text",
    },
    {
      name: "quickLinks",
      type: "array",
      fields: linkFields,
    },
    {
      name: "services",
      type: "array",
      fields: linkFields,
    },
  ],
};
