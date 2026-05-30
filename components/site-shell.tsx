import type { ReactNode } from "react"

import { PortfolioSidebar } from "@/components/portfolio-sidebar"

interface SiteShellProps {
  children: ReactNode
  pathname: string
}

export function SiteShell({ children, pathname }: SiteShellProps) {
  const isPayloadAdmin = pathname.startsWith("/admin")

  if (isPayloadAdmin) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-950 antialiased lg:flex lg:h-dvh lg:overflow-hidden">
      <PortfolioSidebar />
      <main data-site-main className="min-w-0 flex-1 overflow-x-hidden lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
