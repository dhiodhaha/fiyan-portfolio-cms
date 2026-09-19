import { ProjectsClient } from "@/components/projects-client"
import { getAllProjectsWithThumbnails, getProjectCategories } from "@/lib/projects-cms"

export const revalidate = 300

export default async function ProjectsPage() {
  const [categories, projects] = await Promise.all([getProjectCategories(), getAllProjectsWithThumbnails()])

  return <ProjectsClient categories={categories} projects={projects} />
}
