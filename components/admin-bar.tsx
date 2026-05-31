"use client"

import { PayloadAdminBar, type PayloadMeUser } from "@payloadcms/admin-bar"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

interface AdminBarProps {
  collectionLabels?: {
    plural: string
    singular: string
  }
  collectionSlug?: string
  id?: string
  preview?: boolean
}

export function AdminBar({ collectionLabels, collectionSlug, id, preview = false }: AdminBarProps) {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  const handleAuthChange = useCallback((user: PayloadMeUser) => {
    setIsVisible(Boolean(user?.id))
  }, [])

  const handlePreviewExit = useCallback(() => {
    void fetch("/next/exit-preview").then(() => {
      router.refresh()
    })
  }, [router])

  return (
    <PayloadAdminBar
      adminPath="/admin"
      apiPath="/api"
      authCollectionSlug="users"
      cmsURL=""
      collectionLabels={collectionLabels}
      collectionSlug={collectionSlug}
      id={id}
      onAuthChange={handleAuthChange}
      onPreviewExit={handlePreviewExit}
      preview={preview}
      style={{
        display: isVisible ? "flex" : "none",
      }}
    />
  )
}
