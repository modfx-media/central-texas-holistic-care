import type { CollectionConfig } from "payload";

import { authenticated } from "./access";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: "alt",
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
  upload: {
    // An explicit allow-list makes Payload read the whole uploaded file back after a client upload.
    // Without it, files over 1 MB hang while Payload probes the image header, so the image never attaches.
    mimeTypes: ["image/*", "application/pdf"],
    staticDir: "media",
  },
};
