export type DishCategory = 'All' | 'Signature' | 'Plant-Based' | 'Desserts'

export interface Dish {
  id: string
  name: string
  category: Exclude<DishCategory, 'All'>
  price: number
  shortDescription: string
  fullDescription: string
  ingredients: string[]
  dietaryTags: string[]
  prepNote: string
  pairingNote: string
  image: string
  alt: string
  featured?: boolean
  originTag: string
}

export interface IngredientStoryItem {
  id: string
  title: string
  region: string
  harvestWindow: string
  summary: string
  kitchenUse: string
  tastingNote: string
  featuredDishIds: string[]
  image: string
  alt: string
  accent: 'tomato' | 'basil' | 'charcoal'
}

export interface SampleTestimonial {
  id: string
  quote: string
  author: string
  role: string
  visitNote: string
}

export interface ComponentEvaluationItem {
  name: string
  author: string
  license: string
  dependencies: string
  verdict: 'Adapted Concept' | 'Skipped'
  rationale: string
}

