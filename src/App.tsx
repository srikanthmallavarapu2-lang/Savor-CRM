import { useRef, useState } from 'react'
import { MotionConfig } from 'motion/react'
import type { Dish } from './types/savor'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { MenuSection } from './components/MenuSection'
import { IngredientsSection } from './components/IngredientsSection'
import { SqueezeCarouselSection } from './components/SqueezeCarouselSection'
import { StorySection } from './components/StorySection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { VisitSection } from './components/VisitSection'
import { Footer } from './components/Footer'
import { DishModal } from './components/DishModal'

export function App() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const handleSelectDish = (dish: Dish, triggerEl: HTMLElement | null) => {
    triggerRef.current = triggerEl
    setSelectedDish(dish)
  }

  const handleCloseModal = () => {
    setSelectedDish(null)
    requestAnimationFrame(() => {
      triggerRef.current?.focus()
    })
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#FFF8ED] text-[#22221E]">
        {/* Subtle editorial grain layer */}
        <div
          className="savor-grain pointer-events-none fixed inset-0 z-30 opacity-[0.035]"
          aria-hidden="true"
        />

        <Navbar />

        <main id="main-content">
          <HeroSection />
          <MenuSection onSelectDish={handleSelectDish} />
          <IngredientsSection onSelectDish={handleSelectDish} />
          <SqueezeCarouselSection onSelectDish={handleSelectDish} />
          <StorySection />
          <TestimonialsSection />
          <VisitSection />
        </main>

        <Footer />

        <DishModal dish={selectedDish} onClose={handleCloseModal} />
      </div>
    </MotionConfig>
  )
}

export default App

