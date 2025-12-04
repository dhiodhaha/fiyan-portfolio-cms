import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-5xl md:text-7xl font-semibold text-white/90 tracking-tighter mb-6">Page Not Available</h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
          The page you're looking for is currently disabled or doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-white border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors"
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
          Return Home
        </Link>
      </div>
    </div>
  )
}
