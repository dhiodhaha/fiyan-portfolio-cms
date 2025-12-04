"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Building } from "lucide-react"
import type { Project } from "@/data/projects"
import { getProjectImages } from "@/utils/image-association"
import { ProjectGallery } from "@/components/ui/project-gallery"

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const images = getProjectImages(project.slug)

  return (
    <div className="min-h-screen bg-cream-light dark:bg-dark-brown">
      {/* Navigation */}
      <div className="px-4 py-6 max-w-7xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-brown/70 dark:text-cream-light/70 hover:text-brown dark:hover:text-cream-light transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>
      </div>

      {/* Project Header */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Project Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-beige/20 dark:bg-beige/10 text-brown/70 dark:text-cream-light/70 rounded-full text-sm font-medium">
                {project.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-brown dark:text-cream-light mb-6 tracking-tight">
              {project.title}
            </h1>

            <p className="text-lg text-brown/80 dark:text-cream-light/80 leading-relaxed mb-8">{project.description}</p>

            {/* Project Meta */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-brown/70 dark:text-cream-light/70">
                <Calendar size={18} />
                <span className="font-medium">Year:</span>
                <span>{project.year}</span>
              </div>

              {project.role && (
                <div className="flex items-center gap-3 text-brown/70 dark:text-cream-light/70">
                  <User size={18} />
                  <span className="font-medium">Role:</span>
                  <span>{project.role}</span>
                </div>
              )}

              {project.client && (
                <div className="flex items-center gap-3 text-brown/70 dark:text-cream-light/70">
                  <Building size={18} />
                  <span className="font-medium">Client:</span>
                  <span>{project.client}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {images.length > 0 && (
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={images[0]?.src || "/placeholder.svg?height=600&width=800"}
                  alt={images[0]?.alt || project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      {project.details && (
        <section className="px-4 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {project.details.introduction && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-brown dark:text-cream-light mb-4">Introduction</h2>
                  <p className="text-brown/80 dark:text-cream-light/80 leading-relaxed">
                    {project.details.introduction}
                  </p>
                </motion.div>
              )}

              {project.details.objective && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-brown dark:text-cream-light mb-4">Objective</h2>
                  <p className="text-brown/80 dark:text-cream-light/80 leading-relaxed">{project.details.objective}</p>
                </motion.div>
              )}

              {project.details.approach && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-brown dark:text-cream-light mb-4">Approach</h2>
                  <ul className="space-y-3">
                    {project.details.approach.map((item, index) => (
                      <li key={index} className="text-brown/80 dark:text-cream-light/80 leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {project.details.implementation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-brown dark:text-cream-light mb-4">Implementation</h2>
                  <ul className="space-y-3">
                    {project.details.implementation.map((item, index) => (
                      <li key={index} className="text-brown/80 dark:text-cream-light/80 leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {project.details.outcomes && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h2 className="text-2xl font-bold text-brown dark:text-cream-light mb-4">Outcomes</h2>
                  <ul className="space-y-3">
                    {project.details.outcomes.map((item, index) => (
                      <li key={index} className="text-brown/80 dark:text-cream-light/80 leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {project.details.takeaway && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <h2 className="text-2xl font-bold text-brown dark:text-cream-light mb-4">Key Takeaway</h2>
                  <p className="text-brown/80 dark:text-cream-light/80 leading-relaxed font-medium">
                    {project.details.takeaway}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="sticky top-8"
              >
                {/* Project Gallery */}
                {images.length > 1 && (
                  <div className="bg-cream dark:bg-dark-brown-light p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-brown dark:text-cream-light mb-4">Project Gallery</h3>
                    <ProjectGallery images={images.slice(1, 5)} />
                    {images.length > 5 && (
                      <p className="text-sm text-brown/60 dark:text-cream-light/60 mt-3 text-center">
                        +{images.length - 4} more images
                      </p>
                    )}
                  </div>
                )}

                {/* Contact CTA */}
                <div className="bg-beige/20 dark:bg-beige/10 p-6 rounded-xl mt-6">
                  <h3 className="text-lg font-bold text-brown dark:text-cream-light mb-3">
                    Interested in Similar Work?
                  </h3>
                  <p className="text-brown/70 dark:text-cream-light/70 text-sm mb-4">
                    Let's discuss how I can help bring your project to life with strategic communication and creative
                    direction.
                  </p>
                  <Link
                    href="/#connect"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-beige text-brown dark:bg-beige dark:text-dark-brown rounded-full font-medium hover:bg-beige/90 dark:hover:bg-beige/90 transition-colors text-sm"
                  >
                    Get In Touch
                    <ArrowLeft size={16} className="rotate-180" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}



      {/* Related Projects */}
      <section className="px-4 py-12 bg-cream dark:bg-dark-brown-light">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <h2 className="text-3xl font-bold text-brown dark:text-cream-light mb-6">Explore More Projects</h2>
            <p className="text-brown/70 dark:text-cream-light/70 mb-8 max-w-2xl mx-auto">
              Discover other strategic communication and creative projects that showcase the power of thoughtful brand
              storytelling.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-beige text-brown dark:bg-beige dark:text-dark-brown rounded-full font-medium hover:bg-beige/90 dark:hover:bg-beige/90 transition-colors"
            >
              View All Projects
              <ArrowLeft size={20} className="rotate-180" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
