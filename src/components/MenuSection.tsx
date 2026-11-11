import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { DISHES, MENU_CATEGORIES } from '../data/savorData'
import type { Dish, DishCategory } from '../types/savor'
import { usePrefersReducedMotion } from '../hooks/useViewportPrefs'
import { DishCard } from './DishCard'

interface MenuSectionProps {
  onSelectDish: (dish: Dish, triggerEl: HTMLElement | null) => void
}

const DIETARY_CHIPS = [
  'All Dietary',
  'Vegetarian',
  '100% Plant-Based',
  'Gluten-Free',
] as const

type DietaryFilter = (typeof DIETARY_CHIPS)[number]

export function MenuSection({ onSelectDish }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<DishCategory>('All')
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('All Dietary')
  const reducedMotion = usePrefersReducedMotion()

  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      const matchesCategory =
        activeCategory === 'All' || dish.category === activeCategory
      const matchesDietary =
        dietaryFilter === 'All Dietary' ||
        dish.dietaryTags.some((tag) =>
          tag.toLowerCase().includes(dietaryFilter.toLowerCase()),
        )
      return matchesCategory && matchesDietary
    })
  }, [activeCategory, dietaryFilter])

  return (
    <section id="menu" className="scroll-mt-24 py-18 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-6 border-b border-[#22221E]/12 pb-8 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#244C35] uppercase">
              01 · Seasonal Sample Menu
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#22221E] sm:text-4xl">
              Eight dishes shaped by fire &amp; harvest.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter menu by category"
            className="inline-flex flex-wrap gap-1.5 rounded-2xl border border-[#22221E]/12 bg-[#FCF6EB] p-1.5 sm:rounded-full"
          >
            {MENU_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`relative rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors sm:text-sm ${
                    isSelected
                      ? 'text-[#FFF8ED]'
                      : 'text-[#22221E]/80 hover:text-[#22221E]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="menu-category-pill"
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 360, damping: 30 }
                      }
                      className="absolute inset-0 rounded-full bg-[#22221E]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter by dietary preference"
          >
            {DIETARY_CHIPS.map((chip) => {
              const selected = dietaryFilter === chip
              return (
                <button
                  key={chip}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setDietaryFilter(chip)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    selected
                      ? 'border-[#244C35] bg-[#244C35] text-[#FFF8ED]'
                      : 'border-[#22221E]/14 bg-[#FCF6EB] text-[#22221E]/80 hover:border-[#244C35]/50'
                  }`}
                >
                  {chip}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#57564E]">
            <span>
              Showing {filteredDishes.length} of {DISHES.length} sample dishes
            </span>
            <span>Select any card for tasting notes</span>
          </div>
        </div>

        {filteredDishes.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredDishes.map((dish, idx) => (
              <DishCard
                key={dish.id}
                dish={dish}
                index={idx}
                onSelect={onSelectDish}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.75rem] border border-[#22221E]/12 bg-[#FCF6EB] p-8 text-center">
            <p className="font-display text-xl text-[#22221E]">
              No dishes match both “{activeCategory}” and “{dietaryFilter}”.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All')
                setDietaryFilter('All Dietary')
              }}
              className="mt-4 inline-flex rounded-full bg-[#22221E] px-5 py-2.5 text-xs font-semibold tracking-wider text-[#FFF8ED] uppercase transition-colors hover:bg-[#D8432E]"
            >
              Reset Menu Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
