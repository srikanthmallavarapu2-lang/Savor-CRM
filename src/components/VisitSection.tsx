import { Clock, ExternalLink, Info, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import { VISIT_INFO } from '../data/savorData'
import { usePrefersReducedMotion } from '../hooks/useViewportPrefs'
import { MagneticButton } from './MagneticButton'

export function VisitSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section
      id="visit"
      className="scroll-mt-24 bg-[#F6ECDC]/75 py-18 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 rounded-[2.25rem] border border-[#22221E]/12 bg-[#FFF8ED] p-6 shadow-[0_18px_48px_rgba(34,34,30,0.06)] sm:p-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-6">
            <span className="inline-flex items-center rounded-full border border-[#244C35]/20 bg-[#244C35]/8 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-[#244C35] uppercase">
              05 · Visit Us (Sample Details)
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#22221E] sm:text-4xl">
              Find the courtyard table.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#22221E]/78 sm:text-base">
              {VISIT_INFO.notice}. Follow the map link below to inspect the sample
              neighborhood coordinates on OpenStreetMap.
            </p>

            <div className="mt-7 space-y-5">
              <div className="flex items-start gap-3.5">
                <MapPin
                  className="mt-1 h-5 w-5 shrink-0 text-[#D8432E]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.15em] text-[#57564E] uppercase">
                    Sample Address
                  </h3>
                  <p className="mt-1 text-base font-medium text-[#22221E]">
                    {VISIT_INFO.addressLine1}
                  </p>
                  <p className="text-sm text-[#22221E]/80">{VISIT_INFO.addressLine2}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail
                  className="mt-1 h-5 w-5 shrink-0 text-[#244C35]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.15em] text-[#57564E] uppercase">
                    Demo Contact
                  </h3>
                  <p className="mt-1 text-sm text-[#22221E]/85">
                    <a
                      href={`mailto:${VISIT_INFO.email}`}
                      className="underline decoration-[#22221E]/30 underline-offset-4 transition-colors hover:text-[#D8432E]"
                    >
                      {VISIT_INFO.email}
                    </a>
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-[#22221E]/80">
                    <Phone className="h-3.5 w-3.5 text-[#57564E]" aria-hidden="true" />
                    <span>{VISIT_INFO.phone}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <motion.a
                  href={VISIT_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reducedMotion ? undefined : { y: -2 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#22221E] px-6 py-3 text-sm font-semibold text-[#FFF8ED] transition-colors hover:bg-[#D8432E]"
                >
                  {VISIT_INFO.mapLabel}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </motion.a>
              </MagneticButton>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[1.75rem] border border-[#22221E]/10 bg-[#FCF6EB] p-6 sm:p-8 lg:col-span-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-[#244C35] uppercase">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>Sample Opening Hours</span>
              </div>

              <dl className="mt-5 divide-y divide-[#22221E]/10">
                {VISIT_INFO.hours.map((row) => (
                  <div
                    key={row.days}
                    className="flex flex-col justify-between gap-1 py-3.5 sm:flex-row sm:items-center"
                  >
                    <dt className="text-sm font-medium text-[#22221E]">{row.days}</dt>
                    <dd className="text-sm text-[#57564E]">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-[#22221E]/10 bg-[#FFF8ED] p-4 text-xs leading-relaxed text-[#22221E]/80">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#D8432E]" aria-hidden="true" />
              <span>
                Static Site Notice: SAVOR is a frontend design and 3D craft demo.
                Table reservation and email submission forms are intentionally omitted so
                no bookings or messages are simulated.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

