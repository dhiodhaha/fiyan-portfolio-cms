import { ProjectDetail } from "@/components/project-detail"
import { RefreshRouteOnSave } from "@/components/refresh-route-on-save"
import { getProjectWithImagesBySlug } from "@/lib/projects-cms"
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

export default async function ProjectPage({ params, searchParams }: ProjectPageProps) {
  const { slug } = await params
  const query = await searchParams
  const isPreview = query?.preview === "1" || query?.preview === "true"
  const result = await getProjectWithImagesBySlug(slug, { draft: isPreview })

  if (!result) {
    return notFound()
  }

  return (
    <>
      {isPreview && <RefreshRouteOnSave />}
      <ProjectDetail project={result.project} images={result.images} />
    </>
  )
}
