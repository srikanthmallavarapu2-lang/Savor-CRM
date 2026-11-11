import { useState } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { DISHES, INGREDIENT_STORIES } from '../data/savorData'
import type { Dish } from '../types/savor'
import { usePrefersReducedMotion } from '../hooks/useViewportPrefs'
import { SplitTextReveal } from './SplitTextReveal'

interface IngredientsSectionProps {
  onSelectDish: (dish: Dish, triggerEl: HTMLElement | null) => void
}

export function IngredientsSection({ onSelectDish }: IngredientsSectionProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [selectedId, setSelectedId] = useState(INGREDIENT_STORIES[0].id)

  const activeStory =
    INGREDIENT_STORIES.find((item) => item.id === selectedId) ?? INGREDIENT_STORIES[0]
  const primaryStory = INGREDIENT_STORIES[0]
  const secondaryStories = INGREDIENT_STORIES.slice(1)
  const linkedDishes = DISHES.filter((dish) =>
    activeStory.featuredDishIds.includes(dish.id),
  )

  return (
    <section
      id="ingredients"
      className="scroll-mt-24 border-y border-[#22221E]/10 bg-[#F6ECDC]/65 py-18 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#B83220] uppercase">
              02 · Ingredient Provenance
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#22221E] sm:text-4xl lg:text-5xl">
              <SplitTextReveal
                lines={[
                  { text: 'Good flavor begins long before' },
                  { text: 'the pan heats up.' },
                ]}
              />
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#22221E]/78 sm:text-base lg:col-span-5">
            Every SAVOR course starts with three pantry pillars—sun-cured tomatoes,
            peppery first-press oil, and freshly milled flour—sourced from fictional
            sample growers. Select any ingredient to inspect harvest notes and dishes.
          </p>
        </motion.div>

        {/* Asymmetric editorial grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Primary tall feature card */}
          <motion.article
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden rounded-[2rem] border bg-[#FFF8ED] transition-shadow lg:col-span-7 ${
              selectedId === primaryStory.id
                ? 'border-[#D8432E] shadow-[0_18px_46px_rgba(216,67,46,0.14)]'
                : 'border-[#22221E]/10 shadow-[0_14px_40px_rgba(34,34,30,0.06)]'
            }`}
          >
            <button
              type="button"
              aria-pressed={selectedId === primaryStory.id}
              onClick={() => setSelectedId(primaryStory.id)}
              className="block w-full text-left focus-visible:outline-none"
            >
              <div className="aspect-[16/11] overflow-hidden bg-[#EFE1CA]">
                <img
                  src={primaryStory.image}
                  alt={primaryStory.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold tracking-wider text-[#B83220] uppercase">
                  <span>{primaryStory.region}</span>
                  <span>{primaryStory.harvestWindow}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-[#22221E] sm:text-3xl">
                  {primaryStory.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#22221E]/80">
                  {primaryStory.summary}
                </p>
                <p className="mt-4 border-t border-[#22221E]/10 pt-4 text-sm font-medium text-[#244C35]">
                  In the kitchen: {primaryStory.kitchenUse}
                </p>
              </div>
            </button>
          </motion.article>

          {/* Offset stacked secondary cards */}
          <div className="flex flex-col gap-8 lg:col-span-5 lg:pt-14">
            {secondaryStories.map((item, idx) => {
              const isSelected = selectedId === item.id
              return (
                <motion.article
                  key={item.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`overflow-hidden rounded-[1.75rem] border bg-[#FFF8ED] transition-shadow ${
                    isSelected
                      ? 'border-[#244C35] shadow-[0_16px_40px_rgba(36,76,53,0.14)]'
                      : 'border-[#22221E]/10 shadow-[0_12px_32px_rgba(34,34,30,0.05)]'
                  }`}
                >
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(item.id)}
                    className="grid w-full text-left focus-visible:outline-none sm:grid-cols-12"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#EFE1CA] sm:col-span-5 sm:aspect-auto">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5 sm:col-span-7 sm:p-6">
                      <p className="text-[11px] font-semibold tracking-wider text-[#244C35] uppercase">
                        {item.harvestWindow}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl font-semibold text-[#22221E]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#22221E]/78">
                        {item.summary}
                      </p>
                      <p className="mt-3 text-xs font-medium text-[#57564E]">
                        {item.kitchenUse}
                      </p>
                    </div>
                  </button>
                </motion.article>
              )
            })}
          </div>
        </div>

        {/* Interactive Ingredient Tasting & Dish Links Drawer */}
        <motion.div
          key={activeStory.id}
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 rounded-[2rem] border border-[#22221E]/12 bg-[#FFF8ED] p-6 shadow-[0_12px_34px_rgba(34,34,30,0.05)] sm:p-8"
          aria-live="polite"
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em] text-[#B83220] uppercase">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Harvest Tasting Profile · {activeStory.title}</span>
              </p>
              <p className="mt-2 font-display text-xl leading-snug text-[#22221E] sm:text-2xl">
                {activeStory.tastingNote}
              </p>
            </div>

            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#57564E] uppercase">
                Featured in these sample courses (inspect dish)
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {linkedDishes.map((dish) => (
                  <button
                    key={dish.id}
                    type="button"
                    onClick={(e) => onSelectDish(dish, e.currentTarget)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#244C35]/25 bg-[#FCF6EB] px-4 py-2 text-xs font-semibold text-[#244C35] transition-colors hover:border-[#244C35] hover:bg-[#244C35] hover:text-[#FFF8ED] sm:text-sm"
                  >
                    <span>{dish.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
