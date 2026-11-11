import { Component, type ReactNode, Suspense, lazy, useEffect, useState } from 'react'
import { ArrowDownRight, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { HeroPlatePoster } from './HeroPlatePoster'
import type { HeroPlateDishId } from './HeroPlateCanvas'
import { CircularSeal } from './CircularSeal'
import { MagneticButton } from './MagneticButton'
import { SplitTextReveal } from './SplitTextReveal'
import {
  detectWebGLSupport,
  useIsMobileViewport,
  usePrefersReducedMotion,
} from '../hooks/useViewportPrefs'

const LazyHeroPlateCanvas = lazy(() =>
  import('./HeroPlateCanvas').then((m) => ({ default: m.HeroPlateCanvas })),
)

const HERO_PLATE_DISHES: { id: HeroPlateDishId; label: string }[] = [
  { id: 'pasta', label: 'Pasta & Burrata' },
  { id: 'seabass', label: 'Hearth Sea Bass' },
  { id: 'dessert', label: 'Olive Oil & Fig' },
]

interface ErrorBoundaryState {
  hasError: boolean
}

class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export function HeroSection() {
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobileViewport()
  const [webglReady, setWebglReady] = useState<boolean | null>(null)
  const [canvasFailed, setCanvasFailed] = useState(false)
  const [activeDish, setActiveDish] = useState<HeroPlateDishId>('pasta')

  useEffect(() => {
    setWebglReady(detectWebGLSupport())
  }, [])

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector)
    el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#22221E]/10 pt-8 pb-16 sm:pt-12 sm:pb-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* HTML Typography & Actions Layer */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 min-w-0 lg:col-span-6"
        >
          <div className="mb-5 inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#244C35]/20 bg-[#FCF6EB] px-3 py-1.5 text-[10px] font-semibold tracking-[0.11em] text-[#244C35] uppercase sm:gap-2 sm:px-3.5 sm:text-xs sm:tracking-[0.14em]">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#D8432E]" aria-hidden="true" />
            <span>Seasonal Kitchen Showcase · Sample Brand</span>
          </div>

          <h1 className="font-display text-4xl leading-[1.06] font-semibold tracking-tight text-[#22221E] sm:text-5xl lg:text-[3.75rem]">
            <SplitTextReveal
              immediate
              lines={[
                { text: 'Good food.' },
                { text: 'A little wonder.', className: 'italic font-normal text-[#D8432E]' },
              ]}
            />
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#22221E]/80 sm:text-lg">
            SAVOR celebrates the quiet theater of seasonal cooking—wood-fired heirloom
            produce, hand-rolled pasta, and vibrant herb oils plated warm on hand-thrown
            stoneware.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <motion.a
                href="#menu"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#menu')
                }}
                whileHover={reducedMotion ? undefined : { y: -2 }}
                whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#C83723] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#FFF8ED] shadow-[0_10px_24px_rgba(200,55,35,0.26)] transition-colors hover:bg-[#B22E1C]"
              >
                Explore the Menu
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            </MagneticButton>

            <a
              href="#ingredients"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#ingredients')
              }}
              className="inline-flex items-center rounded-full border border-[#22221E]/20 bg-[#FCF6EB] px-6 py-3.5 text-sm font-semibold text-[#22221E] transition-colors hover:border-[#244C35] hover:text-[#244C35]"
            >
              Our Ingredients
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-3 border-t border-[#22221E]/10 pt-6 sm:gap-4">
            <div>
              <dt className="text-[11px] font-medium tracking-wider text-[#57564E] uppercase sm:text-xs">
                Tasting Plates
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold text-[#22221E] sm:text-2xl">
                8 Seasonal
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium tracking-wider text-[#57564E] uppercase sm:text-xs">
                Kitchen Craft
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold text-[#244C35] sm:text-2xl">
                Oak Hearth
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium tracking-wider text-[#57564E] uppercase sm:text-xs">
                Demo Scope
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold text-[#22221E] sm:text-2xl">
                Static Web
              </dd>
            </div>
          </dl>
        </motion.div>

        {/* 3D Procedural Serving Plate Stage */}
        <div className="relative min-w-0 lg:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-[510px] overflow-hidden rounded-[2.25rem] border border-[#22221E]/10 bg-[radial-gradient(circle_at_50%_42%,#FFFDF8_0%,#F8EEDF_58%,#EFE0C8_100%)] shadow-[0_28px_70px_rgba(34,34,30,0.1)]">
            <CircularSeal className="absolute top-3 right-3 z-20 hidden sm:block" />

            <div className="absolute inset-1">
              {webglReady && !canvasFailed ? (
                <CanvasErrorBoundary fallback={<HeroPlatePoster reason="fallback" />}>
                  <Suspense fallback={<HeroPlatePoster reason="loading" />}>
                    <LazyHeroPlateCanvas
                      activeDish={activeDish}
                      isMobile={isMobile}
                      reducedMotion={reducedMotion}
                      onWebGLError={() => setCanvasFailed(true)}
                    />
                  </Suspense>
                </CanvasErrorBoundary>
              ) : (
                <HeroPlatePoster reason={webglReady === null ? 'loading' : 'fallback'} />
              )}
            </div>

            <div className="pointer-events-none absolute right-5 bottom-3.5 left-5 flex items-center justify-between gap-2 text-[10px] font-medium tracking-wider text-[#57564E] uppercase sm:text-[11px]">
              <span>Interactive Stoneware Plate</span>
              <span>
                {reducedMotion ? 'Reduced Motion' : 'Move Pointer · Click to Spin'}
              </span>
            </div>
          </div>

          {/* 3D Plate Course Switcher */}
          <div
            role="group"
            aria-label="Preview seasonal courses on 3D plate"
            className="mx-auto mt-4 flex w-fit flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#22221E]/12 bg-[#FCF6EB] p-1.5 shadow-xs"
          >
            {HERO_PLATE_DISHES.map((dish) => {
              const selected = activeDish === dish.id
              return (
                <button
                  key={dish.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveDish(dish.id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    selected
                      ? 'text-[#FFF8ED]'
                      : 'text-[#22221E]/75 hover:text-[#22221E]'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="hero-plate-course-pill"
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 360, damping: 30 }
                      }
                      className="absolute inset-0 rounded-full bg-[#22221E]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{dish.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
