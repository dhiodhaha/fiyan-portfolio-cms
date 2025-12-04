"use client"

import { useState } from "react"
import { ImageUploader } from "@/components/admin/image-uploader"
import { projectImages, getProjectImages } from "@/utils/image-association"
import { projects } from "@/data/projects"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function AdminImagesPage() {
  const [selectedProject, setSelectedProject] = useState<string>("all")

  // Filter images based on selected project
  const filteredImages = selectedProject === "all" ? projectImages : getProjectImages(selectedProject)

  // Simulate deleting an image (in a real app, this would call an API)
  const handleDeleteImage = (imageId: string) => {
    alert(`Image ${imageId} would be deleted in a real application`)
  }

  return (
    <div className="min-h-screen bg-[#141414] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Project Image Management</h1>

        <Tabs defaultValue="upload" className="mb-8">
          <TabsList>
            <TabsTrigger value="upload">Upload Images</TabsTrigger>
            <TabsTrigger value="manage">Manage Images</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-4">
            <ImageUploader />
          </TabsContent>

          <TabsContent value="manage" className="mt-4">
            <div className="space-y-6 p-6 bg-white/5 rounded-lg">
              <div>
                <h2 className="text-2xl font-bold mb-4">Manage Project Images</h2>
                <p className="text-white/70 mb-4">View and manage images associated with your projects.</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={selectedProject === "all" ? "default" : "outline"}
                  onClick={() => setSelectedProject("all")}
                >
                  All Projects
                </Button>
                {projects.map((project) => (
                  <Button
                    key={project.id}
                    variant={selectedProject === project.slug ? "default" : "outline"}
                    onClick={() => setSelectedProject(project.slug)}
                  >
                    {project.title}
                  </Button>
                ))}
              </div>

              {filteredImages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredImages.map((image) => {
                    const project = projects.find((p) => p.slug === image.projectSlug)
                    return (
                      <div key={image.id} className="bg-white/10 rounded-lg overflow-hidden">
                        <div className="relative aspect-square">
                          <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium truncate">{image.id}</p>
                          <p className="text-xs text-white/70 truncate">
                            Project: {project?.title || image.projectSlug}
                          </p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs bg-white/20 px-2 py-1 rounded">
                              {image.featured ? "Featured" : "Regular"}
                            </span>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteImage(image.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-center py-8 text-white/50">No images found for the selected project.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
