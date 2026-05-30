import type { CollectionConfig } from "payload"

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
    defaultColumns: ["title", "category", "year", "featured"],
    description:
      "Manage portfolio projects. Use Featured image for the main image and Show as landing page slide for homepage visibility.",
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
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
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
    {
      name: "thumbnail",
      label: "Featured image",
      type: "relationship",
      relationTo: "media",
      admin: {
        description: "The main image for this project. Used in cards, previews, and landing page slides.",
      },
    },
    {
      name: "gallery",
      label: "Project gallery images",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
      admin: {
        description: "Images shown in the project gallery. Captions are managed in the Image Library.",
      },
    },
    {
      name: "details",
      type: "group",
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
}
