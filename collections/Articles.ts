import type { CollectionConfig } from "payload"
import { seoField } from "../fields/seo"
import { richTextEditor } from "../lib/payload-rich-text-editor"
import { publishedOrAuthenticated } from "./access"

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: {
    singular: "Article",
    plural: "Articles",
  },
  access: {
    read: publishedOrAuthenticated,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt", "updatedAt"],
    listSearchableFields: ["title", "slug", "description"],
    description:
      "Create portfolio articles with a full rich-text editor. Choose images from the Image Library; captions are edited on each image.",
  },
  versions: {
    drafts: {
      autosave: {
        interval: 500,
      },
    },
  },
  fields: [
    {
      name: "title",
      label: "Article title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Article slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "A short URL-safe name for this article, for example campaign-notes.",
      },
    },
    {
      name: "description",
      label: "Short description",
      type: "textarea",
      required: true,
      admin: {
        description: "A brief summary for previews and future article listings.",
      },
    },
    {
      name: "content",
      label: "Legacy plain-text content",
      type: "textarea",
      admin: {
        description: "Older plain-text article body. New articles should use Rich article body.",
        readOnly: true,
      },
    },
    {
      name: "body",
      label: "Rich article body",
      type: "richText",
      editor: richTextEditor,
      required: true,
      admin: {
        description: "Write the article body here with headings, lists, links, and embedded media.",
      },
    },
    {
      name: "featuredImage",
      label: "Featured image",
      type: "upload",
      relationTo: "media",
      displayPreview: true,
      admin: {
        description: "The main image for this article. Captions are managed in the Image Library.",
        sortOptions: "-updatedAt",
      },
    },
    {
      name: "images",
      label: "Images used in this article",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      displayPreview: true,
      admin: {
        description: "Optional supporting images. Each image caption comes from the Image Library.",
        isSortable: true,
        sortOptions: "-updatedAt",
      },
    },
    {
      name: "status",
      label: "Article status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
      admin: {
        description: "Legacy editorial label. Use Payload's Publish controls for actual public visibility.",
      },
    },
    {
      name: "publishedAt",
      label: "Publish date",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    seoField,
  ],
}
