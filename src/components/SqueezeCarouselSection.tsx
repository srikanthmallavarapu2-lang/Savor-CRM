import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { DISHES } from '../data/savorData'
import type { Dish } from '../types/savor'
import { useIsMobileViewport, usePrefersReducedMotion } from '../hooks/useViewportPrefs'

interface SqueezeCarouselSectionProps {
  onSelectDish: (dish: Dish, triggerEl: HTMLElement | null) => void
}

/**
 * Original SAVOR Squeeze Carousel inspired by the 21st.dev Squeeze Carousel pattern.
 * Supports keyboard ArrowLeft/ArrowRight navigation and mobile touch-swipe gestures.
 */
export function SqueezeCarouselSection({ onSelectDish }: SqueezeCarouselSectionProps) {
  const featured = DISHES.filter((d) => d.featured)
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobileViewport()
  const touchStartX = useRef<number | null>(null)

  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + featured.length) % featured.length)
  const goNext = () =>
    setActiveIndex((prev) => (prev + 1) % featured.length)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goNext()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goPrev()
    }
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current
    const delta = endX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) > 40) {
      if (delta < 0) goNext()
      else goPrev()
    }
  }

  const activeDish = featured[activeIndex]

  return (
    <section
      aria-labelledby="featured-carousel-heading"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="py-18 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#244C35] uppercase">
              03 · Featured Dishes
            </p>
            <h2
              id="featured-carousel-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#22221E] sm:text-4xl"
            >
              Plates in motion from tonight’s pass.
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous featured dish"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#22221E]/20 bg-[#FCF6EB] text-[#22221E] transition-colors hover:border-[#D8432E] hover:bg-[#D8432E] hover:text-[#FFF8ED]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next featured dish"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#22221E]/20 bg-[#FCF6EB] text-[#22221E] transition-colors hover:border-[#D8432E] hover:bg-[#D8432E] hover:text-[#FFF8ED]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {isMobile ? (
          <div className="mt-8">
            <article className="overflow-hidden rounded-[2rem] border border-[#22221E]/12 bg-[#FCF6EB] shadow-[0_14px_34px_rgba(34,34,30,0.06)]">
              <div className="aspect-[4/3] overflow-hidden bg-[#EFE1CA]">
                <img
                  src={activeDish.image}
                  alt={activeDish.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-[#244C35] uppercase">
                  <span>{activeDish.category}</span>
                  <span>${activeDish.price}</span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#22221E]">
                  {activeDish.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#22221E]/80">
                  {activeDish.shortDescription}
                </p>
                <button
                  type="button"
                  onClick={(e) => onSelectDish(activeDish, e.currentTarget)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#22221E] px-5 py-2.5 text-xs font-semibold tracking-wide text-[#FFF8ED] uppercase"
                >
                  Open Tasting Notes
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          </div>
        ) : (
          <div
            className="mt-10 flex h-[430px] gap-3"
            role="region"
            aria-label="Featured dishes interactive squeeze carousel"
          >
            {featured.map((dish, idx) => {
              const isActive = idx === activeIndex
              return (
                <motion.div
                  key={dish.id}
                  layout={!reducedMotion}
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          flexGrow: isActive ? 3.4 : 0.85,
                        }
                  }
                  transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                  style={{ flexBasis: 0, flexGrow: isActive ? 3.4 : 0.85 }}
                  className="relative overflow-hidden rounded-[2rem] border border-[#22221E]/12 bg-[#22221E]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    aria-pressed={isActive}
                    aria-label={`Highlight ${dish.name}, $${dish.price}`}
                    className="relative block h-full w-full text-left focus-visible:outline-offset-[-4px]"
                  >
                    <img
                      src={dish.image}
                      alt={dish.alt}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full object-cover transition-all duration-500 ${
                        isActive ? 'scale-100 opacity-95' : 'scale-105 opacity-60 saturate-75'
                      }`}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#22221E]/90 via-[#22221E]/25 to-transparent"
                      aria-hidden="true"
                    />
                  </button>

                  {isActive ? (
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28 }}
                      className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 text-[#FFF8ED]"
                    >
                      <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-[#FFF8ED]/85 uppercase">
                        <span className="rounded-full bg-[#D8432E] px-2.5 py-0.5 text-[#FFF8ED]">
                          {dish.category}
                        </span>
                        <span>${dish.price}</span>
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-[#FFF8ED]">
                        {dish.name}
                      </h3>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[#FFF8ED]/85">
                        {dish.shortDescription}
                      </p>
                      <div className="pointer-events-auto mt-4">
                        <button
                          type="button"
                          onClick={(e) => onSelectDish(dish, e.currentTarget)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8ED] px-4 py-2 text-xs font-semibold tracking-wide text-[#22221E] uppercase transition-colors hover:bg-[#D8432E] hover:text-[#FFF8ED]"
                        >
                          View Dish Details
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
                      <span className="rounded-full bg-[#FFF8ED]/90 px-3 py-1 text-[11px] font-semibold tracking-wider text-[#22221E] uppercase">
                        0{idx + 1}
                      </span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        <div className="mt-5 flex items-center justify-center gap-2">
          {featured.map((dish, idx) => (
            <button
              key={dish.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Select featured dish ${idx + 1}: ${dish.name}`}
              className={`h-2 rounded-full transition-all ${
                idx === activeIndex
                  ? 'w-7 bg-[#D8432E]'
                  : 'w-2 bg-[#22221E]/25 hover:bg-[#22221E]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
