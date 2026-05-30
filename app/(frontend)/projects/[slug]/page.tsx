import { ProjectDetail } from "@/components/project-detail"
import { getProjectWithImagesBySlug } from "@/lib/projects-cms"
import { notFound } from "next/navigation"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = "force-dynamic"

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const result = await getProjectWithImagesBySlug(slug)

  if (!result) {
    return notFound()
  }

  return <ProjectDetail project={result.project} images={result.images} />
}
