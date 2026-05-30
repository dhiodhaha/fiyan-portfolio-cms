import "@payloadcms/next/css"
import configPromise from "@payload-config"
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts"
import type { ServerFunctionClientArgs } from "payload"
import type React from "react"
import { importMap } from "./admin/importMap.js"

async function serverFunction(args: ServerFunctionClientArgs) {
  "use server"

  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
