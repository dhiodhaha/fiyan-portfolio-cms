import { FixedToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical"

export const richTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
})
