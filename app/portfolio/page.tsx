"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { instrumentSerif, plusJakartaSans } from "../fonts"
import Link from "next/link"

interface Project {
  id: number
  title: string
  description: string
  category: string
  image: string
  year: string
}

const projects: Project[] = [
  {
    id: 6,
    title: "Loka Gym and Restaurant",
    description:
      "Developed integrated wellness and lifestyle content positioning the brand as a premier fitness destination, generating 50% growth in membership sign-ups.",
    category: "Wellness Marketing",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KIO00487%20%281%29-L6IUjgzloIrSG2t8Iiz5lbNfdIS3Hd.webp",
    year: "2023",
  },
  {
    id: 3,
    title: "Loka Gym and Restaurant",
    description:
      "Developed integrated wellness and lifestyle content positioning the brand as a premier fitness destination, generating 50% growth in membership sign-ups.",
    category: "Wellness Marketing",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A13I2860-lux11gMAuI0o5Ttx19hgbMEgFNIY7S.webp",
    year: "2023",
  },
  {
    id: 5,
    title: "Loka Gym and Restaurant",
    description:
      "Developed integrated wellness and lifestyle content positioning the brand as a premier fitness destination, generating 50% growth in membership sign-ups.",
    category: "Wellness Marketing",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KIO07344-5X052v6OPCsvSc07VpJuBZH2iddrhK.webp",
    year: "2023",
  },
  {
    id: 2,
    title: "Kinta Coffee",
    description:
      "Created cohesive visual identity and storytelling approach across all customer touchpoints, revitalizing brand perception and increasing engagement by 30%.",
    category: "F&B Marketing",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KIO01438-oigqSep0pJ5W3RwnH7qnP9w6IZbisg.webp",
    year: "2023",
  },
  {
    id: 11,
    title: "Kinta Coffee",
    description:
      "Created cohesive visual identity and storytelling approach across all customer touchpoints, revitalizing brand perception and increasing engagement by 30%.",
    category: "F&B Marketing",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/resto3-DeANbLRzsIbbKSXfvOpKzLwtZkanbk.webp",
    year: "2023",
  },
  {
    id: 12,
    title: "Kinta Coffee",
    description:
      "Created cohesive visual identity and storytelling approach across all customer touchpoints, revitalizing brand perception and increasing engagement by 30%.",
    category: "F&B Marketing",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/resto1-81Bwo2AhSidSsaP4evYKolPqIGTx4U.webp",
    year: "2023",
  },
  {
    id: 7,
    title: "PT Sumber Makmur Cemerlang Persada",
    description:
      "Managed comprehensive social media operations including content planning and brand positioning, generating 20% ROI through strategic content calendars.",
    category: "Social Media Management",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27-GiIP4xv2SoHg5KWSSSo9T4fjybFg5w.webp",
    year: "2023",
  },
  {
    id: 8,
    title: "PT Sumber Makmur Cemerlang Persada",
    description:
      "Managed comprehensive social media operations including content planning and brand positioning, generating 20% ROI through strategic content calendars.",
    category: "Social Media Management",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smc-sV2HEks47OEh3OLSffXvudTdizPhgF.webp",
    year: "2023",
  },
  {
    id: 9,
    title: "PT Sumber Makmur Cemerlang Persada",
    description:
      "Managed comprehensive social media operations including content planning and brand positioning, generating 20% ROI through strategic content calendars.",
    category: "Social Media Management",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smc2-BVKCduhQkkCZc7d26E7RXivl31lCjU.webp",
    year: "2023",
  },
  {
    id: 4,
    title: "PT Sumber Makmur Cemerlang Persada",
    description:
      "Managed comprehensive social media operations including content planning and brand positioning, generating 20% ROI through strategic content calendars.",
    category: "Social Media Management",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SMCP%2013-F1Dg4xgqrnzuGQbQJ2bxcCyHBLfMe6.webp",
    year: "2023",
  },
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const categories = ["all", ...new Set(projects.map((project) => project.category))]

  const handleProjectClick = (projectId: number) => {
    // For now, we'll only navigate to the government engagement project
    if (projectId === 7) {
      window.location.href = "/projects/government-engagement"
    }
  }

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-[#141414] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1
            className={`${instrumentSerif.className} text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter mb-6`}
          >
            Portfolio
          </h1>
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${plusJakartaSans.className} px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === category ? "bg-white text-black" : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="group relative cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-900">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-full flex-col justify-end p-6">
                    <p className={`${plusJakartaSans.className} text-sm text-white/60 mb-2`}>{project.category}</p>
                    <h3 className={`${instrumentSerif.className} text-xl text-white mb-2`}>{project.title}</h3>
                    <p className={`${plusJakartaSans.className} text-sm text-white/80`}>{project.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Link
            href="/"
            className={`${plusJakartaSans.className} group flex items-center gap-2 px-6 py-3 text-white/70 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
