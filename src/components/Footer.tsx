import { COMPONENT_EVALUATIONS, NAV_LINKS } from '../data/savorData'

export function Footer() {
  return (
    <footer className="border-t border-[#22221E]/12 bg-[#22221E] py-14 text-[#FFF8ED]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-[#FFF8ED]/12 pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-semibold tracking-tight">SAVOR</p>
            <p className="mt-1 text-xs font-medium tracking-[0.2em] text-[#F7C5B8] uppercase">
              Taste in Motion
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#FFF8ED]/75">
              Static editorial food brand showcase built with React, TypeScript, Vite,
              Tailwind CSS, Motion, and procedural Three.js / React Three Fiber.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.16em] text-[#FFF8ED]/60 uppercase">
              Explore
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#FFF8ED]/85 transition-colors hover:text-[#F7C5B8]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold tracking-[0.16em] text-[#FFF8ED]/60 uppercase">
              21st.dev Evaluation &amp; Assets
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#FFF8ED]/75">
              Community component patterns evaluated at{' '}
              <a
                href="https://21st.dev/community/components"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#FFF8ED]/35 underline-offset-3 hover:text-[#F7C5B8]"
              >
                21st.dev
              </a>
              . Because copying full source from 21st.dev requires an account, SAVOR
              implements original equivalents inspired by MIT-licensed patterns:
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-[#FFF8ED]/80">
              {COMPONENT_EVALUATIONS.map((item) => (
                <li key={item.name}>
                  <span className="font-semibold text-[#FFF8ED]">{item.name}</span>{' '}
                  <span className="text-[#FFF8ED]/60">({item.author})</span> —{' '}
                  <span className="text-[#F7C5B8]">{item.verdict}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 text-xs text-[#FFF8ED]/65 sm:flex-row sm:items-center">
          <p>
            Demo brand content &amp; AI-generated culinary photography for SAVOR static
            showcase. See CREDITS.md for full attribution.
          </p>
          <p>SAVOR — Taste in Motion · Static Showcase</p>
        </div>
      </div>
    </footer>
  )
}

