import { HomeClient } from "@/components/home-client"
import { getFeaturedProjects } from "@/lib/projects-cms"

export const dynamic = "force-dynamic"

export default async function Home() {
  const featuredProjects = await getFeaturedProjects()

  return <HomeClient featuredProjects={featuredProjects} />
}
