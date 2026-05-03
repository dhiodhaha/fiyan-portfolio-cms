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
