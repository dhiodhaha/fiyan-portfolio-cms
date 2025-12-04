"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react"
import type { ProjectImage } from "@/utils/image-association"

interface ProjectGalleryProps {
  images: ProjectImage[]
  className?: string
}

export function ProjectGallery({ images, className = "" }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || selectedIndex === null) return

      switch (e.key) {
        case "Escape":
          setIsOpen(false)
          setSelectedIndex(null)
          break
        case "ArrowLeft":
          e.preventDefault()
          setSelectedIndex((prev) => (prev === null ? 0 : prev > 0 ? prev - 1 : images.length - 1))
          break
        case "ArrowRight":
          e.preventDefault()
          setSelectedIndex((prev) => (prev === null ? 0 : prev < images.length - 1 ? prev + 1 : 0))
          break
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, selectedIndex, images.length])

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
    setSelectedIndex(null)
  }

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === null ? 0 : prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === null ? 0 : prev < images.length - 1 ? prev + 1 : 0))
  }

  const currentImage = selectedIndex !== null ? images[selectedIndex] : null

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid grid-cols-2 gap-3 ${className}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src || "/placeholder.svg?height=200&width=200"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              {image.type === "video" && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 dark:bg-black/90 rounded-full p-2">
                    <Play size={16} className="text-brown dark:text-cream-light ml-0.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Media Type Indicator */}
            {image.type === "video" && (
              <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1">
                <Play size={12} className="text-white ml-0.5" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </>
            )}

            {/* Main Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {currentImage.type === "video" ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={currentImage.src || "/placeholder.svg"}
                    alt={currentImage.alt}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              ) : (
                <Image
                  src={currentImage.src || "/placeholder.svg"}
                  alt={currentImage.alt}
                  width={800}
                  height={600}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              )}
            </motion.div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
              <h3 className="font-semibold mb-1">{currentImage.caption || currentImage.alt}</h3>
              {currentImage.description && <p className="text-sm text-white/80">{currentImage.description}</p>}

              {/* Progress Indicators */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 mt-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedIndex(index)
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedIndex ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
