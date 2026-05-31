import type { Field } from "payload"

export const seoField: Field = {
  name: "seo",
  label: "SEO",
  type: "group",
  admin: {
    description: "Optional search and sharing metadata. Empty values fall back to the page title and summary.",
  },
  fields: [
    {
      name: "title",
      label: "SEO title",
      type: "text",
      admin: {
        description: "Recommended length: around 50-60 characters.",
      },
    },
    {
      name: "description",
      label: "SEO description",
      type: "textarea",
      admin: {
        description: "Recommended length: around 140-160 characters.",
      },
    },
    {
      name: "image",
      label: "Share image",
      type: "upload",
      relationTo: "media",
      displayPreview: true,
      admin: {
        description: "Used for Open Graph and social previews.",
        sortOptions: "-updatedAt",
      },
    },
    {
      name: "canonicalUrl",
      label: "Canonical URL",
      type: "text",
      admin: {
        description: "Optional full canonical URL for this page.",
      },
    },
    {
      name: "noIndex",
      label: "Hide from search engines",
      type: "checkbox",
      defaultValue: false,
    },
  ],
}
