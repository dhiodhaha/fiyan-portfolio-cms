import type { Project as StaticProject } from "@/data/projects"

export type ProjectRichText = {
  root: {
    children: LexicalNode[]
    direction: "ltr" | "rtl" | null
    format: ""
    indent: number
    type: "root"
    version: number
  }
}

type LexicalTextNode = {
  detail: number
  format: number
  mode: "normal"
  style: string
  text: string
  type: "text"
  version: number
}

type LexicalParagraphNode = {
  children: LexicalTextNode[]
  direction: "ltr" | "rtl" | null
  format: ""
  indent: number
  textFormat: number
  textStyle: string
  type: "paragraph"
  version: number
}

type LexicalHeadingNode = {
  children: LexicalTextNode[]
  direction: "ltr" | "rtl" | null
  format: ""
  indent: number
  tag: "h2"
  type: "heading"
  version: number
}

type LexicalListItemNode = {
  checked?: boolean
  children: LexicalTextNode[]
  direction: "ltr" | "rtl" | null
  format: ""
  indent: number
  type: "listitem"
  value: number
  version: number
}

type LexicalListNode = {
  children: LexicalListItemNode[]
  direction: "ltr" | "rtl" | null
  format: ""
  indent: number
  listType: "bullet"
  start: number
  tag: "ul"
  type: "list"
  version: number
}

type LexicalBlockNode = {
  fields: Record<string, unknown>
  format?: string
  type: "block"
  version: number
}

type LexicalNode = LexicalBlockNode | LexicalHeadingNode | LexicalListNode | LexicalParagraphNode

const textNode = (text: string): LexicalTextNode => ({
  detail: 0,
  format: 0,
  mode: "normal",
  style: "",
  text,
  type: "text",
  version: 1,
})

const paragraphNode = (text: string): LexicalParagraphNode => ({
  children: [textNode(text)],
  direction: null,
  format: "",
  indent: 0,
  textFormat: 0,
  textStyle: "",
  type: "paragraph",
  version: 1,
})

const headingNode = (text: string): LexicalHeadingNode => ({
  children: [textNode(text)],
  direction: null,
  format: "",
  indent: 0,
  tag: "h2",
  type: "heading",
  version: 1,
})

const listNode = (items: string[]): LexicalListNode => ({
  children: items.map((item, index) => ({
    children: [textNode(item)],
    direction: null,
    format: "",
    indent: 0,
    type: "listitem",
    value: index + 1,
    version: 1,
  })),
  direction: null,
  format: "",
  indent: 0,
  listType: "bullet",
  start: 1,
  tag: "ul",
  type: "list",
  version: 1,
})

const appendTextSection = (children: LexicalNode[], title: string, text?: string) => {
  if (!text) {
    return
  }

  children.push(headingNode(title), paragraphNode(text))
}

const appendListSection = (children: LexicalNode[], title: string, items?: string[]) => {
  const filtered = items?.filter(Boolean)
  if (!filtered?.length) {
    return
  }

  children.push(headingNode(title), listNode(filtered))
}

export const hasRichTextContent = (content: unknown): content is ProjectRichText => {
  if (!content || typeof content !== "object" || !("root" in content)) {
    return false
  }

  const root = (content as ProjectRichText).root
  return Array.isArray(root?.children) && root.children.length > 0
}

export const projectDetailsToRichText = (details?: StaticProject["details"]): ProjectRichText | undefined => {
  if (!details) {
    return undefined
  }

  const children: LexicalNode[] = []

  appendTextSection(children, "Introduction", details.introduction)
  appendTextSection(children, "Objective", details.objective)
  appendListSection(children, "Approach", details.approach)
  appendListSection(children, "Implementation", details.implementation)
  appendListSection(children, "Outcomes", details.outcomes)
  appendTextSection(children, "Key Takeaway", details.takeaway)

  if (children.length === 0) {
    return undefined
  }

  return {
    root: {
      children,
      direction: null,
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  }
}
