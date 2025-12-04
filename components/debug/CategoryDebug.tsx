"use client"

import { useState } from "react"
import { projects } from "@/data/projects"

export function CategoryDebug() {
  const [showDebug, setShowDebug] = useState(false)

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  const categories = Array.from(new Set(projects.map((p) => p.category)))

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => setShowDebug(!showDebug)} className="bg-gray-800 text-white px-3 py-1 rounded text-xs">
        {showDebug ? "Hide" : "Debug Categories"}
      </button>

      {showDebug && (
        <div className="bg-gray-900 text-white p-4 rounded mt-2 max-w-md max-h-96 overflow-auto text-xs">
          <h3 className="font-bold mb-2">Categories ({categories.length}):</h3>
          <ul className="space-y-1">
            {categories.map((category, i) => (
              <li key={i} className="flex justify-between">
                <span>{category}</span>
                <span className="text-gray-400">
                  ({projects.filter((p) => p.category === category).length} projects)
                </span>
              </li>
            ))}
          </ul>

          <h3 className="font-bold mt-4 mb-2">Projects by Category:</h3>
          {categories.map((category) => (
            <div key={category} className="mb-3">
              <h4 className="font-semibold text-gray-300">{category}:</h4>
              <ul className="pl-4">
                {projects
                  .filter((p) => p.category === category)
                  .map((p) => (
                    <li key={p.id}>{p.title}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
