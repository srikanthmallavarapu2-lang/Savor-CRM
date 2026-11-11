import type {
  ComponentEvaluationItem,
  Dish,
  DishCategory,
  IngredientStoryItem,
  SampleTestimonial,
} from '../types/savor'

export const MENU_CATEGORIES: DishCategory[] = [
  'All',
  'Signature',
  'Plant-Based',
  'Desserts',
]

export const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Our Story', href: '#story' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Visit Us', href: '#visit' },
] as const

export const DISHES: Dish[] = [
  {
    id: 'burrata-heirloom',
    name: 'Charred Heirloom & Burrata',
    category: 'Signature',
    price: 22,
    shortDescription:
      'Blistered red and amber heirloom tomatoes with hand-pulled burrata, emerald basil oil, and Maldon flakes.',
    fullDescription:
      'Early-harvest heirloom tomatoes kissed over white oak embers until their skins blister and sweeten, folded around cool creamy Pugliese-style burrata, cold-pressed basil oil, and warm grilled sourdough.',
    ingredients: [
      'Dry-farmed heirloom tomatoes',
      'Hand-pulled cow’s milk burrata',
      'Cold-infused Genovese basil oil',
      'Aged white balsamic & sea salt',
    ],
    dietaryTags: ['Vegetarian', 'Gluten-Free Option'],
    prepNote: 'Plated to order at cellar temperature',
    pairingNote: 'Sample pairing: Blood orange & rosemary botanical spritz',
    image: './images/dishes/dish-1-burrata.jpg',
    alt: 'Charred red heirloom tomatoes with creamy burrata, basil oil drizzle, and fresh basil leaves on an ivory ceramic plate',
    featured: true,
    originTag: 'Course 01 · Cold Larder',
  },
  {
    id: 'saffron-tagliolini',
    name: 'Hand-Cut Saffron Tagliolini',
    category: 'Signature',
    price: 26,
    shortDescription:
      'Silky bronze-cut egg pasta ribboned with saffron threads, blistered cherry tomatoes, and browned cultured butter.',
    fullDescription:
      'Rolled each morning with heritage durum semolina, pasture egg yolks, and steeped saffron. Tossed gently in a pan emulsion of roasted San Marzano cherry tomatoes, nut-brown butter, and torn sweet basil.',
    ingredients: [
      'Heritage durum & saffron dough',
      'Oven-blistered cherry tomatoes',
      'Cultured brown butter',
      '24-month aged Parmigiano',
    ],
    dietaryTags: ['Vegetarian', 'House-Made Pasta'],
    prepNote: 'Hand-rolled daily at 6:00 AM',
    pairingNote: 'Sample pairing: Dry Piedmontese Arneis or sparkling verjus',
    image: './images/dishes/dish-2-tagliolini.jpg',
    alt: 'Twirled golden saffron tagliolini pasta with roasted cherry tomatoes and fresh basil in a handmade stoneware bowl',
    featured: true,
    originTag: 'Course 02 · Pasta Bench',
  },
  {
    id: 'hearth-sea-bass',
    name: 'Wood-Fired Mediterranean Sea Bass',
    category: 'Signature',
    price: 34,
    shortDescription:
      'Crisp-skinned wild sea bass roasted over oak coals with braised baby fennel and bright basil-caper salsa verde.',
    fullDescription:
      'Line-caught sea bass roasted skin-down on our cast-iron hearth until lacy and crisp, served over slow-braised sweet fennel bulbs, preserved Meyer lemon, and a vibrant mortar-crushed herb salsa verde.',
    ingredients: [
      'Line-caught Mediterranean sea bass',
      'Braised sweet baby fennel',
      'Mortar-crushed basil & caper verde',
      'Preserved Meyer lemon peel',
    ],
    dietaryTags: ['Gluten-Free', 'Dairy-Free'],
    prepNote: 'Roasted over seasoned white oak',
    pairingNote: 'Sample pairing: Crisp Vermentino or chilled fennel-mint tonic',
    image: './images/dishes/dish-3-seabass.jpg',
    alt: 'Crispy-skinned wood-fired sea bass fillet resting on braised fennel with bright green basil salsa verde on an ivory ceramic plate',
    featured: true,
    originTag: 'Course 03 · Wood Hearth',
  },
  {
    id: 'wild-mushroom-polenta',
    name: 'Smoked Mushroom & Herb Polenta',
    category: 'Plant-Based',
    price: 24,
    shortDescription:
      'Stone-ground heirloom corn polenta crowned with hearth-roasted chanterelles, crispy sage, and thyme oil.',
    fullDescription:
      'Slow-whisked flint corn polenta finished with roasted garlic olive oil and vegetable demi-glace, topped with wild Pacific chanterelles and maitake mushrooms seared until crisp at the edges.',
    ingredients: [
      'Stone-ground heirloom flint corn',
      'Wild chanterelle & maitake mushrooms',
      'Crisp fried garden sage',
      'Cold-pressed thyme olive oil',
    ],
    dietaryTags: ['100% Plant-Based', 'Gluten-Free'],
    prepNote: 'Whisked for 45 minutes in copper',
    pairingNote: 'Sample pairing: Light chilled Pinot Noir or smoked fig shrub',
    image: './images/dishes/dish-4-polenta.jpg',
    alt: 'Creamy herb polenta topped with golden roasted wild mushrooms and crispy sage leaves in a stoneware bowl',
    featured: true,
    originTag: 'Course 04 · Foraged',
  },
  {
    id: 'charred-eggplant-harissa',
    name: 'Tomato-Glazed Baby Eggplant',
    category: 'Plant-Based',
    price: 21,
    shortDescription:
      'Caramelized baby eggplant lacquered in smoky tomato-harissa reduction with toasted pine nuts and garden basil.',
    fullDescription:
      'Tender fairy-tale eggplants scored and roasted until custardy inside, basted repeatedly with a slow-simmered tomato, smoked paprika, and rose harissa glaze, then scattered with warm pine nuts.',
    ingredients: [
      'Fairy-tale baby eggplants',
      'Slow-simmered tomato & harissa glaze',
      'Toasted Mediterranean pine nuts',
      'Fresh sweet basil & pomegranate',
    ],
    dietaryTags: ['100% Plant-Based', 'Gluten-Free'],
    prepNote: 'Glazed in small cast-iron skillets',
    pairingNote: 'Sample pairing: Hibiscus-tamarind cooler or medium-bodied Grenache',
    image: './images/dishes/dish-5-eggplant.jpg',
    alt: 'Caramelized glazed baby eggplant halves topped with toasted pine nuts and fresh basil leaves on a matte stoneware plate',
    featured: false,
    originTag: 'Course 05 · Ember Plate',
  },
  {
    id: 'roasted-carrot-terrine',
    name: 'Ember-Roasted Carrot & Pistachio',
    category: 'Plant-Based',
    price: 19,
    shortDescription:
      'Sweet fire-roasted heirloom carrots folded over whipped herb cashew crema with crushed Bronte pistachios.',
    fullDescription:
      'Whole young carrots buried near the hearth coals until deeply caramelized, draped over airy lemon-thyme cashew crema with toasted green pistachios and crisp seeded lavash shards.',
    ingredients: [
      'Ember-roasted heirloom carrots',
      'Whipped lemon-thyme cashew crema',
      'Crushed roasted green pistachios',
      'Crisp sesame lavash crackers',
    ],
    dietaryTags: ['100% Plant-Based', 'Contains Tree Nuts'],
    prepNote: 'Served warm with chilled crema',
    pairingNote: 'Sample pairing: Ginger-pear kombucha or dry sparkling rosé',
    image: './images/dishes/dish-6-carrot.jpg',
    alt: 'Roasted heirloom carrots with crushed green pistachios over whipped herb crema and crisp lavash on an ivory plate',
    featured: false,
    originTag: 'Course 06 · Market Greens',
  },
  {
    id: 'olive-oil-blood-orange',
    name: 'Ligurian Olive Oil & Citrus Cake',
    category: 'Desserts',
    price: 14,
    shortDescription:
      'Tender extra-virgin olive oil sponge steeped in blood orange syrup with whipped vanilla mascarpone.',
    fullDescription:
      'Baked with bright single-estate olive oil and almond flour for a fragrant, delicate crumb, brushed warm with reduced blood orange blossom syrup and plated beside a soft mascarpone quenelle.',
    ingredients: [
      'Single-estate Ligurian olive oil',
      'Blood orange zest & blossom syrup',
      'Toasted Marcona almond flour',
      'Whipped vanilla bean mascarpone',
    ],
    dietaryTags: ['Vegetarian', 'Nut-Forward'],
    prepNote: 'Baked each afternoon in small batches',
    pairingNote: 'Sample pairing: Single-origin espresso or sweet Moscato d’Asti',
    image: './images/dishes/dish-7-cake.jpg',
    alt: 'Golden slice of olive oil citrus cake with a quenelle of vanilla mascarpone and candied orange zest on a handmade ceramic plate',
    featured: true,
    originTag: 'Course 07 · Pastry',
  },
  {
    id: 'roasted-fig-panna-cotta',
    name: 'Black Fig & Sweet Basil Panna Cotta',
    category: 'Desserts',
    price: 15,
    shortDescription:
      'Silky basil-steeped cream set light and trembling, finished with honey-roasted black figs and almond crunch.',
    fullDescription:
      'Fresh cream infused off the flame with bruised sweet basil leaves and Madagascar vanilla bean, paired with halved black mission figs broiled with wildflower honey and toasted almond crumble.',
    ingredients: [
      'Sweet basil-infused heavy cream',
      'Honey-broiled black mission figs',
      'Toasted almond oat crumble',
      'Wildflower blossom honey',
    ],
    dietaryTags: ['Vegetarian', 'Gluten-Free Option'],
    prepNote: 'Steeped overnight for subtle aroma',
    pairingNote: 'Sample pairing: Chamomile blossom infusion or aged Tawny Port',
    image: './images/dishes/dish-8-fig.jpg',
    alt: 'Silky ivory panna cotta topped with caramelized black figs, honey drizzle, and toasted almond crumble on a stoneware plate',
    featured: false,
    originTag: 'Course 08 · Pastry',
  },
]

export const INGREDIENT_STORIES: IngredientStoryItem[] = [
  {
    id: 'heirloom-tomatoes',
    title: 'Dry-Farmed Heirloom Tomatoes',
    region: 'Willamette Ridge Growers · Sample Partner',
    harvestWindow: 'Picked at dawn · July–October',
    summary:
      'Grown without late-season irrigation so every fruit concentrates its natural sugars and bright acidity. We roast half over oak embers and press the rest raw.',
    kitchenUse: 'Forms the bright backbone of our Burrata Larder plate and Tagliolini glaze.',
    tastingNote:
      'Jammy crimson sweetness balanced by bright garden acidity and light white-oak smoke.',
    featuredDishIds: ['burrata-heirloom', 'saffron-tagliolini', 'charred-eggplant-harissa'],
    image: './images/editorial/ingredient-tomatoes.jpg',
    alt: 'Sun-ripened heirloom red and gold tomatoes on green vines resting on a warm ivory linen cloth',
    accent: 'tomato',
  },
  {
    id: 'ligurian-olive-oil',
    title: 'First-Press Olive Oil & Sweet Basil',
    region: 'Small-Lot Coastal Mill · Sample Partner',
    harvestWindow: 'Cold-pressed within 4 hours of picking',
    summary:
      'Peppery green olive oil milled in small stone batches, finished in-house with blanched Genovese basil leaves and flaky sea salt crystals.',
    kitchenUse: 'Drizzled tableside over hearth fish, warm pasta, and even our citrus cake.',
    tastingNote:
      'Crushed green almond, sweet garden basil leaf, and a clean warm-pepper finish.',
    featuredDishIds: ['hearth-sea-bass', 'burrata-heirloom', 'olive-oil-blood-orange'],
    image: './images/editorial/ingredient-olive-oil.jpg',
    alt: 'Golden-green extra-virgin olive oil poured into a small matte stoneware dish next to fresh basil and flaky sea salt',
    accent: 'basil',
  },
  {
    id: 'hand-rolled-craft',
    title: 'Stone-Milled Grain & Daily Dough',
    region: 'SAVOR Pasta Bench · House Craft',
    harvestWindow: 'Rolled fresh twice daily',
    summary:
      'We mill heritage durum wheat each week so the germ oils stay fragrant. Pasta sheets are hand-cut to order for supple bite and sauce-clinging texture.',
    kitchenUse: 'Gives our Saffron Tagliolini its tender snap and rich golden hue.',
    tastingNote:
      'Warm toasted wheat aroma with nutty golden semolina depth and velvety bronze-die texture.',
    featuredDishIds: ['saffron-tagliolini', 'wild-mushroom-polenta'],
    image: './images/editorial/ingredient-craft.jpg',
    alt: 'Chef hands lightly dusting fresh handmade pasta ribbons and basil sprigs on a warm oak prep table',
    accent: 'charcoal',
  },
]

export const CHEF_PROFILE = {
  name: 'Chef Elena Moretti',
  role: 'Culinary Director · Sample Brand Profile',
  quote:
    'A plate only needs three honest voices—warmth from the hearth, brightness from the garden, and enough restraint to let each ingredient breathe.',
  bio: 'Trained in Piedmontese pasta kitchens and coastal wood-fired dining rooms, Elena founded SAVOR as a fictional study in seasonal movement: menus that shift weekly with local harvests rather than chasing spectacle.',
  image: './images/editorial/chef-elena.jpg',
  alt: 'Editorial portrait of Chef Elena Moretti wearing a linen apron while garnishing a plate with fresh basil in a sunlit kitchen',
  principles: [
    { label: '01 · Wood & Time', text: 'Seasoned white oak embers and unhurried morning prep.' },
    { label: '02 · Whole Harvest', text: 'Stems, leaves, and citrus peels folded into oils and broths.' },
    { label: '03 · Warm Table', text: 'Handmade ceramics and attentive hospitality without stiffness.' },
  ],
}

export const SAMPLE_TESTIMONIALS: SampleTestimonial[] = [
  {
    id: 't1',
    quote:
      'The saffron tagliolini felt effortless—silky ribbons, sweet blistered tomatoes, and just enough browned butter to linger without ever feeling heavy.',
    author: 'Maya Lin',
    role: 'Sample Food Writer Note',
    visitNote: 'Demo Tasting Menu · Autumn',
  },
  {
    id: 't2',
    quote:
      'Warm stoneware, sunlight across ivory linen, and an eggplant glaze so balanced you forget the entire course is plant-based.',
    author: 'Julian Vance',
    role: 'Sample Guest Review',
    visitNote: 'Demo Courtyard Seating',
  },
  {
    id: 't3',
    quote:
      'Ending with the basil-infused panna cotta and broiled black figs captured everything SAVOR promises: quiet craft with a spark of wonder.',
    author: 'Claire Okafor',
    role: 'Sample Hospitality Critic',
    visitNote: 'Demo Evening Service',
  },
]

export const VISIT_INFO = {
  notice: 'Sample Showcase Location — Fictional Demo Address & Hours',
  addressLine1: '418 Mercer Courtyard, Suite B',
  addressLine2: 'Portland, OR 97209 (Sample Address)',
  mapUrl:
    'https://www.openstreetmap.org/?mlat=45.5231&mlon=-122.6765#map=15/45.5231/-122.6765',
  mapLabel: 'Open sample coordinates on OpenStreetMap',
  email: 'hello@savor-demo.example',
  phone: '(503) 555-0148 (Demo Line)',
  hours: [
    { days: 'Wednesday – Thursday', time: '5:00 PM – 9:30 PM' },
    { days: 'Friday – Saturday', time: '5:00 PM – 10:30 PM' },
    { days: 'Sunday Hearth Lunch', time: '12:00 PM – 4:00 PM' },
    { days: 'Monday – Tuesday', time: 'Closed for Pantry Prep' },
  ],
}

export const COMPONENT_EVALUATIONS: ComponentEvaluationItem[] = [
  {
    name: 'Squeeze Carousel',
    author: 'Yura Dubinin (Yura Oak)',
    license: 'MIT License (21st.dev community registry)',
    dependencies: 'motion, lucide-react, Tailwind CSS',
    verdict: 'Adapted Concept',
    rationale:
      'Strong editorial fit for Featured Dishes. Because copying full 21st.dev source requires an authenticated account, we built an original SAVOR SqueezeCarousel with Motion spring layout transitions and reduced-motion fallbacks.',
  },
  {
    name: '3D Interactive Card Gallery',
    author: 'Dhileep Kumar GM / Subhan Uddin',
    license: 'MIT License (21st.dev community registry)',
    dependencies: 'motion, lucide-react, Tailwind CSS',
    verdict: 'Adapted Concept',
    rationale:
      'Restrained pointer-driven perspective tilt (±3.5°) enhances tactile dish cards without heavy glassmorphism or particle noise. Built originally in DishCard with touch and reduced-motion guards.',
  },
  {
    name: 'Split Testimonial',
    author: 'Jatin Yadav',
    license: 'MIT License (21st.dev community registry)',
    dependencies: 'motion, lucide-react, Tailwind CSS',
    verdict: 'Adapted Concept',
    rationale:
      'Editorial two-column quote stage adapted in TestimonialsSection with guest selector, prev/next controls, and clear sample demo labeling.',
  },
  {
    name: 'Spinning Circular Text',
    author: 'Chánh Đại',
    license: 'MIT License (21st.dev community registry)',
    dependencies: 'motion, SVG textPath',
    verdict: 'Adapted Concept',
    rationale:
      'Artisan circular stamp seal adapted in CircularSeal for the 3D hero stage, pausing cleanly when prefers-reduced-motion is active.',
  },
  {
    name: 'Image Stream Hero',
    author: 'Ruixen',
    license: 'MIT License (21st.dev community registry)',
    dependencies: 'motion, lucide-react',
    verdict: 'Skipped',
    rationale:
      'Continuous dual-rail image streaming competes with SAVOR’s single central 3D serving plate hero and introduces nonstop peripheral motion.',
  },
  {
    name: 'WaterRippleImage',
    author: 'Rahil Vahora / Kedhareswer Naidu',
    license: 'MIT License (21st.dev community registry)',
    dependencies: 'WebGL / Canvas shader',
    verdict: 'Skipped',
    rationale:
      'Aquatic ripple distortion clashes with warm Mediterranean ceramic art direction and would create redundant WebGL overhead alongside the 3D hero.',
  },
]
