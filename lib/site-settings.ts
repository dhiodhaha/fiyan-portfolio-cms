import configPromise from "@payload-config"
import { getPayload } from "payload"

export interface SiteLink {
  href: string
  label: string
  openInNewTab?: boolean
}

export interface SiteSettingsView {
  defaultSEO: {
    description: string
    image?: string
    siteUrl: string
    title: string
  }
  description: string
  email: string
  eyebrow: string
  location: string
  ownerName: string
  services: string[]
  siteName: string
  socials: SiteLink[]
  navigation: SiteLink[]
}

export const fallbackSiteSettings: SiteSettingsView = {
  eyebrow: "Strategic Communications & Project Management",
  ownerName: "Lalu Fityan Dawam Syarief",
  siteName: "Lalu Fityan Portfolio",
  description:
    "A results-driven Strategic Communications and Project Manager with a Master's in Communication Science. I transform complex challenges into successful campaigns, from high-stakes political branding to international event management, always delivering measurable, data-backed outcomes.",
  email: "lalufityandawamsyarief@gmail.com",
  location: "Indonesia - UTC+7",
  services: [
    "Political Branding",
    "Digital Strategy",
    "Event Management",
    "Project Management",
    "Content Strategy",
    "Creative Direction",
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
    image: "/images/lalu-fityan-new-profile.webp",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://lalufityan.com",
  },
}

const cmsEnabled = Boolean(process.env.DATABASE_URL)
const publicR2Url = process.env.R2_PUBLIC_URL?.replace(/\/$/, "")

const mediaUrl = (media: unknown): string | undefined => {
  if (!media || typeof media !== "object") {
    return undefined
  }

  const record = media as {
    filename?: string
    prefix?: string
    sizes?: Record<string, { filename?: string; url?: string }>
    thumbnailURL?: string
    url?: string
  }
  const detail = record.sizes?.detail || record.sizes?.thumbnail

  if (detail?.url) {
    return detail.url
  }

  if (record.url) {
    return record.url
  }

  if (record.thumbnailURL) {
    return record.thumbnailURL
  }

  const filename = detail?.filename || record.filename
  if (!filename || !publicR2Url) {
    return undefined
  }

  const prefix = record.prefix ? `${record.prefix}/` : ""
  return `${publicR2Url}/${prefix}${filename}`
}

const toLabelArray = (items: unknown, fallback: string[]) => {
  if (!Array.isArray(items)) {
    return fallback
  }

  const labels = items
    .map((item) => (item && typeof item === "object" && "label" in item ? String(item.label) : ""))
    .filter(Boolean)

  return labels.length > 0 ? labels : fallback
}

const toLinks = (items: unknown, fallback: SiteLink[]) => {
  if (!Array.isArray(items)) {
    return fallback
  }

  const links: SiteLink[] = []

  for (const item of items) {
    if (!item || typeof item !== "object") {
      continue
    }

    const record = item as { href?: unknown; label?: unknown; openInNewTab?: unknown }
    if (typeof record.href !== "string" || typeof record.label !== "string") {
      continue
    }

    links.push({
      href: record.href,
      label: record.label,
      openInNewTab: Boolean(record.openInNewTab),
    })
  }

  return links.length > 0 ? links : fallback
}

const toText = (value: unknown, fallback: string) => (typeof value === "string" && value.trim() ? value : fallback)

export async function getSiteSettings(): Promise<SiteSettingsView> {
  if (!cmsEnabled) {
    return fallbackSiteSettings
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const settings = (await payload.findGlobal({
      slug: "site-settings",
      depth: 2,
    })) as unknown as Record<string, unknown>
    const defaultSEO = (settings.defaultSEO || {}) as Record<string, unknown>

    return {
      eyebrow: toText(settings.eyebrow, fallbackSiteSettings.eyebrow),
      ownerName: toText(settings.ownerName, fallbackSiteSettings.ownerName),
      siteName: toText(settings.siteName, fallbackSiteSettings.siteName),
      description: toText(settings.description, fallbackSiteSettings.description),
      email: toText(settings.email, fallbackSiteSettings.email),
      location: toText(settings.location, fallbackSiteSettings.location),
      services: toLabelArray(settings.services, fallbackSiteSettings.services),
      socials: toLinks(settings.socials, fallbackSiteSettings.socials),
      navigation: toLinks(settings.navigation, fallbackSiteSettings.navigation),
      defaultSEO: {
        title: toText(defaultSEO.title, fallbackSiteSettings.defaultSEO.title),
        description: toText(defaultSEO.description, fallbackSiteSettings.defaultSEO.description),
        image: mediaUrl(defaultSEO.image) || fallbackSiteSettings.defaultSEO.image,
        siteUrl: toText(defaultSEO.siteUrl, fallbackSiteSettings.defaultSEO.siteUrl),
      },
    }
  } catch {
    return fallbackSiteSettings
  }
}
