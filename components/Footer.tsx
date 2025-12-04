"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full py-12 bg-cream dark:bg-dark-brown-light" id="connect">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-brown dark:text-cream-light mb-6">Connect with Me</h2>
        <p className="text-lg text-brown/70 dark:text-cream-light/70 max-w-3xl mx-auto mb-8">
          I'd love to hear from you! Whether you have a project in mind, want to collaborate, or simply want to say
          hello, feel free to reach out through any of the following channels.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            asChild
            variant="secondary"
            className="bg-beige/20 text-brown dark:bg-beige/10 dark:text-cream-light hover:bg-beige/30 dark:hover:bg-beige/20"
          >
            <Link href="mailto:lalufityandawamsyarief@gmail.com" className="flex items-center gap-2">
              <Mail size={18} />
              <span>Email</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="bg-beige/20 text-brown dark:bg-beige/10 dark:text-cream-light hover:bg-beige/30 dark:hover:bg-beige/20"
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
            className="bg-beige/20 text-brown dark:bg-beige/10 dark:text-cream-light hover:bg-beige/30 dark:hover:bg-beige/20"
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
        <p className="text-sm text-brown/40 dark:text-cream-light/40">
          © {new Date().getFullYear()} Lalu Fityan Dawam Syarief. Made with ❤️
        </p>
      </div>
    </footer>
  )
}
