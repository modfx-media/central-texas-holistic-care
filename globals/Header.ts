import type { GlobalConfig } from "payload";

import { authenticated } from "../collections/access";

export const Header: GlobalConfig = {
  slug: "header",
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
    {
      name: "bookingUrl",
      type: "text",
    },
    {
      name: "nav",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
        { name: "pulse", type: "checkbox", defaultValue: false },
        {
          name: "children",
          type: "array",
          fields: [
            { name: "label", type: "text" },
            { name: "href", type: "text" },
            { name: "description", type: "text" },
          ],
        },
      ],
    },
  ],
};
