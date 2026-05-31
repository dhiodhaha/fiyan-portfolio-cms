export type PreviewSearchParams = {
  path: string
  previewSecret: string
}

const previewSecret = () => process.env.PAYLOAD_PREVIEW_SECRET || "1"

export const generatePreviewPath = (path: string) => {
  if (!path.startsWith("/")) {
    return null
  }

  const encodedParams = new URLSearchParams({
    path,
    previewSecret: previewSecret(),
  } satisfies PreviewSearchParams)

  return `/next/preview?${encodedParams.toString()}`
}

export const isPreviewRequest = (preview?: string) => {
  const secret = process.env.PAYLOAD_PREVIEW_SECRET

  if (secret) {
    return preview === secret
  }

  return process.env.NODE_ENV !== "production" && (preview === "1" || preview === "true")
}
