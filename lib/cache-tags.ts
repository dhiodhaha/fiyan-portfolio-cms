export const CACHE_TAGS = {
  homePage: "home-page",
  projects: "projects",
  siteSettings: "site-settings",
} as const

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS]
