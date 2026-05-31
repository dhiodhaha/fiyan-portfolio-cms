import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { getPayload } from "payload"

import { projectImages } from "../data/project-images"
import { projects } from "../data/projects"
import { projectDetailsToRichText } from "../lib/project-rich-text"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const root = path.resolve(dirname, "..")

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return
  }

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) {
      continue
    }

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (!match || process.env[match[1]] !== undefined) {
      continue
    }

    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "")
  }
}

function loadLocalEnv() {
  loadEnvFile(path.join(root, ".env.local"))
  loadEnvFile(path.join(root, ".env"))
}

const toRows = (items?: string[]) => items?.map((text) => ({ text })) || []
const toTags = (labels: string[]) => labels.map((label) => ({ label }))
const seedContext = {
  disableRevalidate: true,
}

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
  loadLocalEnv()
  const { default: configPromise } = await import("../payload.config.ts")
  const payload = await getPayload({ config: configPromise })
  const mediaByImageId = new Map<string, number>()

  await payload.updateGlobal({
    slug: "site-settings",
    context: seedContext,
    data: {
      eyebrow: "Strategic Communications & Project Management",
      ownerName: "Lalu Fityan Dawam Syarief",
      siteName: "Lalu Fityan Portfolio",
      description:
        "A results-driven Strategic Communications and Project Manager with a Master's in Communication Science. I transform complex challenges into successful campaigns, from high-stakes political branding to international event management, always delivering measurable, data-backed outcomes.",
      email: "lalufityandawamsyarief@gmail.com",
      location: "Indonesia - UTC+7",
      services: [
        { label: "Political Branding" },
        { label: "Digital Strategy" },
        { label: "Event Management" },
        { label: "Project Management" },
        { label: "Content Strategy" },
        { label: "Creative Direction" },
      ],
      socials: [
        {
          href: "https://linkedin.com/in/lalufityan/",
          label: "linkedin",
        },
        {
          href: "https://instagram.com/fiyanzaki",
          label: "instagram @fiyanzaki",
        },
      ],
      navigation: [
        { href: "/", label: "Home" },
        { href: "/projects", label: "Projects" },
        { href: "/#connect", label: "Contact" },
        {
          href: "https://docs.google.com/document/d/13IG0d7LuFpOaRBssLf7zdI6xS9csAIey80tGFTtKhb4/edit?usp=sharing",
          label: "Resume",
          openInNewTab: true,
        },
      ],
      defaultSEO: {
        title: "Lalu Fityan | Strategic Communications & Project Management Expert",
        description:
          "Proven Strategic Communications and Project Management professional with Master's in Communication Science. Delivered 80%+ campaign growth, managed 25,000+ event participants, and secured electoral victories through data-driven strategies.",
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://lalufityan.com",
      },
    },
  })

  for (const image of projectImages) {
    const relativePath = image.src.replace(/^\//, "")
    const filePath = path.join(root, "public", relativePath)
    const basename = path.basename(filePath)
    const existing = await findMediaByFilename(payload, basename)
    const organizationData = {
      folder: "portfolio" as const,
      tags: toTags(["portfolio", image.projectSlug]),
      usage: "project" as const,
    }

    if (existing) {
      mediaByImageId.set(image.id, Number(existing.id))
      await payload.update({
        collection: "media",
        context: seedContext,
        id: existing.id,
        data: organizationData,
      })
      continue
    }

    const created = await payload.create({
      collection: "media",
      context: seedContext,
      data: {
        alt: image.alt,
        caption: image.caption,
        featured: Boolean(image.featured),
        ...organizationData,
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
    const thumbnailId = thumbnail ? mediaByImageId.get(thumbnail.id) : undefined

    const data = {
      title: project.title,
      slug: project.slug,
      description: project.description,
      category: project.category,
      year: project.year,
      role: project.role,
      client: project.client,
      content: projectDetailsToRichText(project.details),
      featured: Boolean(project.featured),
      publishedAt: new Date().toISOString(),
      thumbnail: thumbnailId,
      gallery,
      meta: {
        title: `${project.title} | Lalu Fityan Portfolio`,
        description: project.description,
        image: thumbnailId,
        noIndex: false,
      },
      details: {
        introduction: project.details?.introduction,
        objective: project.details?.objective,
        approach: toRows(project.details?.approach),
        implementation: toRows(project.details?.implementation),
        outcomes: toRows(project.details?.outcomes),
        takeaway: project.details?.takeaway,
      },
      _status: "published" as const,
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
        context: seedContext,
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({
        collection: "projects",
        context: seedContext,
        data,
      })
    }
  }

  const landingProjectIDs = projects
    .filter((project) => project.featured)
    .map((project) => project.slug)
  const seededLandingProjects = await payload.find({
    collection: "projects",
    depth: 0,
    limit: 100,
    where: {
      slug: {
        in: landingProjectIDs,
      },
    },
  })
  const landingProjectsBySlug = new Map(seededLandingProjects.docs.map((project) => [project.slug, project.id]))

  await payload.updateGlobal({
    slug: "home-page",
    context: seedContext,
    data: {
      _status: "published" as const,
      fallbackToFeatured: true,
      landingProjects: landingProjectIDs
        .map((slug) => landingProjectsBySlug.get(slug))
        .filter((id): id is number => typeof id === "number"),
    },
  })

  payload.logger.info(`Seeded ${projects.length} projects and ${projectImages.length} media records.`)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
