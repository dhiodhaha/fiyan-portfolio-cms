import path from "path"
import { fileURLToPath } from "url"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { s3Storage } from "@payloadcms/storage-s3"
import { buildConfig } from "payload"
import sharp from "sharp"

import { Articles } from "./collections/Articles.ts"
import { Media } from "./collections/Media.ts"
import { Projects } from "./collections/Projects.ts"
import { Users } from "./collections/Users.ts"
import { SiteSettings } from "./globals/SiteSettings.ts"
import { richTextEditor } from "./lib/payload-rich-text-editor.ts"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const r2Bucket = process.env.R2_BUCKET || ""
const r2Endpoint = process.env.R2_ENDPOINT || ""
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID || ""
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY || ""

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Projects, Articles],
  globals: [SiteSettings],
  editor: richTextEditor,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "postgres://payload:payload@127.0.0.1:5432/fiyan_portfolio",
    },
  }),
  plugins: [
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
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
})
