# SAVOR — Taste in Motion

A static, responsive editorial food brand website built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Motion**, and **Three.js** (`@react-three/fiber` + `@react-three/drei`).

> **Demo Notice:** SAVOR is a fictional culinary brand showcase. All dishes, prices, chef profile details, testimonials, hours, and street address are sample demonstration content. No reservation or email submission backend is simulated.

## Features

- **Procedural 3D Multi-Course Hero (`HeroPlateCanvas.tsx`, `HeroSection.tsx`, `CircularSeal.tsx`, `MagneticButton.tsx`)**: Lazy-loaded stoneware serving plate with interactive course switching (*Pasta & Burrata*, *Hearth Sea Bass*, *Olive Oil & Fig*), click-to-spin 360° inspection, rising aroma motes, pointer parallax, scroll-driven rotation, capped pixel density, mobile complexity reduction, rotating SVG seal, magnetic CTA hover, `prefers-reduced-motion` support, and an SVG poster fallback (`HeroPlatePoster.tsx`) while loading or if WebGL fails.
- **Masked Split-Text Editorial Headings (`SplitTextReveal.tsx`)**: Smooth baseline-clipped editorial headline reveal that renders immediately when `prefers-reduced-motion` is enabled.
- **Scroll-Active Navigation (`Navbar.tsx`)**: Section tracking via `IntersectionObserver` with spring active indicator, skip link, and Escape-closable mobile menu.
- **Filterable Menu & Accessible Modal (`MenuSection.tsx`, `DishCard.tsx`, `DishModal.tsx`)**: Eight seasonal sample dishes across `All`, `Signature`, `Plant-Based`, and `Desserts`, secondary dietary filter chips, restrained card tilt, focus-restoring modal dialog, and beverage `pairingNote` recommendations.
- **Interactive Ingredient Provenance (`IngredientsSection.tsx`)**: Asymmetric editorial layout with selectable harvest tasting profiles linking directly to the corresponding dish modal.
- **Squeeze Carousel (`SqueezeCarouselSection.tsx`)**: Original interactive featured-dish carousel inspired by the 21st.dev Squeeze Carousel pattern, featuring expanding desktop panels, mobile spotlight cards, keyboard arrow navigation, and touch swipe.
- **Brand Story, Split Testimonials & Visit Section (`StorySection.tsx`, `TestimonialsSection.tsx`, `VisitSection.tsx`)**: Chef Elena Moretti profile, split editorial demo testimonial switcher, and sample address linking to OpenStreetMap coordinates.

## Local Setup & Production Build

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Type-check and build static production bundle (outputs to dist/)
npm run build

# 4. Preview production build locally
npm run preview
```

Because `vite.config.ts` sets `base: './'`, the generated `dist/` folder deploys directly to any static host (GitHub Pages, Netlify, Cloudflare Pages, Vercel static, or S3) without a backend.
