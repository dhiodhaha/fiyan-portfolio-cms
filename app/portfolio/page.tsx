"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { instrumentSerif, plusJakartaSans } from "../fonts"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getAllProjectsWithThumbnails } from "@/utils/project-helpers"
import { getProjectCategories } from "@/data/projects"
import { projectMatchesCategory } from "@/utils/category-utils"

export default function PortfolioPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Load data
  const projects = getAllProjectsWithThumbnails()
  const categories = getProjectCategories()

  const handleProjectClick = (slug: string) => {
    router.push(`/projects/${slug}`)
  }

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => projectMatchesCategory(project.category, selectedCategory))

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
              onClick={() => handleProjectClick(project.slug)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-900">
                <Image
                  src={project.thumbnailUrl || "/placeholder.svg"}
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