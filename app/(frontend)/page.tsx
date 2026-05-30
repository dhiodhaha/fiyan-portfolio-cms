import { HomeClient } from "@/components/home-client"
import { getLandingProjects } from "@/lib/projects-cms"

export const dynamic = "force-dynamic"

export default async function Home() {
  const landingProjects = await getLandingProjects()

  return <HomeClient landingProjects={landingProjects} />
}
