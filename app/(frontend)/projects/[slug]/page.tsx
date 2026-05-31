import { AdminBar } from "@/components/admin-bar"
import { ProjectDetail } from "@/components/project-detail"
import { RefreshRouteOnSave } from "@/components/refresh-route-on-save"
import { isPreviewRequest } from "@/lib/preview"
import { getProjectWithImagesBySlug } from "@/lib/projects-cms"
import { getSiteSettings } from "@/lib/site-settings"
import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{
    preview?: string
  }>
}

export const dynamic = "force-dynamic"

export async function generateMetadata({ params, searchParams }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const query = await searchParams
  const draft = await draftMode()
  const isPreview = draft.isEnabled || isPreviewRequest(query?.preview)
  const [settings, result] = await Promise.all([
    getSiteSettings(),
    getProjectWithImagesBySlug(slug, { draft: isPreview }),
  ])

  if (!result) {
    return {
      title: "Project not found",
    }
  }

  const { project, images } = result
  const title = project.seo?.title || `${project.title} | ${settings.siteName}`
  const description = project.seo?.description || project.description
  const image =
    project.seo?.image || images[0]?.detailSrc || images[0]?.src || project.image || settings.defaultSEO.image
  const canonical = project.seo?.canonicalUrl || `/projects/${project.slug}`
  const allowIndex = !isPreview && !project.seo?.noIndex

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      siteName: settings.siteName,
      title,
      description,
      url: canonical,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: {
      index: allowIndex,
      follow: allowIndex,
    },
  }
}

export default async function ProjectPage({ params, searchParams }: ProjectPageProps) {
  const { slug } = await params
  const query = await searchParams
  const draft = await draftMode()
  const isPreview = draft.isEnabled || isPreviewRequest(query?.preview)
  const result = await getProjectWithImagesBySlug(slug, { draft: isPreview })

  if (!result) {
    return notFound()
  }

  return (
    <>
      <AdminBar
        collectionLabels={{ plural: "Portfolio Projects", singular: "Portfolio Project" }}
        collectionSlug="projects"
        id={String(result.project.id)}
        preview={isPreview}
      />
      {isPreview && <RefreshRouteOnSave />}
      <ProjectDetail project={result.project} images={result.images} />
    </>
  )
}
