import "./globals.css"
import { plusJakartaSans } from "./fonts"
import type React from "react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lalu Fityan | Strategic Communications & Project Management Expert",
  description:
    "Proven Strategic Communications and Project Management professional with Master's in Communication Science. Delivered 80%+ campaign growth, managed 25,000+ event participants, and secured electoral victories through data-driven strategies. Expert in political branding, digital strategy, event management, and cross-functional team leadership. Ready to drive measurable results for your organization.",
  keywords: [
    "Strategic Communications",
    "Project Management",
    "Campaign Management",
    "Digital Strategy",
    "Event Management",
    "Political Branding",
    "Team Leadership",
    "Data-Driven Results",
    "Master's Communication Science",
    "Indonesia",
  ],
  authors: [{ name: "Lalu Fityan Dawam Syarief" }],
  creator: "Lalu Fityan Dawam Syarief",
  publisher: "Lalu Fityan Dawam Syarief",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lalufityan.com",
    siteName: "Lalu Fityan Portfolio",
    title: "Lalu Fityan | Strategic Communications & Project Management Expert",
    description:
      "Proven Strategic Communications and Project Management professional with Master's in Communication Science. Delivered 80%+ campaign growth, managed 25,000+ event participants, and secured electoral victories through data-driven strategies. Expert in political branding, digital strategy, event management, and cross-functional team leadership. Ready to drive measurable results for your organization.",
    images: [
      {
        url: "https://fiyan.vercel.app/images/lalu-fityan-new-profile.webp",
        width: 1200,
        height: 630,
        alt: "Lalu Fityan Dawam Syarief - Strategic Communications & Project Management Expert",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lalu Fityan | Strategic Communications & Project Management Expert",
    description:
      "Proven Strategic Communications and Project Management professional with Master's in Communication Science. Delivered 80%+ campaign growth, managed 25,000+ event participants, and secured electoral victories through data-driven strategies. Expert in political branding, digital strategy, event management, and cross-functional team leadership. Ready to drive measurable results for your organization.",
    images: ["https://fiyan.vercel.app/images/lalu-fityan-new-profile.webp"],
    creator: "@fiyanzaki",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className={`${plusJakartaSans.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
