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
  projectImages as staticProjectImages,
  type ProjectImage as StaticProjectImage,
} from "@/utils/image-association"
import { sortProjectsByYear } from "@/utils/category-utils"
import { type ProjectRichText } from "@/lib/project-rich-text"

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
  content?: ProjectRichText
  details?: StaticProject["details"]
  featured?: boolean
}

export interface ProjectImage extends StaticProjectImage {
  detailSrc?: string
  lightboxSrc?: string
  thumbnailSrc?: string
}

export interface ProjectWithThumbnail extends Project {
  thumbnailUrl: string
}

export interface LandingProject extends Project {
  images: ProjectImage[]
  thumbnail?: ProjectImage
}

const cmsEnabled = Boolean(process.env.DATABASE_URL)
const optimizedProjectThumbnailBySlug = new Map<string, string>([
  ["amok-research", "/project-thumbnails/amok-research.webp"],
  ["balakosa-coffee", "/project-thumbnails/balakosa-coffee.webp"],
  ["busfi-arusagara-campaign", "/project-thumbnails/busfi-arusagara-campaign.webp"],
  ["explore-lombok", "/project-thumbnails/explore-lombok.webp"],
  ["fornas-viii-ntb-2025", "/project-thumbnails/fornas-viii-ntb-2025.webp"],
  ["hikayat-ampenan", "/project-thumbnails/hikayat-ampenan.webp"],
  ["hotel", "/project-thumbnails/hotel.webp"],
  ["iqbal-dinda-campaign", "/project-thumbnails/iqbal-dinda-campaign.webp"],
  ["kinta", "/project-thumbnails/kinta.webp"],
  ["loka", "/project-thumbnails/loka.webp"],
  ["paragliding-accuracy-world-cup-2025", "/project-thumbnails/paragliding-accuracy-world-cup-2025.webp"],
  ["resto-kenangan", "/project-thumbnails/resto-kenangan.webp"],
  ["royal-batu-bolong", "/project-thumbnails/royal-batu-bolong.webp"],
  ["siglo-sky-lounge", "/project-thumbnails/siglo-sky-lounge.webp"],
  ["smcp", "/project-thumbnails/smcp.webp"],
  ["switch-on-creative", "/project-thumbnails/switch-on-creative.webp"],
  ["world-field-archery-2025", "/project-thumbnails/world-field-archery-2025.webp"],
])
const staticImageByFilename = new Map(
  staticProjectImages.map((image) => {
    const filename = image.src.split("/").pop() || image.src
    return [filename, image.src] as const
  }),
)

const rowText = (rows: unknown): string[] | undefined => {
  if (!Array.isArray(rows)) {
    return undefined
  }

  return rows
    .map((row) => (typeof row === "object" && row && "text" in row ? String(row.text) : ""))
    .filter(Boolean)
}

const staticMediaUrl = (record: { filename?: string; url?: string }) => {
  const filename = record.filename || record.url?.split("/").pop()

  return filename ? staticImageByFilename.get(filename) : undefined
}

const optimizedProjectThumbnailUrl = (projectSlug: string) => optimizedProjectThumbnailBySlug.get(projectSlug)

const staticProjectMediaVariantUrl = (src: string, variant: "detail" | "lightbox" | "thumb") => {
  if (!src.startsWith("/projects/")) {
    return undefined
  }

  const parts = src.split("/")
  const projectSlug = parts[2]
  const filename = parts.at(-1)

  if (!projectSlug || !filename) {
    return undefined
  }

  const basename = filename.replace(/\.[^.]+$/, "")
  return `/project-media/${projectSlug}/${basename}-${variant}.webp`
}

const withOptimizedStaticImageVariants = (image: StaticProjectImage): ProjectImage => ({
  ...image,
  thumbnailSrc: image.thumbnailSrc || staticProjectMediaVariantUrl(image.src, "thumb") || image.src,
  detailSrc: image.detailSrc || staticProjectMediaVariantUrl(image.src, "detail") || image.src,
  lightboxSrc: image.lightboxSrc || staticProjectMediaVariantUrl(image.src, "lightbox") || image.src,
})

const mediaUrl = (media: unknown): string => {
  if (!media || typeof media !== "object") {
    return ""
  }

  const record = media as { thumbnailURL?: string; url?: string; filename?: string; prefix?: string }
  const staticUrl = staticMediaUrl(record)
  if (staticUrl) {
    return staticUrl
  }

  if (record.url) {
    return record.url
  }

  if (record.thumbnailURL) {
    return record.thumbnailURL
  }

  const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "")
  if (!publicUrl || !record.filename) {
    return ""
  }

  const prefix = record.prefix ? `${record.prefix}/` : ""
  return `${publicUrl}/${prefix}${record.filename}`
}

const mediaSizeUrl = (media: unknown, sizeName: string): string => {
  if (!media || typeof media !== "object") {
    return ""
  }

  const record = media as {
    prefix?: string
    sizes?: Record<string, { filename?: string; url?: string }>
  }
  const size = record.sizes?.[sizeName]

  if (size?.url) {
    return size.url
  }

  if (size?.filename) {
    return mediaUrl({ filename: size.filename, prefix: record.prefix })
  }

  return ""
}

const thumbnailMediaUrl = (media: unknown): string => {
  if (!media || typeof media !== "object") {
    return ""
  }

  const record = media as { thumbnailURL?: string }
  return mediaSizeUrl(media, "thumbnail") || record.thumbnailURL || mediaUrl(media)
}

const toProjectImage = (media: unknown, projectSlug: string, index = 0): ProjectImage | null => {
  if (!media || typeof media !== "object") {
    return null
  }

  const record = media as {
    id: string | number
    alt?: string
    caption?: string
    description?: string
    featured?: boolean
    filename?: string
    mimeType?: string
    order?: number
    sizes?: Record<string, { filename?: string; url?: string }>
    thumbnailURL?: string
    url?: string
  }

  const src = mediaUrl(record)
  if (!src) {
    return null
  }
  const staticSrc = staticMediaUrl(record)
  const staticThumbnailSrc = staticSrc ? staticProjectMediaVariantUrl(staticSrc, "thumb") : undefined
  const staticDetailSrc = staticSrc ? staticProjectMediaVariantUrl(staticSrc, "detail") : undefined
  const staticLightboxSrc = staticSrc ? staticProjectMediaVariantUrl(staticSrc, "lightbox") : undefined

  return {
    id: String(record.id),
    src,
    alt: record.alt || record.caption || record.filename || projectSlug,
    caption: record.caption,
    description: record.description,
    thumbnailSrc: mediaSizeUrl(record, "gallery") || staticThumbnailSrc || mediaSizeUrl(record, "thumbnail") || record.thumbnailURL || src,
    detailSrc: mediaSizeUrl(record, "detail") || staticDetailSrc || mediaSizeUrl(record, "lightbox") || staticLightboxSrc || src,
    lightboxSrc: mediaSizeUrl(record, "lightbox") || staticLightboxSrc || mediaSizeUrl(record, "detail") || staticDetailSrc || src,
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
  content: doc.content || undefined,
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
    thumbnailUrl:
      optimizedProjectThumbnailUrl(project.slug) || thumbnailMediaUrl(doc.thumbnail) || thumbnail?.src || project.image || "/placeholder.svg",
  }
}

const toLandingProject = (doc: any): LandingProject => {
  const project = toProject(doc)
  const thumbnail = toProjectImage(doc.thumbnail, project.slug) || undefined
  const gallery: unknown[] = Array.isArray(doc.gallery) ? doc.gallery : []
  const images = gallery
    .map((media: unknown, index: number) => toProjectImage(media, doc.slug, index))
    .filter((image): image is ProjectImage => Boolean(image))

  return {
    ...project,
    thumbnail,
    images: images.length > 0 ? images : thumbnail ? [thumbnail] : [],
  }
}

const getPayloadClient = async () => getPayload({ config: configPromise })

const getStaticLandingProjects = (): LandingProject[] =>
  sortProjectsByYear(getStaticFeaturedProjects()).map((project) => {
    const thumbnail = getStaticProjectThumbnail(project.slug)
    const optimizedThumbnail = thumbnail ? withOptimizedStaticImageVariants(thumbnail) : undefined
    const images = getStaticProjectImages(project.slug).map(withOptimizedStaticImageVariants)

    return {
      ...project,
      image: thumbnail?.src || project.image || "",
      thumbnail: optimizedThumbnail,
      images: images.length > 0 ? images : optimizedThumbnail ? [optimizedThumbnail] : [],
    }
  })

const getStaticProjectsWithThumbnails = (): ProjectWithThumbnail[] =>
  staticProjects.map((project) => {
    const thumbnail = getStaticProjectThumbnail(project.slug)

    return {
      ...project,
      thumbnailUrl: optimizedProjectThumbnailUrl(project.slug) || thumbnail?.src || project.image || "/placeholder.svg",
    }
  })

const getStaticProjectWithImagesBySlug = (
  slug: string,
): { images: ProjectImage[]; project: Project } | undefined => {
  const project = getStaticProjectBySlug(slug)

  return project ? { project, images: getStaticProjectImages(slug).map(withOptimizedStaticImageVariants) } : undefined
}

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

  return result.docs.length > 0 ? result.docs.map(toProject) : staticProjects
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

  return result.docs.length > 0 ? result.docs.map(toProject) : getStaticFeaturedProjects()
}

export async function getLandingProjects(): Promise<LandingProject[]> {
  if (!cmsEnabled) {
    return getStaticLandingProjects()
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

  return result.docs.length > 0 ? sortProjectsByYear(result.docs.map(toLandingProject)) : getStaticLandingProjects()
}

export async function getAllProjectsWithThumbnails(): Promise<ProjectWithThumbnail[]> {
  if (!cmsEnabled) {
    return getStaticProjectsWithThumbnails()
  }

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: "projects",
    depth: 2,
    limit: 100,
  })

  return result.docs.length > 0 ? result.docs.map(toProjectWithThumbnail) : getStaticProjectsWithThumbnails()
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

  return result.docs[0] ? toProject(result.docs[0]) : getStaticProjectBySlug(slug)
}

export async function getProjectWithImagesBySlug(
  slug: string,
): Promise<{ images: ProjectImage[]; project: Project } | undefined> {
  if (!cmsEnabled) {
    return getStaticProjectWithImagesBySlug(slug)
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
    return getStaticProjectWithImagesBySlug(slug)
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
