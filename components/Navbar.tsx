"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu, X } from "lucide-react"

const getScrolledSnapshot = () => window.scrollY > 10
const getServerScrolledSnapshot = () => false

const subscribeToScroll = (callback: () => void) => {
  const onScroll = () => callback()

  window.addEventListener("scroll", onScroll, { passive: true })

  return () => window.removeEventListener("scroll", onScroll)
}

export function Navbar() {
  const pathname = usePathname()
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolledSnapshot, getServerScrolledSnapshot)
  const [menuState, setMenuState] = useState({
    isOpen: false,
    pathname,
  })
  const isMenuOpen = menuState.pathname === pathname && menuState.isOpen

  const toggleMenu = () => {
    setMenuState({
      isOpen: !isMenuOpen,
      pathname,
    })
  }

  const closeMenu = () => {
    setMenuState({
      isOpen: false,
      pathname,
    })
  }

  const navLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== "/" && pathname.startsWith(path))
    return `text-sm ${
      isActive
        ? "text-black"
        : "text-neutral-500 hover:text-black"
    } transition-colors relative ${isActive ? "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-black" : ""}`
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      } border-b border-neutral-950/10`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-semibold text-black">
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
              className="text-sm text-neutral-500 transition-colors hover:text-black"
            >
              Contact
            </a>
            <Link
              href="https://docs.google.com/document/d/13IG0d7LuFpOaRBssLf7zdI6xS9csAIey80tGFTtKhb4/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 transition-colors hover:text-black"
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
              className="p-1 text-neutral-950 focus:outline-none"
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
        } border-t border-neutral-950/10 bg-white`}
      >
        <nav className="flex flex-col py-4 px-4 space-y-4">
          <Link href="/" className={`${navLinkClass("/")} py-2`} onClick={closeMenu}>
            Home
          </Link>
          <Link href="/projects" className={`${navLinkClass("/projects")} py-2`} onClick={closeMenu}>
            Projects
          </Link>
          <a
            href="/#connect"
            className="py-2 text-sm text-neutral-500 transition-colors hover:text-black"
            onClick={closeMenu}
          >
            Contact
          </a>
          <Link
            href="https://docs.google.com/document/d/13IG0d7LuFpOaRBssLf7zdI6xS9csAIey80tGFTtKhb4/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 text-sm text-neutral-500 transition-colors hover:text-black"
            onClick={closeMenu}
          >
            Resume
          </Link>
        </nav>
      </div>
    </header>
  )
}
