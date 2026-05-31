export const getSiteURL = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || "http://localhost:3000"
  const withProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`
  return withProtocol.replace(/\/$/, "")
}

export const absoluteURL = (path = "/", base = getSiteURL()) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${base.replace(/\/$/, "")}${normalizedPath}`
}
