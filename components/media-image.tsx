import { forwardRef, type ImgHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export interface MediaImageCandidate {
  src?: string
  width: number
}

interface MediaImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "fetchPriority" | "loading" | "src" | "srcSet"> {
  candidates?: readonly MediaImageCandidate[]
  fill?: boolean
  priority?: boolean
  src: string
}

const buildSrcSet = (candidates: readonly MediaImageCandidate[]) => {
  const byWidth = new Map<number, string>()

  for (const candidate of candidates) {
    if (candidate.src && candidate.width > 0) {
      byWidth.set(candidate.width, encodeURI(candidate.src))
    }
  }

  if (byWidth.size === 0) {
    return undefined
  }

  return [...byWidth.entries()]
    .sort(([left], [right]) => left - right)
    .map(([width, candidateSrc]) => `${candidateSrc} ${width}w`)
    .join(", ")
}

/**
 * Direct media renderer for pre-generated Payload/R2 derivatives.
 *
 * Payload already does the expensive resize work at upload time. This component
 * lets the browser choose the right derivative via srcset and fetches it
 * directly from the configured R2/Cloudflare public URL instead of routing it
 * through the Next/Vercel image optimizer again.
 */
export const MediaImage = forwardRef<HTMLImageElement, MediaImageProps>(function MediaImage(
  { alt, candidates = [], className, decoding = "async", fill = false, priority = false, sizes, src, ...props },
  ref,
) {
  const srcSet = buildSrcSet(candidates)

  return (
    <img
      {...props}
      ref={ref}
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      decoding={decoding}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn(fill && "absolute inset-0 size-full", className)}
    />
  )
})