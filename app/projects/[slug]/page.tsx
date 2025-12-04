import { getProjectBySlug } from "@/data/projects"
import { ProjectDetail } from "@/components/project-detail"
import { notFound } from "next/navigation"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return notFound()
  }

  return <ProjectDetail project={project} />
}
