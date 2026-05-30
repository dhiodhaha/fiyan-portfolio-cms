import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center bg-white px-5 py-14 text-neutral-950 sm:px-6 lg:px-20 lg:py-20">
      <div className="max-w-3xl">
        <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-wide text-neutral-400 sm:text-xs">404</p>
        <h1 className="mb-5 max-w-[12ch] text-balance text-5xl font-semibold tracking-tight text-black sm:text-6xl">
          Page not available
        </h1>
        <p className="mb-8 max-w-[56ch] text-lg text-pretty text-neutral-600 sm:text-base">
          The page you are looking for is unavailable or has moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-base font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:py-2 sm:text-sm"
        >
          <ArrowLeft className="size-5 sm:size-4" aria-hidden="true" />
          Return home
        </Link>
      </div>
    </section>
  )
}
