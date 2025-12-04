import { ProjectImage, projectImages } from "@/data/project-images"

export { projectImages }
export type { ProjectImage }

/**
 * Get all images associated with a specific project
 */
export function getProjectImages(projectSlug: string): ProjectImage[] {
  return projectImages
    .filter((image) => image.projectSlug === projectSlug)
    .sort((a, b) => (a.order || 999) - (b.order || 999))
}

/**
 * Get featured images for a specific project
 */
export function getProjectFeaturedImages(projectSlug: string): ProjectImage[] {
  return projectImages
    .filter((image) => image.projectSlug === projectSlug && image.featured)
    .sort((a, b) => (a.order || 999) - (b.order || 999))
}

/**
 * Get a single featured image for a project (for thumbnails)
 */
export function getProjectThumbnail(projectSlug: string): ProjectImage | undefined {
  // Try to get featured images first
  const featured = getProjectFeaturedImages(projectSlug)
  if (featured.length > 0) return featured[0]

  // Fallback to any image from the project
  const allImages = getProjectImages(projectSlug)
  return allImages.length > 0 ? allImages[0] : undefined
}

/**
 * Get images by project category
 */
export function getImagesByCategory(category: string): ProjectImage[] {
  // This would need to be enhanced to map category to project slugs
  return projectImages.filter((image) => {
    // Add logic to filter by project category if needed
    return true
  })
}

/**
 * Dynamically associate new images with projects based on filename
 * This function would be used when processing uploaded images
 */
export function associateImageWithProject(filename: string, src: string): ProjectImage | null {
  // Convert filename to lowercase for case-insensitive matching
  const lowerFilename = filename.toLowerCase()

  // Extract project slug from filename using regex
  // This looks for project names in the format: project-name-something.ext
  const projectMatch = lowerFilename.match(/^([a-z0-9-]+)-project/)

  if (!projectMatch) {
    return null
  }

  const projectSlug = projectMatch[1]

  // Generate a unique ID
  const id = `${projectSlug}-${Date.now()}`

  // Create a new project image
  const newImage: ProjectImage = {
    id,
    src,
    alt: `Image for ${projectSlug} project`,
    projectSlug,
    order: projectImages.filter((img) => img.projectSlug === projectSlug).length + 1,
  }

  // In a real application, you would save this to a database
  // For this example, we'll just return the new image
  return newImage
}

/**
 * Process a batch of images and associate them with projects
 */
export function processBatchImages(files: { name: string; url: string }[]): ProjectImage[] {
  const newImages: ProjectImage[] = []

  for (const file of files) {
    const image = associateImageWithProject(file.name, file.url)
    if (image) {
      newImages.push(image)
    }
  }

  return newImages
}

/**
 * Helper function to get project directory structure
 */
export function getProjectDirectories(): Record<string, string> {
  return {
    "siglo-sky-lounge": "/projects/siglo-sky-lounge/",
    smcp: "/projects/smcp/",
    "royal-batu-bolong": "/projects/royal-batu-bolong/",
    "iqbal-dinda-campaign": "/projects/iqbal-dinda-campaign/",
    "fornas-viii-ntb-2025": "/projects/fornas-viii-ntb-2025/",
    "explore-lombok": "/projects/explore-lombok/",
    "amok-research": "/projects/amok-research/",
    "world-field-archery-2025": "/projects/world-field-archery-2025/",
    "paragliding-accuracy-world-cup-2025": "/projects/paragliding-accuracy-world-cup-2025/",
    "hikayat-ampenan": "/projects/hikayat-ampenan/",
    kinta: "/projects/kinta/",
    loka: "/projects/loka/",
    "balakosa-coffee": "/projects/balakosa-coffee/",
    hotel: "/projects/hotel/",
    "busfi-arusagara-campaign": "/projects/busfi-arusagara-campaign/",
    "resto-kenangan": "/projects/resto-kenangan/",
    "switch-on-creative": "/projects/switch-on-creative/",
  }
}

/**
 * Helper function to validate image paths
 */
export function validateImagePath(projectSlug: string, imageName: string): string {
  const directories = getProjectDirectories()
  const baseDir = directories[projectSlug]

  if (!baseDir) {
    console.warn(`No directory found for project: ${projectSlug}`)
    return `/placeholder.svg?height=400&width=600&text=${projectSlug}`
  }

  return `${baseDir}${imageName}`
}