import configPromise from "@payload-config"
import { getPayload } from "payload"

import {
  getFeaturedProjects as getStaticFeaturedProjects,
  getProjectBySlug as getStaticProjectBySlug,
  getProjectCategories as getStaticProjectCategories,
  projects as staticProjects,
  type Project as StaticProject,
} from "@/data/projects"
import {
  getProjectImages as getStaticProjectImages,
  getProjectThumbnail as getStaticProjectThumbnail,
  type ProjectImage as StaticProjectImage,
} from "@/utils/image-association"

export interface Project {
  id: number | string
  title: string
  description: string
  category: string
  image: string
  slug: string
  year: string
  role?: string
  client?: string
  details?: StaticProject["details"]
  featured?: boolean
}

export interface ProjectImage extends StaticProjectImage {}

export interface ProjectWithThumbnail extends Project {
  thumbnailUrl: string
}

const cmsEnabled = Boolean(process.env.DATABASE_URL)

const rowText = (rows: unknown): string[] | undefined => {
  if (!Array.isArray(rows)) {
    return undefined
  }

  return rows
    .map((row) => (typeof row === "object" && row && "text" in row ? String(row.text) : ""))
    .filter(Boolean)
}

const mediaUrl = (media: unknown): string => {
  if (!media || typeof media !== "object") {
    return ""
  }

  const record = media as { url?: string; filename?: string; prefix?: string }
  if (record.url) {
    return record.url
  }

  const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "")
  if (!publicUrl || !record.filename) {
    return ""
  }

  const prefix = record.prefix ? `${record.prefix}/` : ""
  return `${publicUrl}/${prefix}${record.filename}`
}

const toProjectImage = (media: unknown, projectSlug: string, index = 0): ProjectImage | null => {
  if (!media || typeof media !== "object") {
    return null
  }

  const record = media as {
    id: string | number
    alt?: string
    caption?: string
    featured?: boolean
    filename?: string
    mimeType?: string
    order?: number
    url?: string
  }

  const src = mediaUrl(record)
  if (!src) {
    return null
  }

  return {
    id: String(record.id),
    src,
    alt: record.alt || record.caption || record.filename || projectSlug,
    caption: record.caption,
    projectSlug,
    featured: Boolean(record.featured),
    type: record.mimeType?.startsWith("video/") ? "video" : "image",
    order: record.order ?? index + 1,
  }
}

const toProject = (doc: any): Project => ({
  id: doc.id,
  title: doc.title,
  description: doc.description,
  category: doc.category,
  image: mediaUrl(doc.thumbnail),
  slug: doc.slug,
  year: doc.year,
  role: doc.role || undefined,
  client: doc.client || undefined,
  featured: Boolean(doc.featured),
  details: doc.details
    ? {
        introduction: doc.details.introduction || undefined,
        objective: doc.details.objective || undefined,
        approach: rowText(doc.details.approach),
        implementation: rowText(doc.details.implementation),
        outcomes: rowText(doc.details.outcomes),
        takeaway: doc.details.takeaway || undefined,
      }
    : undefined,
})

const toProjectWithThumbnail = (doc: any): ProjectWithThumbnail => {
  const project = toProject(doc)
  const thumbnail = toProjectImage(doc.thumbnail, project.slug)

  return {
    ...project,
    thumbnailUrl: thumbnail?.src || project.image || "/placeholder.svg",
  }
}

const getPayloadClient = async () => getPayload({ config: configPromise })

export async function getAllProjects(): Promise<Project[]> {
  if (!cmsEnabled) {
    return staticProjects
  }

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: "projects",
    depth: 2,
    limit: 100,
    sort: "-year",
  })

  return result.docs.map(toProject)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!cmsEnabled) {
    return getStaticFeaturedProjects()
  }

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: "projects",
    depth: 2,
    limit: 100,
    where: {
      featured: {
        equals: true,
      },
    },
  })

  return result.docs.map(toProject)
}

export async function getAllProjectsWithThumbnails(): Promise<ProjectWithThumbnail[]> {
  if (!cmsEnabled) {
    return staticProjects.map((project) => {
      const thumbnail = getStaticProjectThumbnail(project.slug)
      return {
        ...project,
        thumbnailUrl: thumbnail?.src || project.image || "/placeholder.svg",
      }
    })
  }

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: "projects",
    depth: 2,
    limit: 100,
  })

  return result.docs.map(toProjectWithThumbnail)
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!cmsEnabled) {
    return getStaticProjectBySlug(slug)
  }

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: "projects",
    depth: 2,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] ? toProject(result.docs[0]) : undefined
}

export async function getProjectWithImagesBySlug(
  slug: string,
): Promise<{ images: ProjectImage[]; project: Project } | undefined> {
  if (!cmsEnabled) {
    const project = getStaticProjectBySlug(slug)
    return project ? { project, images: getStaticProjectImages(slug) } : undefined
  }

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: "projects",
    depth: 2,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const doc = result.docs[0] as any
  if (!doc) {
    return undefined
  }

  const gallery: unknown[] = Array.isArray(doc.gallery) ? doc.gallery : []
  return {
    project: toProject(doc),
    images: gallery
      .map((media: unknown, index: number) => toProjectImage(media, doc.slug, index))
      .filter((image): image is ProjectImage => Boolean(image)),
  }
}

export async function getProjectCategories(): Promise<string[]> {
  if (!cmsEnabled) {
    return getStaticProjectCategories()
  }

  const projects = await getAllProjects()
  const categories = Array.from(new Set(projects.map((project) => project.category.trim())))
  return ["all", ...categories.sort()]
}
