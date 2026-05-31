import { AdminBar } from "@/components/admin-bar"
import { HomeClient } from "@/components/home-client"
import { RefreshRouteOnSave } from "@/components/refresh-route-on-save"
import { isPreviewRequest } from "@/lib/preview"
import { getLandingProjects } from "@/lib/projects-cms"
import { draftMode } from "next/headers"

export const dynamic = "force-dynamic"

interface HomeProps {
  searchParams?: Promise<{
    preview?: string
  }>
}

export default async function Home({ searchParams }: HomeProps) {
  const query = await searchParams
  const draft = await draftMode()
  const isPreview = draft.isEnabled || isPreviewRequest(query?.preview)
  const landingProjects = await getLandingProjects({ draft: isPreview })

  return (
    <>
      <AdminBar
        collectionLabels={{ plural: "Portfolio Projects", singular: "Portfolio Project" }}
        collectionSlug="projects"
        preview={isPreview}
      />
      {isPreview && <RefreshRouteOnSave />}
      <HomeClient landingProjects={landingProjects} />
    </>
  )
}
