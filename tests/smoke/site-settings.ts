// Exercises the real profileImage normalization in lib/site-settings with a fake Payload client, so
// the src/alt the sidebar receives is checked without a database.
import "./stubs/env"

import { getSiteSettings, type SiteSettingsView } from "../../lib/site-settings"
import { check, finish } from "./assert"

const media = (overrides: Record<string, unknown>) => ({
  id: 1,
  alt: "Lalu Fityan portrait",
  filename: "portrait.webp",
  url: "https://media.example.com/portfolio/portrait.webp",
  sizes: { gallery: { url: "https://media.example.com/portfolio/portrait-600x600.webp" } },
  ...overrides,
})

const settingsFor = (profileImage: unknown): Promise<SiteSettingsView> => {
  ;(globalThis as Record<string, unknown>).__fakePayload = {
    findGlobal: async () => ({ ownerName: "Owner Name", profileImage }),
  }

  return getSiteSettings()
}

const main = async () => {
  console.log("site-settings profileImage normalization")

  const configured = await settingsFor(media({}))
  check(
    "configured upload yields the square gallery derivative src + CMS alt",
    configured.profileImage?.src === "https://media.example.com/portfolio/portrait-600x600.webp" &&
      configured.profileImage?.alt === "Lalu Fityan portrait",
    JSON.stringify(configured.profileImage),
  )

  const blankAlt = await settingsFor(media({ alt: "   " }))
  check(
    "blank alt falls back to the owner name",
    blankAlt.profileImage?.alt === "Owner Name",
    JSON.stringify(blankAlt.profileImage),
  )

  const idOnly = await settingsFor(7)
  check(
    "an unpopulated relation keeps the gradient fallback",
    idOnly.profileImage === undefined,
    JSON.stringify(idOnly.profileImage),
  )

  const empty = await settingsFor(null)
  check("a null relation keeps the gradient fallback", empty.profileImage === undefined, JSON.stringify(empty.profileImage))

  const filenameOnly = await settingsFor(media({ url: undefined, sizes: undefined, prefix: undefined }))
  check(
    "a filename-only upload resolves under the R2 public base",
    filenameOnly.profileImage?.src === "https://media.example.com/portrait.webp",
    JSON.stringify(filenameOnly.profileImage),
  )

  const prefixed = await settingsFor(media({ url: undefined, sizes: undefined, prefix: "portfolio" }))
  check(
    "a filename + prefix upload resolves under the R2 public base",
    prefixed.profileImage?.src === "https://media.example.com/portfolio/portrait.webp",
    JSON.stringify(prefixed.profileImage),
  )

  finish()
}

void main()
