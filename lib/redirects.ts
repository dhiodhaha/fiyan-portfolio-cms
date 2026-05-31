import configPromise from "@payload-config"
import { getPayload } from "payload"

type RedirectDoc = {
  from?: string
  to?: {
    reference?:
      | {
          relationTo?: string
          value?: {
            slug?: string
          }
        }
      | {
          slug?: string
        }
    type?: "custom" | "reference"
    url?: string
  }
  type?: "301" | "302" | "307" | "308"
}

type RedirectReference = NonNullable<NonNullable<RedirectDoc["to"]>["reference"]>

export type RedirectTarget = {
  destination: string
  statusCode: 301 | 302 | 307 | 308
}

const toStatusCode = (type?: RedirectDoc["type"]): RedirectTarget["statusCode"] => {
  if (type === "301" || type === "302" || type === "307" || type === "308") {
    return Number(type) as RedirectTarget["statusCode"]
  }

  return 308
}

const resolveReferenceURL = (reference?: RedirectReference) => {
  if (!reference || typeof reference !== "object") {
    return undefined
  }

  if ("relationTo" in reference && "value" in reference) {
    const slug = reference.value?.slug

    if (reference.relationTo === "projects" && slug) {
      return `/projects/${slug}`
    }

    if (reference.relationTo === "articles" && slug) {
      return `/articles/${slug}`
    }
  }

  if ("slug" in reference && reference.slug) {
    return `/${reference.slug}`
  }

  return undefined
}

export async function getRedirectTarget(path: string): Promise<RedirectTarget | undefined> {
  if (!process.env.DATABASE_URL) {
    return undefined
  }

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: "redirects" as never,
    depth: 2,
    limit: 1,
    where: {
      from: {
        equals: path,
      },
    },
  })
  const redirect = result.docs[0] as RedirectDoc | undefined

  if (!redirect?.to) {
    return undefined
  }

  const destination = redirect.to.type === "custom" ? redirect.to.url : resolveReferenceURL(redirect.to.reference)

  if (!destination) {
    return undefined
  }

  return {
    destination,
    statusCode: toStatusCode(redirect.type),
  }
}
