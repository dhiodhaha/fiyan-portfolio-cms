"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { processBatchImages, type ProjectImage } from "@/utils/image-association"
import { projects } from "@/data/projects"
import { Upload, Check } from "lucide-react"

export function ImageUploader() {
  const [files, setFiles] = useState<File[]>([])
  const [uploadedImages, setUploadedImages] = useState<ProjectImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    setUploadComplete(false)

    // In a real application, you would upload the files to a server
    // For this example, we'll simulate the upload process
    setTimeout(() => {
      // Simulate processing the uploaded files
      const processedImages = processBatchImages(
        files.map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
        })),
      )

      setUploadedImages(processedImages)
      setIsUploading(false)
      setUploadComplete(true)
    }, 2000)
  }

  const clearFiles = () => {
    setFiles([])
    setUploadedImages([])
    setUploadComplete(false)
  }

  return (
    <div className="space-y-6 p-6 bg-white/5 rounded-lg">
      <div>
        <h2 className="text-2xl font-bold mb-4">Upload Project Images</h2>
        <p className="text-white/70 mb-4">
          Upload images for your projects. The system will automatically associate images with projects based on the
          filename. For example, an image named "kinta-project-image-1.jpg" will be associated with the "kinta" project.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="images">Select Images</Label>
          <Input id="images" type="file" accept="image/*" multiple onChange={handleFileChange} className="mt-1" />
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <p className="font-medium">Selected Files ({files.length}):</p>
            <ul className="space-y-1">
              {files.map((file, index) => (
                <li key={index} className="text-sm text-white/70">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleUpload} disabled={files.length === 0 || isUploading}>
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
          <Button variant="outline" onClick={clearFiles} disabled={files.length === 0 || isUploading}>
            Clear
          </Button>
        </div>
      </div>

      {uploadComplete && (
        <div className="space-y-4">
          <div className="flex items-center text-green-500">
            <Check className="mr-2 h-5 w-5" />
            <p className="font-medium">Upload Complete!</p>
          </div>

          {uploadedImages.length > 0 ? (
            <div className="space-y-2">
              <p className="font-medium">Processed Images:</p>
              <ul className="space-y-2">
                {uploadedImages.map((image, index) => {
                  const project = projects.find((p) => p.slug === image.projectSlug)
                  return (
                    <li key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded">
                      <div className="w-12 h-12 relative rounded overflow-hidden">
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{image.id}</p>
                        <p className="text-xs text-white/70">Associated with: {project?.title || image.projectSlug}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            <p className="text-yellow-500">
              No images were associated with any projects. Make sure your filenames follow the pattern:
              "project-name-project-image-1.jpg"
            </p>
          )}
        </div>
      )}
    </div>
  )
}
