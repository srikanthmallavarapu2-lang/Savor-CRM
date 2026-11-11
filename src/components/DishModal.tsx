import { useEffect, useRef } from 'react'
import { Check, Info, X } from 'lucide-react'
import { motion } from 'motion/react'
import type { Dish } from '../types/savor'
import { usePrefersReducedMotion } from '../hooks/useViewportPrefs'

interface DishModalProps {
  dish: Dish | null
  onClose: () => void
}

export function DishModal({ dish, onClose }: DishModalProps) {
  const reducedMotion = usePrefersReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dish) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [dish, onClose])

  if (!dish) return null

  return (
    <motion.div
      key={dish.id}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.16 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      aria-describedby="dish-modal-description"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#22221E]/60 backdrop-blur-xs"
        aria-hidden="true"
      />

      <motion.div
        ref={dialogRef}
        initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-[#22221E]/15 bg-[#FFF8ED] shadow-[0_28px_70px_rgba(34,34,30,0.3)]"
      >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close dish details"
              className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#22221E]/15 bg-[#FFF8ED]/95 text-[#22221E] shadow-sm transition-colors hover:bg-[#D8432E] hover:text-[#FFF8ED]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-[16/10] w-full overflow-hidden bg-[#F3E7D3]">
              <img
                src={dish.image}
                alt={dish.alt}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-[#244C35]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#244C35] uppercase">
                  {dish.category} · {dish.originTag}
                </span>
                <span className="font-display text-2xl font-semibold text-[#22221E]">
                  ${dish.price}
                </span>
              </div>

              <h2
                id="dish-modal-title"
                className="mt-3 font-display text-2xl font-semibold text-[#22221E] sm:text-3xl"
              >
                {dish.name}
              </h2>

              <p
                id="dish-modal-description"
                className="mt-3 text-base leading-relaxed text-[#22221E]/80"
              >
                {dish.fullDescription}
              </p>

              <div className="mt-6 grid gap-5 border-t border-[#22221E]/10 pt-5 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.15em] text-[#57564E] uppercase">
                    Key Ingredients
                  </h3>
                  <ul className="mt-2.5 space-y-1.5">
                    {dish.ingredients.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-[#22221E]/85"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#244C35]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold tracking-[0.15em] text-[#57564E] uppercase">
                      Kitchen Note
                    </h3>
                    <p className="mt-2 text-sm text-[#22221E]/85">{dish.prepNote}</p>
                    <p className="mt-1.5 text-xs font-medium text-[#244C35]">
                      {dish.pairingNote}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold tracking-[0.15em] text-[#57564E] uppercase">
                      Dietary Profile
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {dish.dietaryTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#22221E]/15 bg-[#FCF6EB] px-3 py-1 text-xs font-medium text-[#22221E]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-[#22221E]/10 bg-[#F6ECDC] p-3.5 text-xs leading-relaxed text-[#22221E]/80">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#244C35]" aria-hidden="true" />
                <span>
                  Sample dish card for the SAVOR static culinary showcase. No online
                  ordering or checkout is simulated.
                </span>
              </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

