import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import type { Dish } from '../types/savor'
import { usePrefersReducedMotion } from '../hooks/useViewportPrefs'

interface DishCardProps {
  dish: Dish
  index: number
  onSelect: (dish: Dish, triggerEl: HTMLElement | null) => void
}

export function DishCard({ dish, index, onSelect }: DishCardProps) {
  const reducedMotion = usePrefersReducedMotion()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reducedMotion || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({
      rotateX: Number((-py * 6).toFixed(2)),
      rotateY: Number((px * 6).toFixed(2)),
    })
  }

  const handlePointerLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  return (
    <motion.article
      layout={!reducedMotion}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2), ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
      className="h-full"
    >
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => onSelect(dish, buttonRef.current)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        animate={
          reducedMotion
            ? undefined
            : {
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
              }
        }
        whileTap={reducedMotion ? undefined : { scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        aria-label={`View details for ${dish.name}, $${dish.price}`}
        className="group flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-[#22221E]/10 bg-[#FCF6EB] text-left shadow-[0_10px_30px_rgba(34,34,30,0.04)] transition-colors hover:border-[#22221E]/25 hover:shadow-[0_18px_38px_rgba(34,34,30,0.09)]"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3E7D3]">
          <img
            src={dish.image}
            alt={dish.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute top-3.5 left-3.5 rounded-full bg-[#FFF8ED]/92 px-3 py-1 text-[11px] font-semibold tracking-wider text-[#244C35] uppercase backdrop-blur-xs">
            {dish.category}
          </div>
          <div className="absolute top-3.5 right-3.5 rounded-full bg-[#22221E]/90 px-3 py-1 text-xs font-semibold text-[#FFF8ED]">
            ${dish.price}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#57564E] uppercase">
              {dish.originTag}
            </p>
            <h3 className="mt-1.5 font-display text-xl leading-snug font-semibold text-[#22221E] transition-colors group-hover:text-[#B83220]">
              {dish.name}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#22221E]/75">
              {dish.shortDescription}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#22221E]/10 pt-4">
            <span className="truncate text-xs font-medium text-[#244C35]">
              {dish.dietaryTags[0]}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-semibold tracking-wide text-[#B83220] uppercase">
              Tasting Notes
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </motion.button>
    </motion.article>
  )
}

