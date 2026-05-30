"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-950/10 bg-white py-12" id="connect">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-3xl font-semibold tracking-tight text-black">Connect with Me</h2>
        <p className="mx-auto mb-8 max-w-3xl text-lg text-pretty text-neutral-600 sm:text-base">
          I'd love to hear from you! Whether you have a project in mind, want to collaborate, or simply want to say
          hello, feel free to reach out through any of the following channels.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            asChild
            variant="secondary"
            className="bg-neutral-100 text-neutral-950 hover:bg-neutral-200"
          >
            <Link href="mailto:lalufityandawamsyarief@gmail.com" className="flex items-center gap-2">
              <Mail size={18} />
              <span>Email</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="bg-neutral-100 text-neutral-950 hover:bg-neutral-200"
          >
            <Link
              href="https://instagram.com/fiyanzaki"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Instagram size={18} />
              <span>Instagram</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="bg-neutral-100 text-neutral-950 hover:bg-neutral-200"
          >
            <Link
              href="https://linkedin.com/in/lalufityan/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </Link>
          </Button>
        </div>
        <p className="text-sm text-neutral-400">
          © {new Date().getFullYear()} Lalu Fityan Dawam Syarief. Made with ❤️
        </p>
      </div>
    </footer>
  )
}
