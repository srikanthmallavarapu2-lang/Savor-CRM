import { useState } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { motion } from 'motion/react'
import { SAMPLE_TESTIMONIALS } from '../data/savorData'
import { usePrefersReducedMotion } from '../hooks/useViewportPrefs'

/**
 * Editorial split-layout testimonial showcase inspired by the 21st.dev Split Testimonial pattern.
 * Explicitly labeled as sample demo content.
 */
export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  const active = SAMPLE_TESTIMONIALS[activeIndex]
  const goPrev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + SAMPLE_TESTIMONIALS.length) % SAMPLE_TESTIMONIALS.length,
    )
  const goNext = () =>
    setActiveIndex((prev) => (prev + 1) % SAMPLE_TESTIMONIALS.length)

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-b border-[#22221E]/10 bg-[#FFF8ED] py-18 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#D8432E]/30 bg-[#D8432E]/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-[#B83220] uppercase">
              Sample Guest Notes · Demo Content
            </span>
            <h2
              id="testimonials-heading"
              className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#22221E] sm:text-4xl"
            >
              Notes from fictional evening services.
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-[#57564E]">
            The quotes below are illustrative demo testimonials written for the SAVOR
            brand showcase and do not represent real restaurant patrons.
          </p>
        </div>

        {/* Split editorial quote stage */}
        <div className="mt-10 grid gap-8 rounded-[2.25rem] border border-[#22221E]/12 bg-[#FCF6EB] p-6 shadow-[0_14px_38px_rgba(34,34,30,0.05)] sm:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4 lg:border-r lg:border-[#22221E]/10 lg:pr-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-[#244C35] uppercase">
              Sample Note 0{activeIndex + 1} / 0{SAMPLE_TESTIMONIALS.length}
            </p>
            <div className="mt-4 space-y-2">
              {SAMPLE_TESTIMONIALS.map((item, idx) => {
                const isSelected = idx === activeIndex
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveIndex(idx)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors ${
                      isSelected
                        ? 'border-[#22221E] bg-[#22221E] text-[#FFF8ED]'
                        : 'border-[#22221E]/10 bg-[#FFF8ED] text-[#22221E] hover:border-[#22221E]/30'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{item.author}</p>
                      <p
                        className={`text-xs ${
                          isSelected ? 'text-[#FFF8ED]/75' : 'text-[#57564E]'
                        }`}
                      >
                        {item.role}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        isSelected ? 'text-[#F7C5B8]' : 'text-[#57564E]'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col justify-between lg:col-span-8 lg:pl-4">
            <motion.figure
              key={active.id}
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Quote className="h-7 w-7 text-[#D8432E]" aria-hidden="true" />
              <blockquote className="mt-5 font-display text-2xl leading-relaxed text-[#22221E] sm:text-3xl">
                “{active.quote}”
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#22221E]/10 pt-5">
                <div>
                  <p className="text-base font-semibold text-[#22221E]">{active.author}</p>
                  <p className="text-xs text-[#57564E]">
                    {active.role} · {active.visitNote}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous sample testimonial"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#22221E]/18 bg-[#FFF8ED] text-[#22221E] transition-colors hover:border-[#D8432E] hover:bg-[#D8432E] hover:text-[#FFF8ED]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next sample testimonial"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#22221E]/18 bg-[#FFF8ED] text-[#22221E] transition-colors hover:border-[#D8432E] hover:bg-[#D8432E] hover:text-[#FFF8ED]"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  )
}
