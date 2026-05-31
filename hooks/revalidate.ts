import { revalidatePath } from "next/cache"
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload"

type RevalidationContext = {
  disableRevalidate?: boolean
}

const shouldSkipRevalidate = (context: unknown) => Boolean((context as RevalidationContext | undefined)?.disableRevalidate)

const revalidatePaths = (paths: string[]) => {
  for (const path of paths) {
    revalidatePath(path)
  }
}

const projectPath = (slug?: unknown) => (typeof slug === "string" && slug ? `/projects/${slug}` : undefined)
const articlePath = (slug?: unknown) => (typeof slug === "string" && slug ? `/articles/${slug}` : undefined)

export const revalidateProject: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (shouldSkipRevalidate(req.context)) {
    return doc
  }

  const paths = ["/", "/projects"]
  const currentPath = projectPath(doc?.slug)
  const oldPath = projectPath(previousDoc?.slug)

  if (currentPath && doc?._status === "published") {
    paths.push(currentPath)
  }

  if (oldPath && oldPath !== currentPath && previousDoc?._status === "published") {
    paths.push(oldPath)
  }

  revalidatePaths(paths)
  return doc
}

export const revalidateProjectDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (shouldSkipRevalidate(req.context)) {
    return doc
  }

  revalidatePaths(["/", "/projects", projectPath(doc?.slug)].filter((path): path is string => Boolean(path)))
  return doc
}

export const revalidateArticle: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (shouldSkipRevalidate(req.context)) {
    return doc
  }

  const paths = ["/"]
  const currentPath = articlePath(doc?.slug)
  const oldPath = articlePath(previousDoc?.slug)

  if (currentPath && doc?._status === "published") {
    paths.push(currentPath)
  }

  if (oldPath && oldPath !== currentPath && previousDoc?._status === "published") {
    paths.push(oldPath)
  }

  revalidatePaths(paths)
  return doc
}

export const revalidateArticleDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (shouldSkipRevalidate(req.context)) {
    return doc
  }

  revalidatePaths(["/", articlePath(doc?.slug)].filter((path): path is string => Boolean(path)))
  return doc
}

export const revalidateMedia: CollectionAfterChangeHook = ({ doc, req }) => {
  if (shouldSkipRevalidate(req.context)) {
    return doc
  }

  revalidatePaths(["/", "/projects"])
  return doc
}

export const revalidateSiteSettings: GlobalAfterChangeHook = ({ doc, req }) => {
  if (shouldSkipRevalidate(req.context)) {
    return doc
  }

  revalidatePaths(["/", "/projects", "/sitemap.xml", "/robots.txt"])
  return doc
}

export const revalidateHomePage: GlobalAfterChangeHook = ({ doc, req }) => {
  if (shouldSkipRevalidate(req.context)) {
    return doc
  }

  revalidatePaths(["/"])
  return doc
}
