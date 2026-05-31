import path from "path"
import { fileURLToPath } from "url"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { redirectsPlugin } from "@payloadcms/plugin-redirects"
import { seoPlugin } from "@payloadcms/plugin-seo"
import type { GenerateDescription, GenerateImage, GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types"
import { s3Storage } from "@payloadcms/storage-s3"
import { buildConfig, type PayloadRequest } from "payload"
import sharp from "sharp"

import { Articles } from "./collections/Articles.ts"
import { Media } from "./collections/Media.ts"
import { Projects } from "./collections/Projects.ts"
import { Users } from "./collections/Users.ts"
import { HomePage } from "./globals/HomePage.ts"
import { SiteSettings } from "./globals/SiteSettings.ts"
import { authenticated, publicRead } from "./collections/access.ts"
import { richTextEditor } from "./lib/payload-rich-text-editor.ts"
import { absoluteURL } from "./lib/site-url.ts"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const r2Bucket = process.env.R2_BUCKET || ""
const r2Endpoint = process.env.R2_ENDPOINT || ""
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID || ""
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY || ""

const titleFromDoc = (doc: unknown) => {
  if (!doc || typeof doc !== "object") {
    return undefined
  }

  const record = doc as { title?: unknown }
  return typeof record.title === "string" && record.title ? record.title : undefined
}

const descriptionFromDoc = (doc: unknown) => {
  if (!doc || typeof doc !== "object") {
    return undefined
  }

  const record = doc as { description?: unknown }
  return typeof record.description === "string" && record.description ? record.description : undefined
}

const slugFromDoc = (doc: unknown) => {
  if (!doc || typeof doc !== "object") {
    return undefined
  }

  const record = doc as { slug?: unknown }
  return typeof record.slug === "string" && record.slug ? record.slug : undefined
}

const imageIDFromValue = (value: unknown) => {
  if (typeof value === "number" || typeof value === "string") {
    return value
  }

  if (value && typeof value === "object" && "id" in value) {
    const id = (value as { id?: unknown }).id
    return typeof id === "number" || typeof id === "string" ? id : undefined
  }

  return undefined
}

const generateTitle: GenerateTitle = ({ doc }) => {
  const title = titleFromDoc(doc)
  return title ? `${title} | Lalu Fityan Portfolio` : "Lalu Fityan Portfolio"
}

const generateDescription: GenerateDescription = ({ doc }) =>
  descriptionFromDoc(doc) ||
  "Strategic communications, project management, campaign, event, and creative direction portfolio by Lalu Fityan."

const generateImage: GenerateImage = ({ doc }) => {
  if (!doc || typeof doc !== "object") {
    return ""
  }

  const record = doc as { featuredImage?: unknown; thumbnail?: unknown }
  return imageIDFromValue(record.thumbnail) || imageIDFromValue(record.featuredImage) || ""
}

const generateURL: GenerateURL = ({ collectionConfig, doc }) => {
  const slug = slugFromDoc(doc)

  if (collectionConfig?.slug === "projects" && slug) {
    return absoluteURL(`/projects/${slug}`)
  }

  if (collectionConfig?.slug === "articles" && slug) {
    return absoluteURL(`/articles/${slug}`)
  }

  return absoluteURL("/")
}

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Projects, Articles],
  globals: [HomePage, SiteSettings],
  editor: richTextEditor,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "postgres://payload:payload@127.0.0.1:5432/fiyan_portfolio",
    },
  }),
  plugins: [
    redirectsPlugin({
      collections: ["projects", "articles"],
      overrides: {
        access: {
          create: authenticated,
          delete: authenticated,
          read: publicRead,
          update: authenticated,
        },
        admin: {
          defaultColumns: ["from", "to.type", "type", "updatedAt"],
          group: "Site",
        },
      },
      redirectTypes: ["301", "302", "307", "308"],
    }),
    seoPlugin({
      collections: ["projects", "articles"],
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: "noIndex",
          label: "Hide from search engines",
          type: "checkbox",
          defaultValue: false,
        },
      ],
      generateDescription,
      generateImage,
      generateTitle,
      generateURL,
      tabbedUI: true,
      uploadsCollection: "media",
    }),
    s3Storage({
      enabled: Boolean(r2Bucket && r2Endpoint && r2AccessKeyId && r2SecretAccessKey),
      collections: {
        media: {
          prefix: "portfolio",
        },
      },
      clientUploads: true,
      bucket: r2Bucket || "missing-r2-bucket",
      config: {
        credentials: {
          accessKeyId: r2AccessKeyId || "missing-r2-access-key",
          secretAccessKey: r2SecretAccessKey || "missing-r2-secret-key",
        },
        endpoint: r2Endpoint,
        forcePathStyle: true,
        region: "auto",
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "dev-only-payload-secret-change-me",
  folders: {
    fieldName: "payloadFolder",
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }) => {
        if (req.user) {
          return true
        }

        const secret = process.env.CRON_SECRET
        return Boolean(secret && req.headers.get("authorization") === `Bearer ${secret}`)
      },
    },
    tasks: [],
  },
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
})
