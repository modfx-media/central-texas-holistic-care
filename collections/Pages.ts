import type { CollectionConfig } from "payload";

import { pageBlocks } from "../fields/blocks";
import { emptyToNull } from "../fields/emptyToNull";
import { previewFromPath } from "../fields/preview";
import { seoFields } from "../fields/seo";
import { authenticated, authenticatedOrPublished } from "./access";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "path", "updatedAt"],
    livePreview: {
      url: ({ data }) =>
        previewFromPath(
          typeof data?.path === "string" ? data.path : null,
          typeof data?.slug === "string" ? data.slug : null,
        ),
    },
    preview: (data) =>
      previewFromPath(
        typeof data?.path === "string" ? data.path : null,
        typeof data?.slug === "string" ? data.slug : null,
      ),
    useAsTitle: "title",
  },
  defaultPopulate: {
    title: true,
    slug: true,
    path: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [emptyToNull],
      },
    },
    {
      name: "path",
      type: "text",
      unique: true,
      index: true,
      admin: {
        description: "Public path without a trailing slash, e.g. /about-us",
      },
      hooks: {
        beforeValidate: [emptyToNull],
      },
    },
    {
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [emptyToNull],
      },
    },
    {
      name: "sourceUrl",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "sourceUpdatedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "layout",
      type: "blocks",
      blocks: pageBlocks,
    },
    ...seoFields,
  ],
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
