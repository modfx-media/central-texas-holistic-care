import type { GlobalConfig } from "payload";

import { authenticated } from "../collections/access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
    },
    {
      name: "defaultDescription",
      type: "textarea",
    },
    {
      name: "bookingUrl",
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
      name: "address",
      type: "text",
    },
  ],
};
