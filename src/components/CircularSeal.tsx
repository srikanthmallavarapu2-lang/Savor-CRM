import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../hooks/useViewportPrefs'

interface CircularSealProps {
  text?: string
  className?: string
}

/**
 * Original SAVOR rotating circular stamp inspired by 21st.dev Spinning Circular Text.
 * Automatically pauses rotation when the user prefers reduced motion.
 */
export function CircularSeal({
  text = 'WOOD-FIRED · SEASONAL · TASTE IN MOTION ·',
  className = '',
}: CircularSealProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#22221E]/12 bg-[#FFF8ED]/88 shadow-sm backdrop-blur-xs">
        <motion.svg
          viewBox="0 0 100 100"
          className="h-20 w-20"
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={
            reducedMotion
              ? undefined
              : { duration: 24, repeat: Infinity, ease: 'linear' }
          }
        >
          <defs>
            <path
              id="savor-seal-circle"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            fill="#22221E"
            fontSize="6.7"
            fontWeight="600"
            letterSpacing="1.35"
          >
            <textPath href="#savor-seal-circle" textLength="224" lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
        </motion.svg>
        <span className="absolute h-2.5 w-2.5 rounded-full bg-[#D8432E]" />
      </div>
    </div>
  )
}

