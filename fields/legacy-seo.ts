import type { Field } from "payload"

export const legacySeoField: Field = {
  name: "seo",
  label: "Legacy SEO",
  type: "group",
  admin: {
    hidden: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "canonicalUrl",
      type: "text",
    },
    {
      name: "noIndex",
      type: "checkbox",
      defaultValue: false,
    },
  ],
}
