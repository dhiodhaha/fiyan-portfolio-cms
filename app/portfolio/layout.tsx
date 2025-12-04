import type React from "react"

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="pt-16">{children}</main>
    </>
  )
}
