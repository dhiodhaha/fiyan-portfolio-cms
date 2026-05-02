import type { CollectionConfig } from "payload"

const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "")

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "alt",
  },
  upload: {
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        width: 600,
        height: 450,
        position: "centre",
      },
    ],
    mimeTypes: ["image/*", "video/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
    {
      name: "projectSlug",
      type: "text",
      admin: {
        description: "Optional legacy project slug used by the seed/import script.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (!publicUrl || !doc?.filename) {
          return doc
        }

        const prefix = typeof doc.prefix === "string" && doc.prefix.length > 0 ? `${doc.prefix}/` : ""
        return {
          ...doc,
          url: `${publicUrl}/${prefix}${doc.filename}`,
        }
      },
    ],
  },
}
