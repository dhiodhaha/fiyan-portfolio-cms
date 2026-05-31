import type { CollectionConfig } from "payload"
import { richTextEditor } from "../lib/payload-rich-text-editor"

const listField = (name: string, label: string) => ({
  name,
  label,
  type: "array" as const,
  fields: [
    {
      name: "text",
      type: "textarea" as const,
      required: true,
    },
  ],
})

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Portfolio Project",
    plural: "Portfolio Projects",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "year", "featured", "updatedAt"],
    listSearchableFields: ["title", "slug", "category", "client"],
    preview: (doc) => (typeof doc.slug === "string" ? `/projects/${doc.slug}?preview=1` : null),
    livePreview: {
      url: ({ data }) => (typeof data.slug === "string" ? `/projects/${data.slug}?preview=1` : null),
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 390,
          height: 844,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 1100,
        },
      ],
    },
    description:
      "Manage portfolio case studies. Write the body like an article, then choose featured and gallery images from the Media Library.",
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
      type: "tabs",
      tabs: [
        {
          label: "Content",
          description: "Write this project like a case-study article. Use headings, lists, links, and embedded media.",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              index: true,
            },
            {
              name: "description",
              type: "textarea",
              required: true,
              admin: {
                description: "Short summary used in cards and project headers.",
              },
            },
            {
              name: "content",
              label: "Project body",
              type: "richText",
              editor: richTextEditor,
              admin: {
                description:
                  "Main case-study content. Existing seeded details have been converted here so editors can write normally.",
              },
            },
          ],
        },
        {
          label: "Project info",
          fields: [
            {
              name: "category",
              type: "text",
              required: true,
              index: true,
            },
            {
              name: "year",
              type: "text",
              required: true,
            },
            {
              name: "role",
              type: "text",
            },
            {
              name: "client",
              type: "text",
            },
            {
              name: "featured",
              label: "Show as landing page slide",
              type: "checkbox",
              defaultValue: false,
              index: true,
              admin: {
                description: "When enabled, this project appears in the homepage slide presentation.",
              },
            },
          ],
        },
        {
          label: "Media",
          description: "Choose images from the Media Library. Payload shows upload previews here, not just text chips.",
          fields: [
            {
              name: "thumbnail",
              label: "Featured image",
              type: "upload",
              relationTo: "media",
              displayPreview: true,
              admin: {
                description: "The main image for this project. Used in cards, previews, and landing page slides.",
                sortOptions: "-updatedAt",
              },
            },
            {
              name: "gallery",
              label: "Project gallery images",
              type: "upload",
              relationTo: "media",
              hasMany: true,
              displayPreview: true,
              admin: {
                description: "Images shown in the project gallery. Captions are managed in the Image Library.",
                isSortable: true,
                sortOptions: "-updatedAt",
              },
            },
          ],
        },
        {
          label: "Legacy details",
          description:
            "Read-only migration fallback for older project detail fields. New edits should happen in Project body.",
          fields: [
            {
              name: "details",
              type: "group",
              admin: {
                readOnly: true,
              },
              fields: [
                {
                  name: "introduction",
                  type: "textarea",
                },
                {
                  name: "objective",
                  type: "textarea",
                },
                listField("approach", "Approach"),
                listField("implementation", "Implementation"),
                listField("outcomes", "Outcomes"),
                {
                  name: "takeaway",
                  type: "textarea",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
