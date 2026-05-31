import type { CollectionConfig } from "payload"

const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "")
const toPublicUrl = (filename?: unknown, prefix?: unknown) => {
  if (!publicUrl || typeof filename !== "string" || !filename) {
    return undefined
  }

  const folder = typeof prefix === "string" && prefix.length > 0 ? `${prefix}/` : ""
  return `${publicUrl}/${folder}${filename}`
}

const rewriteSizeUrls = (sizes: unknown, prefix: unknown) => {
  if (!sizes || typeof sizes !== "object") {
    return sizes
  }

  return Object.fromEntries(
    Object.entries(sizes).map(([name, size]) => {
      if (!size || typeof size !== "object") {
        return [name, size]
      }

      const rewrittenUrl = toPublicUrl((size as { filename?: unknown }).filename, prefix)
      return [
        name,
        {
          ...size,
          ...(rewrittenUrl ? { url: rewrittenUrl } : {}),
        },
      ]
    }),
  )
}

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Image",
    plural: "Image Library",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["alt", "folder", "usage", "filename", "updatedAt"],
    listSearchableFields: ["alt", "caption", "filename", "projectSlug"],
    description:
      "Upload portfolio images, organize them by folder and usage, and manage the caption that follows each image everywhere it appears.",
  },
  upload: {
    adminThumbnail: ({ doc }) => {
      const sizes = doc.sizes as { thumbnail?: { filename?: string } } | undefined
      const filename = typeof doc.filename === "string" ? doc.filename : undefined
      const prefix = typeof doc.prefix === "string" ? doc.prefix : undefined
      const url = typeof doc.url === "string" ? doc.url : undefined

      return toPublicUrl(sizes?.thumbnail?.filename || filename, prefix) || url || null
    },
    imageSizes: [
      {
        name: "thumbnail",
        width: 600,
        height: 450,
        position: "centre",
      },
      {
        name: "gallery",
        width: 600,
        height: 600,
        position: "centre",
      },
      {
        name: "detail",
        width: 1600,
        height: 1200,
        position: "centre",
      },
      {
        name: "lightbox",
        width: 2400,
        height: 1800,
        position: "centre",
      },
    ],
    mimeTypes: ["image/*", "video/*"],
  },
  fields: [
    {
      name: "alt",
      label: "Alt text",
      type: "text",
      required: true,
      admin: {
        description: "Describe the image for accessibility and search.",
      },
    },
    {
      name: "caption",
      label: "Caption",
      type: "text",
      admin: {
        description: "This caption stays with this image wherever it is used.",
      },
    },
    {
      name: "folder",
      type: "select",
      defaultValue: "portfolio",
      options: [
        { label: "Portfolio", value: "portfolio" },
        { label: "Homepage", value: "homepage" },
        { label: "Article", value: "article" },
        { label: "Brand", value: "brand" },
        { label: "Archive", value: "archive" },
      ],
      admin: {
        description: "Editor-facing grouping for easier media picking.",
      },
    },
    {
      name: "usage",
      type: "select",
      defaultValue: "project",
      options: [
        { label: "Project", value: "project" },
        { label: "Article", value: "article" },
        { label: "Profile", value: "profile" },
        { label: "Site", value: "site" },
        { label: "Archive", value: "archive" },
      ],
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "Optional search helpers for editors.",
      },
    },
    {
      name: "credit",
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
      label: "Legacy featured image marker",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Used by the legacy import to identify preferred images. Article and project Featured image fields are chosen separately.",
      },
    },
    {
      name: "order",
      label: "Legacy gallery order",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Used by the legacy import to preserve project gallery ordering.",
      },
    },
  ],
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (!doc?.filename) {
          return doc
        }

        const url = toPublicUrl(doc.filename, doc.prefix)
        const sizes = rewriteSizeUrls(doc.sizes, doc.prefix)
        const thumbnailURL =
          sizes && typeof sizes === "object"
            ? Object.values(sizes).find((size) => size && typeof size === "object" && "url" in size)?.url
            : undefined

        return {
          ...doc,
          ...(url ? { url } : {}),
          ...(thumbnailURL ? { thumbnailURL } : {}),
          sizes,
        }
      },
    ],
  },
}
