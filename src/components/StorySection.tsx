import { motion } from 'motion/react'
import { CHEF_PROFILE } from '../data/savorData'
import { usePrefersReducedMotion } from '../hooks/useViewportPrefs'
import { SplitTextReveal } from './SplitTextReveal'

export function StorySection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section
      id="story"
      className="scroll-mt-24 border-t border-[#22221E]/10 bg-[#244C35] py-18 text-[#FFF8ED] sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="overflow-hidden rounded-[2.25rem] border border-[#FFF8ED]/15 bg-[#1C3B29] p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
            <div className="aspect-[4/5] overflow-hidden rounded-[1.75rem]">
              <img
                src={CHEF_PROFILE.image}
                alt={CHEF_PROFILE.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between px-3 pt-3 pb-1 text-xs text-[#FFF8ED]/80">
              <span>{CHEF_PROFILE.name}</span>
              <span>Sample Chef Portrait</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-[#FFF8ED]/75 uppercase">
            04 · Our Story &amp; Kitchen Philosophy
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#FFF8ED] sm:text-4xl lg:text-5xl">
            <SplitTextReveal
              lines={[
                { text: 'Taste in motion means cooking' },
                { text: 'at the speed of the market.' },
              ]}
            />
          </h2>

          <blockquote className="mt-6 border-l-2 border-[#D8432E] pl-5 font-display text-xl leading-relaxed italic text-[#FFF8ED]/95 sm:text-2xl">
            “{CHEF_PROFILE.quote}”
          </blockquote>

          <p className="mt-5 text-base leading-relaxed text-[#FFF8ED]/85">
            {CHEF_PROFILE.bio}
          </p>

          <p className="mt-2 text-xs font-medium tracking-wider text-[#FFF8ED]/65 uppercase">
            {CHEF_PROFILE.role}
          </p>

          <div className="mt-8 grid gap-4 border-t border-[#FFF8ED]/15 pt-7 sm:grid-cols-3">
            {CHEF_PROFILE.principles.map((p) => (
              <div
                key={p.label}
                className="rounded-2xl border border-[#FFF8ED]/12 bg-[#FFF8ED]/6 p-4"
              >
                <p className="text-xs font-semibold tracking-wider text-[#F7C5B8] uppercase">
                  {p.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#FFF8ED]/85">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

