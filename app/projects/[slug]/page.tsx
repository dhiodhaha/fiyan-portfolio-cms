import { getProjectBySlug } from "@/data/projects"
import { ProjectDetail } from "@/components/project-detail"
import { notFound } from "next/navigation"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return notFound()
  }

  return <ProjectDetail project={project} />
}
