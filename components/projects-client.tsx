"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { ProjectWithThumbnail } from "@/lib/projects-cms"
import { projectMatchesCategory, sortProjectsByYear } from "@/utils/category-utils"

interface ProjectsClientProps {
  categories: string[]
  projects: ProjectWithThumbnail[]
}

export function ProjectsClient({ categories, projects }: ProjectsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredProjects = sortProjectsByYear(
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => projectMatchesCategory(project.category, selectedCategory)),
  )

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-semibold text-brown dark:text-cream-light tracking-tighter mb-6">
            Projects
          </h1>
          <p className="text-lg text-brown/70 dark:text-cream-light/70 max-w-3xl mb-8">
            Explore my portfolio of creative work across various industries, from brand strategy and content creation to
            social media management and political campaigns.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-beige text-brown dark:bg-beige dark:text-dark-brown"
                    : "bg-beige/20 text-brown/60 hover:bg-beige/30 dark:bg-beige/10 dark:text-cream-light/60 dark:hover:bg-beige/20"
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
            >
              <Link
                href={`/projects/${project.slug}`}
                className="block bg-cream dark:bg-dark-brown-light rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.thumbnailUrl || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-brown/60 dark:text-cream-light/60">{project.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-brown dark:text-cream-light mb-3">{project.title}</h3>
                  <p className="text-sm text-brown/70 dark:text-cream-light/70 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/"
            className="group flex items-center gap-2 px-6 py-3 text-brown/70 dark:text-cream-light/70 border border-beige/30 dark:border-beige/20 rounded-full font-medium hover:bg-beige/10 dark:hover:bg-beige/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
