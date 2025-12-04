import { projects, Project } from "@/data/projects"
import { getProjectThumbnail } from "@/utils/image-association"

export interface ProjectWithThumbnail extends Project {
  thumbnailUrl: string
}

export function getAllProjectsWithThumbnails(): ProjectWithThumbnail[] {
  return projects.map((project) => {
    const thumbnail = getProjectThumbnail(project.slug)
    return {
      ...project,
      thumbnailUrl: thumbnail?.src || project.image || "/placeholder.svg",
    }
  })
}
