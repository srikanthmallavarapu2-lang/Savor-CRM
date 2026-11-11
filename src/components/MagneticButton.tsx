import { type ReactNode, useState } from 'react'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../hooks/useViewportPrefs'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
}

/**
 * Original subtle magnetic spring wrapper inspired by 21st.dev Magnetic Motion Buttons.
 * Active on mouse pointers only; disabled for touch devices and reduced-motion preferences.
 */
export function MagneticButton({ children, className = '' }: MagneticButtonProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.14
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.18
    setOffset({
      x: Math.max(-6, Math.min(6, dx)),
      y: Math.max(-5, Math.min(5, dy)),
    })
  }

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0 })
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      animate={reducedMotion ? undefined : { x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

