"use client"

import type { ListViewClientProps, Where } from "payload"
import { formatAdminURL } from "payload/shared"
import { useEffect, useMemo, useState } from "react"

import { DefaultListView, useConfig, useListQuery } from "@payloadcms/ui"

import styles from "./projects-grid-list-view.module.css"

type ProjectID = number | string

type MediaDoc = {
  alt?: string | null
  sizes?: Record<string, { url?: string | null } | null>
  thumbnailURL?: string | null
  url?: string | null
}

type ProjectDoc = {
  _status?: string
  category?: string | null
  client?: string | null
  description?: string | null
  featured?: boolean | null
  id: ProjectID
  slug?: string | null
  thumbnail?: MediaDoc | ProjectID | null
  title?: string | null
  year?: string | null
}

type ProjectsResponse = {
  docs?: ProjectDoc[]
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === "object" && !Array.isArray(value))

const imageURL = (project: ProjectDoc) => {
  if (!isRecord(project.thumbnail)) {
    return undefined
  }

  const thumbnail = project.thumbnail as MediaDoc

  return (
    thumbnail.sizes?.thumbnail?.url ||
    thumbnail.sizes?.gallery?.url ||
    thumbnail.thumbnailURL ||
    thumbnail.url ||
    undefined
  )
}

const imageAlt = (project: ProjectDoc) =>
  isRecord(project.thumbnail) && typeof project.thumbnail.alt === "string"
    ? project.thumbnail.alt
    : project.title || "Project thumbnail"

const rootWhere = (where: unknown) => (isRecord(where) ? where : {})

const yearFromWhere = (where: unknown) => {
  const yearCondition = rootWhere(where).year

  if (!isRecord(yearCondition)) {
    return ""
  }

  return typeof yearCondition.equals === "string" ? yearCondition.equals : ""
}

const uniqueYears = (docs: ProjectDoc[], extraYear: string) => {
  const years = new Set<string>()

  if (extraYear) {
    years.add(extraYear)
  }

  docs.forEach((doc) => {
    if (doc.year) {
      years.add(doc.year)
    }
  })

  return [...years].sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
}

const metaText = (project: ProjectDoc) =>
  [project.category, project.year, project.client].filter(Boolean).join(" / ")

const ProjectGrid = () => {
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()
  const { data, query, refineListData } = useListQuery()
  const contextDocs = useMemo(() => (Array.isArray(data?.docs) ? (data.docs as ProjectDoc[]) : []), [data?.docs])
  const [hydratedDocs, setHydratedDocs] = useState<ProjectDoc[]>(contextDocs)
  const [yearOptions, setYearOptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const activeYear = yearFromWhere(query?.where)

  useEffect(() => {
    setHydratedDocs(contextDocs)
  }, [contextDocs])

  useEffect(() => {
    const controller = new AbortController()

    const loadHydratedDocs = async () => {
      setIsLoading(true)

      try {
        const params = new URLSearchParams(window.location.search)

        params.set("depth", "1")
        params.set("draft", "true")

        if (typeof data?.limit === "number" && !params.has("limit")) {
          params.set("limit", String(data.limit))
        }

        if (typeof data?.page === "number" && !params.has("page")) {
          params.set("page", String(data.page))
        }

        if (typeof query?.sort === "string" && !params.has("sort")) {
          params.set("sort", query.sort)
        }

        if (typeof query?.search === "string" && !params.has("search")) {
          params.set("search", query.search)
        }

        const response = await fetch(`/api/projects?${params.toString()}`, {
          credentials: "include",
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error("Could not load project thumbnails")
        }

        const result = (await response.json()) as ProjectsResponse

        if (Array.isArray(result.docs)) {
          setHydratedDocs(result.docs)
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setHydratedDocs(contextDocs)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadHydratedDocs()

    return () => {
      controller.abort()
    }
  }, [contextDocs, data?.limit, data?.page, query])

  useEffect(() => {
    const controller = new AbortController()

    const loadYears = async () => {
      try {
        const response = await fetch("/api/projects?depth=0&draft=true&limit=1000&sort=-year", {
          credentials: "include",
          signal: controller.signal,
        })

        if (!response.ok) {
          return
        }

        const result = (await response.json()) as ProjectsResponse

        if (Array.isArray(result.docs)) {
          setYearOptions(uniqueYears(result.docs, activeYear))
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setYearOptions(uniqueYears(contextDocs, activeYear))
        }
      }
    }

    void loadYears()

    return () => {
      controller.abort()
    }
  }, [activeYear, contextDocs])

  const handleYearChange = (year: string) => {
    const nextWhere = { ...rootWhere(query?.where) }

    delete nextWhere.year

    if (year) {
      nextWhere.year = {
        equals: year,
      }
    }

    void refineListData({
      where: Object.keys(nextWhere).length > 0 ? (nextWhere as Where) : undefined,
    })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <p className={styles.summary}>
          <span className={styles.title}>Portfolio project grid</span>
          {data?.totalDocs || 0} projects.
          {isLoading ? " Refreshing thumbnails..." : ""}
        </p>

        <label className={styles.filter}>
          <span className={styles.filterLabel}>Year</span>
          <select className={styles.select} onChange={(event) => handleYearChange(event.target.value)} value={activeYear}>
            <option value="">All years</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      {hydratedDocs.length > 0 ? (
        <div className={styles.grid}>
          {hydratedDocs.map((project) => {
            const src = imageURL(project)
            const editURL = formatAdminURL({
              adminRoute,
              path: `/collections/projects/${project.id}`,
            })

            return (
              <a className={styles.card} href={editURL} key={project.id}>
                <div className={styles.imageFrame}>
                  {src ? (
                    <img alt={imageAlt(project)} className={styles.image} loading="lazy" src={src} />
                  ) : (
                    <div className={styles.imageFallback}>No thumbnail selected</div>
                  )}
                </div>
                <div className={styles.body}>
                  <div>
                    <h3 className={styles.heading}>{project.title || `Project ${project.id}`}</h3>
                    {metaText(project) && <p className={styles.meta}>{metaText(project)}</p>}
                  </div>

                  {project.description && <p className={styles.description}>{project.description}</p>}

                  <div className={styles.badges}>
                    {project._status && (
                      <span
                        className={[
                          styles.badge,
                          project._status === "published" ? styles.statusPublished : styles.statusDraft,
                        ].join(" ")}
                      >
                        {project._status}
                      </span>
                    )}
                    {project.featured && <span className={styles.badge}>Homepage slide</span>}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      ) : (
        <div className={styles.empty}>No projects found.</div>
      )}
    </div>
  )
}

export const ProjectsGridListView = (props: ListViewClientProps) => (
  <DefaultListView {...props} enableRowSelections={false} Table={<ProjectGrid />} />
)
