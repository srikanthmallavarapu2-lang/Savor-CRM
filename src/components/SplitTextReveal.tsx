import { Fragment } from 'react'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../hooks/useViewportPrefs'

interface SplitTextRevealProps {
  lines: { text: string; className?: string }[]
  immediate?: boolean
  delayBase?: number
}

/**
 * Editorial baseline clip-mask line reveal inspired by 21st.dev Split Text patterns.
 * Renders plain static spans when prefers-reduced-motion is enabled.
 */
export function SplitTextReveal({
  lines,
  immediate = false,
  delayBase = 0,
}: SplitTextRevealProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={line.text}>
          <span className="inline-block overflow-hidden align-bottom">
            {reducedMotion ? (
              <span className={`inline-block ${line.className ?? ''}`}>
                {line.text}
              </span>
            ) : (
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                {...(immediate
                  ? { animate: { y: '0%', opacity: 1 } }
                  : {
                      whileInView: { y: '0%', opacity: 1 },
                      viewport: { once: true, amount: 0.2 },
                    })}
                transition={{
                  duration: 0.55,
                  delay: delayBase + index * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block ${line.className ?? ''}`}
              >
                {line.text}
              </motion.span>
            )}
          </span>
          {index < lines.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  )
}
