"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== "/" && pathname.startsWith(path))
    return `text-sm ${
      isActive
        ? "text-brown dark:text-cream-light"
        : "text-brown/60 dark:text-cream-light/60 hover:text-brown dark:hover:text-cream-light"
    } transition-colors relative ${isActive ? "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-brown dark:after:bg-cream-light" : ""}`
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen
          ? "bg-cream-light/90 dark:bg-dark-brown/90 backdrop-blur-md shadow-sm"
          : "bg-cream-light/80 dark:bg-dark-brown/80 backdrop-blur-sm"
      } border-b border-beige/20 dark:border-beige/10`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className={`text-xl font-semibold text-brown dark:text-cream-light`}>
            Lalu Fityan
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link href="/projects" className={navLinkClass("/projects")}>
              Projects
            </Link>
            <a
              href="/#connect"
              className={`text-sm text-brown/60 dark:text-cream-light/60 hover:text-brown dark:hover:text-cream-light transition-colors`}
            >
              Contact
            </a>
            <Link
              href="https://docs.google.com/document/d/13IG0d7LuFpOaRBssLf7zdI6xS9csAIey80tGFTtKhb4/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm text-brown/60 dark:text-cream-light/60 hover:text-brown dark:hover:text-cream-light transition-colors`}
            >
              Resume
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-brown dark:text-cream-light p-1 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        } bg-cream-light dark:bg-dark-brown border-t border-beige/10 dark:border-beige/5`}
      >
        <nav className="flex flex-col py-4 px-4 space-y-4">
          <Link href="/" className={`${navLinkClass("/")} py-2`}>
            Home
          </Link>
          <Link href="/projects" className={`${navLinkClass("/projects")} py-2`}>
            Projects
          </Link>
          <a
            href="/#connect"
            className={`text-sm text-brown/60 dark:text-cream-light/60 hover:text-brown dark:hover:text-cream-light transition-colors py-2`}
          >
            Contact
          </a>
          <Link
            href="https://docs.google.com/document/d/13IG0d7LuFpOaRBssLf7zdI6xS9csAIey80tGFTtKhb4/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm text-brown/60 dark:text-cream-light/60 hover:text-brown dark:hover:text-cream-light transition-colors py-2`}
          >
            Resume
          </Link>
        </nav>
      </div>
    </header>
  )
}
