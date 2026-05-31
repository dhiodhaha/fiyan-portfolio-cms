"use client"

import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react"
import { useRouter } from "next/navigation"

export function RefreshRouteOnSave() {
  const router = useRouter()
  const serverURL = process.env.NEXT_PUBLIC_PAYLOAD_URL || (typeof window !== "undefined" ? window.location.origin : "")

  if (!serverURL) {
    return null
  }

  return <PayloadLivePreview refresh={() => router.refresh()} serverURL={serverURL} />
}
