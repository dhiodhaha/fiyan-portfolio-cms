// Same normalization as ./site-settings.ts, but with no R2 public base configured: a media document
// that only exposes a filename must degrade to the gradient fallback instead of emitting a broken URL.
import "./stubs/no-r2-env"

import { getSiteSettings, type SiteSettingsView } from "../../lib/site-settings"
import { check, finish } from "./assert"

const settingsFor = (profileImage: unknown): Promise<SiteSettingsView> => {
  ;(globalThis as Record<string, unknown>).__fakePayload = {
    findGlobal: async () => ({ ownerName: "Owner Name", profileImage }),
  }

  return getSiteSettings()
}

const main = async () => {
  console.log("site-settings without an R2 public base")

  const filenameOnly = await settingsFor({ id: 1, alt: "Portrait", filename: "portrait.webp" })
  check(
    "a filename-only upload degrades to the gradient fallback",
    filenameOnly.profileImage === undefined,
    JSON.stringify(filenameOnly.profileImage),
  )

  const explicitUrl = await settingsFor({
    id: 1,
    alt: "Portrait",
    filename: "portrait.webp",
    url: "https://cdn.example.com/portrait.webp",
  })
  check(
    "an upload carrying its own url still renders",
    explicitUrl.profileImage?.src === "https://cdn.example.com/portrait.webp",
    JSON.stringify(explicitUrl.profileImage),
  )

  finish()
}

void main()
