import path from "path"
import { fileURLToPath } from "url"
import configPromise from "@payload-config"
import { getPayload } from "payload"

import { projectImages } from "../data/project-images"
import { projects } from "../data/projects"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const root = path.resolve(dirname, "..")

const toRows = (items?: string[]) => items?.map((text) => ({ text })) || []

const findMediaByFilename = async (payload: Awaited<ReturnType<typeof getPayload>>, basename: string) => {
  const existing = await payload.find({
    collection: "media",
    depth: 0,
    limit: 1,
    where: {
      filename: {
        equals: basename,
      },
    },
  })

  return existing.docs[0]
}

async function main() {
  const payload = await getPayload({ config: configPromise })
  const mediaByImageId = new Map<string, number>()

  for (const image of projectImages) {
    const relativePath = image.src.replace(/^\//, "")
    const filePath = path.join(root, "public", relativePath)
    const basename = path.basename(filePath)
    const existing = await findMediaByFilename(payload, basename)

    if (existing) {
      mediaByImageId.set(image.id, Number(existing.id))
      continue
    }

    const created = await payload.create({
      collection: "media",
      data: {
        alt: image.alt,
        caption: image.caption,
        featured: Boolean(image.featured),
        order: image.order || 0,
        projectSlug: image.projectSlug,
      },
      filePath,
    })

    mediaByImageId.set(image.id, Number(created.id))
  }

  for (const project of projects) {
    const images = projectImages
      .filter((image) => image.projectSlug === project.slug)
      .sort((a, b) => (a.order || 999) - (b.order || 999))

    const gallery = images
      .map((image) => mediaByImageId.get(image.id))
      .filter((id): id is number => typeof id === "number")
    const thumbnail =
      images.find((image) => image.featured && mediaByImageId.has(image.id)) || images.find((image) => mediaByImageId.has(image.id))

    const data = {
      title: project.title,
      slug: project.slug,
      description: project.description,
      category: project.category,
      year: project.year,
      role: project.role,
      client: project.client,
      featured: Boolean(project.featured),
      thumbnail: thumbnail ? mediaByImageId.get(thumbnail.id) : undefined,
      gallery,
      details: {
        introduction: project.details?.introduction,
        objective: project.details?.objective,
        approach: toRows(project.details?.approach),
        implementation: toRows(project.details?.implementation),
        outcomes: toRows(project.details?.outcomes),
        takeaway: project.details?.takeaway,
      },
    }

    const existing = await payload.find({
      collection: "projects",
      depth: 0,
      limit: 1,
      where: {
        slug: {
          equals: project.slug,
        },
      },
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: "projects",
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({
        collection: "projects",
        data,
      })
    }
  }

  payload.logger.info(`Seeded ${projects.length} projects and ${projectImages.length} media records.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
