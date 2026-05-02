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
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "year", "featured"],
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
      type: "checkbox",
      defaultValue: false,
      index: true,
    },
    {
      name: "thumbnail",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "gallery",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
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
