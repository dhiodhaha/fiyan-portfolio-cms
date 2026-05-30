import type { CollectionConfig } from "payload"

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: {
    singular: "Article",
    plural: "Articles",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt", "updatedAt"],
    description:
      "Create portfolio articles. Choose a Featured image from the Image Library; captions are edited on each image.",
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
      label: "Article content",
      type: "textarea",
      required: true,
      admin: {
        description: "Write the article body here.",
      },
    },
    {
      name: "featuredImage",
      label: "Featured image",
      type: "relationship",
      relationTo: "media",
      admin: {
        description: "The main image for this article. Captions are managed in the Image Library.",
      },
    },
    {
      name: "images",
      label: "Images used in this article",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
      admin: {
        description: "Optional supporting images. Each image caption comes from the Image Library.",
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
  ],
}
