import { BlocksFeature, FixedToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical"

import { caseStudyBlocks } from "../blocks/case-study-blocks"

export const richTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [...defaultFeatures, BlocksFeature({ blocks: caseStudyBlocks }), FixedToolbarFeature()],
})
