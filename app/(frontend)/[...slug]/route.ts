import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { getRedirectTarget } from "@/lib/redirects"

interface CatchAllRouteProps {
  params: Promise<{
    slug: string[]
  }>
}

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest, { params }: CatchAllRouteProps) {
  const { slug } = await params
  const path = `/${slug.join("/")}`
  const redirectTarget = await getRedirectTarget(path)

  if (!redirectTarget) {
    return new Response("Not found", { status: 404 })
  }

  return NextResponse.redirect(new URL(redirectTarget.destination, req.nextUrl.origin), redirectTarget.statusCode)
}
