import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { NAV_LINKS } from '../data/savorData'
import { usePrefersReducedMotion } from '../hooks/useViewportPrefs'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHref, setActiveHref] = useState<string>('')
  const reducedMotion = usePrefersReducedMotion()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight whichever section is currently in view
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean,
    ) as Element[]
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0 && visible[0].target.id) {
          setActiveHref(`#${visible[0].target.id}`)
        }
      },
      { rootMargin: '-32% 0px -48% 0px', threshold: [0.1, 0.3, 0.6] },
    )

    sections.forEach((sec) => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      setMobileOpen(false)
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
    }
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-[#22221E]/10 bg-[#FFF8ED]/92 backdrop-blur-md'
          : 'bg-[#FFF8ED]/80 backdrop-blur-xs'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-[#22221E] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#FFF8ED]"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          onClick={(e) => {
            setActiveHref('')
            handleNavClick(e, '#top')
          }}
          className="group inline-flex items-baseline gap-2.5 rounded-md focus-visible:outline-[#D8432E]"
          aria-label="SAVOR — Taste in Motion, back to top"
        >
          <span className="font-display text-2xl font-semibold tracking-tight text-[#22221E]">
            SAVOR
          </span>
          <span className="hidden text-xs font-medium tracking-[0.18em] text-[#244C35] uppercase sm:inline">
            Taste in Motion
          </span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#B83220]'
                    : 'text-[#22221E]/85 hover:text-[#D8432E]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 380, damping: 32 }
                    }
                    className="absolute right-0 -bottom-0.5 left-0 h-0.5 rounded-full bg-[#D8432E]"
                    aria-hidden="true"
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#menu"
            onClick={(e) => handleNavClick(e, '#menu')}
            className="hidden rounded-full border border-[#22221E]/20 bg-[#FCF6EB] px-4 py-2 text-xs font-semibold tracking-wider text-[#22221E] uppercase transition-colors hover:border-[#D8432E] hover:bg-[#D8432E] hover:text-[#FFF8ED] sm:inline-flex"
          >
            Seasonal Menu
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#22221E]/15 bg-[#FCF6EB] text-[#22221E] transition-colors hover:border-[#22221E]/40 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav-drawer"
            aria-label="Mobile navigation"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#22221E]/10 bg-[#FFF8ED] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => {
                const isActive = activeHref === link.href
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F6ECDC] text-[#B83220]'
                        : 'text-[#22221E] hover:bg-[#F6ECDC] hover:text-[#D8432E]'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
