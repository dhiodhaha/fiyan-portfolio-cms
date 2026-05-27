"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { Project } from "@/lib/projects-cms"
import { sortProjectsByYear } from "@/utils/category-utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HomeClientProps {
  featuredProjects: Project[]
}

export function HomeClient({ featuredProjects: unsortedFeaturedProjects }: HomeClientProps) {
  const featuredProjects = sortProjectsByYear(unsortedFeaturedProjects)
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Ingga Suwandana",
      role: "CEO",
      company: "Switch On Creative & Explore Lombok",
      quote:
        "Having Lalu Fityan on the team is an invaluable asset. His creative leadership consistently drives the team to exceed expectations. Fityan not only brings innovative ideas to the table but also possesses the sharp strategic vision to ensure every creative execution delivers maximum impact and ROI for the company.",
      avatar: "/images/testimonials/ingga.webp",
    },
    {
      id: 2,
      name: "Muhammad Fadli Rahman",
      role: "Head of Videography",
      company: "Switch On Creative",
      quote:
        "Working under Fityan's creative direction is always an enlightening experience. His vision is incredibly clear, and he excels at translating abstract concepts into a powerful brand narrative through motion pictures. His leadership style keeps us motivated to produce our best work.",
      avatar: "/images/testimonials/fadli.webp",
    },
    {
      id: 3,
      name: "Rabil Billy Hapsa",
      role: "Brand Director",
      company: "AMOK Research",
      quote:
        "Collaborating with Fityan on brand strategy is always synergistic. He has a profound understanding of how to craft a strategic brand narrative and translate it into relevant and compelling creative direction. His ability to align creative innovation with our overarching brand goals is exceptional.",
      avatar: "/images/testimonials/rabil.webp",
    },
    {
      id: 4,
      name: "Busfi Arusagara",
      role: "Client",
      company: "Political Party",
      quote:
        "Fityan demonstrated outstanding professionalism and a deep understanding of our goals. He was able to design and direct a creative campaign that was not only visually stunning but also highly effective and precisely targeted. His work significantly helped us increase engagement and strengthen our positive public image.",
      avatar: "/images/testimonials/busfi.webp",
    },
    {
      id: 5,
      name: "Lalu Muhammad Iqbal",
      role: "Client",
      company: "Political Party",
      quote:
        "Fityan's brilliance lies in his ability to build a strategic narrative that connects emotionally. In the world of politics, this is crucial. He doesn't just create ads; he builds stories that make our message more accessible and resonant with the public.",
      avatar: "/images/testimonials/iqbal.webp",
    },
    {
      id: 6,
      name: "Reza Rahman",
      role: "Head of Photography",
      company: "Switch On Creative",
      quote:
        "As the Head of Photography, I greatly appreciate the way Fityan provides a brief. He has a clear visual objective but always leaves room for the photography team to be creative. Under his direction, the quality of our visual assets for every project is consistently elevated and tells a powerful story.",
      avatar: "/images/testimonials/reza.webp",
    },
    {
      id: 7,
      name: "AOD",
      role: "Director",
      company: "Hikayat Ampenan",
      quote:
        "Working with Fityan on the 'Hikayat Ampenan' project was a stroke of luck. He is not just a creative director; he is a translator of soul. He was able to dive deep into the spirit and historical narrative of Ampenan, then transform it into a visual language that felt modern yet remained authentic.",
      avatar: "/images/testimonials/aod.webp",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen">
      <section className="px-4 pt-24 md:pt-32 pb-16 md:pb-24 max-w-7xl mx-auto min-h-screen flex items-center">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-beige/20 dark:bg-beige/10 text-brown/70 dark:text-cream-light/70 rounded-full text-sm font-medium mb-4">
                  Strategic Communications & Project Management
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-brown dark:text-cream-light tracking-tighter mb-6">
                Hello, I'm{" "}
                <span className="block text-brown/80 dark:text-cream-light/80">Lalu Fityan Dawam Syarief</span>
              </h1>
              <p className="text-lg md:text-xl text-brown/70 dark:text-cream-light/70 leading-relaxed mb-8 max-w-2xl">
                A results-driven Strategic Communications and Project Manager with a Master's in Communication Science.
                I transform complex challenges into successful campaigns, from high-stakes political branding to
                international event management, always delivering measurable, data-backed outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-beige text-brown dark:bg-beige dark:text-dark-brown rounded-full font-medium hover:bg-beige/90 dark:hover:bg-beige/90 transition-colors"
                >
                  View My Work
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="/#connect"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-brown dark:text-cream-light border border-beige/40 dark:border-beige/20 rounded-full font-medium hover:bg-beige/10 dark:hover:bg-beige/10 transition-colors"
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/lalu-fityan-new-profile.webp"
                    alt="Lalu Fityan Dawam Syarief - Strategic Communications Expert"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-beige/30 dark:bg-beige/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-beige/20 dark:bg-beige/10 rounded-full blur-2xl"></div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-12 border-t border-beige/20 dark:border-beige/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-semibold text-brown dark:text-cream-light mb-2">25,000+</div>
                <div className="text-brown/60 dark:text-cream-light/60">Event Participants Managed</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-semibold text-brown dark:text-cream-light mb-2">80%+</div>
                <div className="text-brown/60 dark:text-cream-light/60">Average Campaign Growth</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-semibold text-brown dark:text-cream-light mb-2">15+</div>
                <div className="text-brown/60 dark:text-cream-light/60">Successful Projects Delivered</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24 bg-cream dark:bg-dark-brown-light">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-semibold text-brown dark:text-cream-light tracking-tighter mb-6">
              Featured Projects
            </h2>
            <p className="text-lg text-brown/70 dark:text-cream-light/70 max-w-3xl mb-8">
              Explore some of my recent work in brand strategy, content creation, and social media management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block bg-cream-light dark:bg-dark-brown rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-sm text-brown/60 dark:text-cream-light/60">{project.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-brown dark:text-cream-light mb-3">{project.title}</h3>
                    <p className="text-sm text-brown/70 dark:text-cream-light/70 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 text-brown/70 dark:text-cream-light/70 border border-beige/30 dark:border-beige/20 rounded-full font-medium hover:bg-beige/10 dark:hover:bg-beige/10 transition-colors"
            >
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24 bg-cream-light dark:bg-dark-brown">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-semibold text-brown dark:text-cream-light tracking-tighter mb-6">
              What People Say
            </h2>
            <p className="text-lg text-brown/70 dark:text-cream-light/70 max-w-3xl mx-auto">
              Hear from the clients, colleagues, and collaborators who have experienced the impact of strategic
              communication and creative leadership firsthand.
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-cream dark:bg-dark-brown-light p-8 md:p-12 rounded-2xl mx-auto max-w-4xl">
                      <div className="text-center">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-6">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={`${testimonial.name} profile`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <blockquote className="text-brown/80 dark:text-cream-light/80 text-lg md:text-xl leading-relaxed italic mb-6">
                          "{testimonial.quote}"
                        </blockquote>
                        <div>
                          <h3 className="font-semibold text-brown dark:text-cream-light text-lg mb-1">
                            {testimonial.name}
                          </h3>
                          <p className="text-brown/60 dark:text-cream-light/60 text-sm">
                            {testimonial.role} • {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center mt-8 gap-8">
              <button
                onClick={prevSlide}
                className="bg-beige/80 dark:bg-beige/20 hover:bg-beige dark:hover:bg-beige/30 p-3 rounded-full transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-brown dark:text-cream-light" />
              </button>

              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide
                        ? "bg-beige dark:bg-beige"
                        : "bg-beige/30 dark:bg-beige/20 hover:bg-beige/50 dark:hover:bg-beige/30"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="bg-beige/80 dark:bg-beige/20 hover:bg-beige dark:hover:bg-beige/30 p-3 rounded-full transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-brown dark:text-cream-light" />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-cream dark:bg-dark-brown-light p-8 rounded-xl max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-brown dark:text-cream-light mb-4">Have you worked with me?</h3>
              <p className="text-brown/70 dark:text-cream-light/70 mb-6">
                I'd love to hear about your experience! Your testimonial helps others understand the value of strategic
                communication and creative collaboration.
              </p>
              <a
                href="mailto:lalufityandawamsyarief@gmail.com?subject=Testimonial%20for%20Lalu%20Fityan"
                className="inline-flex items-center gap-2 px-6 py-3 bg-beige text-brown dark:bg-beige dark:text-dark-brown rounded-full font-medium hover:bg-beige/90 dark:hover:bg-beige/90 transition-colors"
              >
                Share Your Experience
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
