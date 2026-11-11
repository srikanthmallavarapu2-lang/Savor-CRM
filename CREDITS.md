# Asset Credits & 21st.dev Component Evaluation

## 21st.dev Component Evaluation

Inspected the [21st.dev Community Components](https://21st.dev/community/components) catalog across Heroes, Cards, Carousels, Galleries, Navigation Menus, Buttons, Texts, Testimonials, Shaders, and Footers.

**Access Limitation Identified:** Copying full component source code or pulling via the 21st.dev CLI/MCP registry requires an authenticated 21st.dev account (with daily limits on free accounts). Because no 21st.dev account session was used in this environment, **no third-party source code was imported from 21st.dev**; instead, original SAVOR components were authored cleanly from scratch where the design pattern fit the culinary brand.

| Component Evaluated | Creator (per 21st.dev) | Listed License & Dependencies | Decision for SAVOR |
| --- | --- | --- | --- |
| **Squeeze Carousel** | Yura Dubinin (Yura Oak) | MIT License · `motion`, `lucide-react`, Tailwind CSS | **Adapted Concept:** Built an original `SqueezeCarouselSection.tsx` using `motion` spring layout animations (`flexGrow`) with keyboard arrow and touch-swipe support. |
| **3D Interactive Card Gallery** | Dhileep Kumar GM / Subhan Uddin | MIT License · `motion`, `lucide-react`, Tailwind CSS | **Adapted Concept:** Built an original restrained pointer-tilt interaction (`±3°` on mouse hover only) inside `DishCard.tsx`, omitting glassmorphism and floating particles. |
| **Split Testimonial** | Jatin Yadav | MIT License · `motion`, `lucide-react`, Tailwind CSS | **Adapted Concept:** Built an original editorial two-column quote switcher in `TestimonialsSection.tsx` with guest selector and sample-content notice. |
| **Spinning Circular Text** | Chánh Đại | MIT License · `motion`, SVG `textPath` | **Adapted Concept:** Built an original artisan circular seal in `CircularSeal.tsx` for the hero 3D stage, pausing automatically under `prefers-reduced-motion`. |
| **Magnetic / Selector Patterns** | Community Navigation & Buttons | MIT License · `motion`, Tailwind CSS | **Adapted Concept:** Built `MagneticButton.tsx` (desktop pointer-only micro-pull) and `IntersectionObserver` active underline indicator in `Navbar.tsx`. |
| **Image Stream Hero** | Ruixen | MIT License · `motion`, `lucide-react` | **Skipped:** Dual streaming image rails would compete with SAVOR's central 3D serving plate hero and introduce continuous peripheral motion. |
| **WaterRippleImage** | Rahil Vahora / Kedhareswer Naidu | MIT License · WebGL / Canvas shaders | **Skipped:** Water ripple distortion does not align with warm stoneware/hearth art direction and would add a second WebGL shader surface alongside the hero canvas. |

## Photography & Visual Assets

- **Food & Editorial Photography (`public/images/dishes/*`, `public/images/editorial/*`):** Original AI-generated culinary still-life and editorial portraits created specifically for the SAVOR static demonstration showcase. All dishes, people, and grower names are fictional sample content.
- **3D Serving Plate & Poster Fallback:** Original procedural Three.js geometry (`HeroPlateCanvas.tsx`) with multi-dish course switcher (`Pasta & Burrata`, `Hearth Sea Bass`, `Olive Oil & Fig`) and inline SVG ceramic plate illustration (`HeroPlatePoster.tsx`).
- **Typography:** Google Fonts [`Fraunces`](https://fonts.google.com/specimen/Fraunces) and [`Plus Jakarta Sans`](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (SIL Open Font License 1.1).
- **Icons:** [`lucide-react`](https://lucide.dev/) (ISC License).
