"use client"

import { useSyncExternalStore } from "react"

const colorSchemeQuery = "(prefers-color-scheme: dark)"

export function useThemeDetector() {
  return useSyncExternalStore(
    (callback) => {
      const darkThemeMq = window.matchMedia(colorSchemeQuery)

      darkThemeMq.addEventListener("change", callback)

      return () => darkThemeMq.removeEventListener("change", callback)
    },
    () => window.matchMedia(colorSchemeQuery).matches,
    () => false,
  )
}
