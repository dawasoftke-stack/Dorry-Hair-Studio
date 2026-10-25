import { ServiceItem, GalleryItem, HairCareArticle } from '../types';

export const SALON_INFO = {
  name: 'Dorry Hair Studio',
  tagline: 'Your Hair. Your Crown. Our Expertise.',
  motto: 'Healthy Hair is Beautiful Hair',
  founder: 'Dorcas Misboris',
  location: 'AppleWood Adams, Ngong Road, Nairobi, Kenya',
  addressShort: 'AppleWood Adams, Ngong Rd, Nairobi',
  phonePrimary: '+254 728 173 197',
  phoneDisplay: '0728 173 197',
  email: 'dorryhairstudio@gmail.com',
  whatsappNumber: '254728173197',
  promotionText: 'Special Offer: 15% Off for New Clients — Book Your Luxury Natural Hair Experience',
  hours: {
    weekdays: 'Mon – Fri: 6:00 AM – 10:00 PM',
    weekends: 'Sat – Sun: 8:00 AM – 10:00 PM',
    note: 'Early morning & evening appointments accommodated upon advance booking'
  },
  googleMapsUrl: 'https://maps.google.com/?q=Applewood+Adams+Ngong+Road+Nairobi'
};

export const SERVICES: ServiceItem[] = [
  // Natural Hair Care
  {
    id: 'natural-moisture-wash',
    name: 'Hydrating Wash & Deep Conditioning Ritual',
    category: 'natural-hair',
    categoryLabel: 'Natural Hair Care',
    description: 'A deeply restorative botanical cleanse using sulfate-free formulas that replenish moisture into natural coils and curls without stripping essential natural oils.',
    benefits: [
      'Infuses intense moisture into dry textures',
      'Gentle scalp massage promoting microcirculation',
      'Botanical leave-in conditioning for effortless slip & detangling'
    ],
    image: '/images/service-natural.png',
    priceNote: 'Tailored based on hair length & density',
    durationNote: 'Approx. 60 – 90 mins'
  },
  {
    id: 'curl-coils-definition',
    name: 'Curls & Coils Definition (Twists, Coils & Sets)',
    category: 'natural-hair',
    categoryLabel: 'Natural Hair Care',
    description: 'Precision sectioning and curl definition tailored to your hair pattern, including flat twists, two-strand twists, bantu knots, and finger coils for long-lasting bounce.',
    benefits: [
      'Long-lasting definition without sticky buildup',
      'Minimizes frizz while locking in hydration',
      'Expert advice on daily home maintenance'
    ],
    image: '/images/dalia-natural.png',
    priceNote: 'Quote provided upon consultation',
    durationNote: 'Approx. 90 – 120 mins'
  },
  {
    id: 'silk-press-treatment',
    name: 'Botanical Silk Press & Trim',
    category: 'natural-hair',
    categoryLabel: 'Natural Hair Care',
    description: 'A heat-protective, lightweight silk press that delivers radiant shine and feather-light movement without altering your natural curl pattern.',
    benefits: [
      'Multi-layer thermal defense barrier',
      'Precision dusting or split-end trim',
      'Leaves hair silky, bouncy and full of body'
    ],
    image: '/images/hero1.png',
    priceNote: 'Priced upon length consultation',
    durationNote: 'Approx. 120 mins'
  },

  // Protective Hairstyles
  {
    id: 'knotless-braids',
    name: 'Tension-Free Knotless & Box Braids',
    category: 'protective-styles',
    categoryLabel: 'Protective Hairstyles',
    description: 'Seamlessly installed braids created with delicate attention to scalp comfort, edge preservation, and natural weight distribution.',
    benefits: [
      'Zero scalp pulling or heavy tension at the roots',
      'Clean geometric parting and lightweight feel',
      'Protects natural hair from daily manipulation for weeks'
    ],
    image: '/images/service-protective.png',
    priceNote: 'Custom quote based on size & length',
    durationNote: 'Approx. 3 – 5 hours'
  },
  {
    id: 'sisterlocs-maintenance',
    name: 'Sisterlocs & Loc Artistry / Retightening',
    category: 'protective-styles',
    categoryLabel: 'Protective Hairstyles',
    description: 'Specialized Sisterlocs maintenance, interlocking, and grooming performed by experienced natural locticians with careful pattern precision.',
    benefits: [
      'Uniform interlocking technique preserving grid integrity',
      'Scalp cleansing and clarifying hydration wash',
      'Supports steady, healthy loc maturation'
    ],
    image: '/images/sisterlocs.png',
    priceNote: 'Based on loc count & growth period',
    durationNote: 'Approx. 2.5 – 4 hours'
  },
  {
    id: 'passion-twists-cornrows',
    name: 'Passion Twists & Designer Cornrows',
    category: 'protective-styles',
    categoryLabel: 'Protective Hairstyles',
    description: 'Artistic braided styles, feed-in cornrows, and soft textured twists tailored to complement your facial structure and personal aesthetic.',
    benefits: [
      'Lightweight, effortless everyday styling',
      'Breathable scalp styling ideal for busy lifestyles',
      'Feminine elegance with natural aesthetic texture'
    ],
    image: '/images/wa-style-2.jpeg',
    priceNote: 'Enquire for exact quote',
    durationNote: 'Approx. 2.5 – 3.5 hours'
  },

  // Hair Treatments
  {
    id: 'steam-deep-repair',
    name: 'Intensive Moisture Steam Infusion',
    category: 'hair-treatments',
    categoryLabel: 'Hair Treatments',
    description: 'An advanced salon steam therapy that lifts the hair cuticle gently, driving therapeutic oils and humectants deep into the cortex.',
    benefits: [
      'Reverses chronic dryness and brittle ends',
      'Significantly increases hair elasticity and flexibility',
      'Restores natural softness and radiant shine'
    ],
    image: '/images/service-treatment.png',
    priceNote: 'Available as standalone or service add-on',
    durationNote: 'Approx. 45 – 60 mins'
  },
  {
    id: 'protein-anti-breakage',
    name: 'Protein Reconstruction & Scalp Detox',
    category: 'hair-treatments',
    categoryLabel: 'Hair Treatments',
    description: 'Targeted amino acid strengthening treatment formulated to repair damaged strands, halt excessive shedding, and soothe the scalp.',
    benefits: [
      'Reinforces weak, high-porosity or transitioning hair',
      'Removes product buildup and purifies the scalp',
      'Creates a clean foundation for new healthy growth'
    ],
    image: '/images/hero4.png',
    priceNote: 'Personalized treatment quote',
    durationNote: 'Approx. 60 mins'
  },

  // Beauty & Spa Services
  {
    id: 'facial-skin-refresh',
    name: 'Luxury Facial & Skin Rejuvenation',
    category: 'beauty-services',
    categoryLabel: 'Beauty Services',
    description: 'A soothing facial ritual combining gentle exfoliation, pore cleansing, facial massage, and botanical moisture to revitalize glowing skin.',
    benefits: [
      'Customized to your specific skin needs',
      'Restores natural dewiness and radiant tone',
      'Deeply relaxing sanctuary experience'
    ],
    image: '/images/service-beauty.png',
    priceNote: 'Available upon appointment request',
    durationNote: 'Approx. 60 mins'
  },
  {
    id: 'spa-hand-foot-grooming',
    name: 'Executive Manicure & Pedicure Care',
    category: 'beauty-services',
    categoryLabel: 'Beauty Services',
    description: 'Complete nail shaping, cuticle nourishment, exfoliating scrub, and polish finishing for polished, beautifully manicured hands and feet.',
    benefits: [
      'Hygienic, meticulous nail care standards',
      'Hydrating paraffin or scrub treatments',
      'Long-wearing polish or clean buff finish'
    ],
    image: '/images/style-8.png',
    priceNote: 'Enquire during booking',
    durationNote: 'Approx. 45 – 75 mins'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Sisterlocs Perfection & Precision',
    category: 'locs',
    categoryLabel: 'Sisterlocs & Locs',
    image: '/images/sisterlocs.png',
    aspect: 'wide',
    caption: 'Clean, uniform interlocking and immaculate loc health at Dorry Hair Studio.'
  },
  {
    id: 'gal-2',
    title: 'Signature Natural Curls & Volume',
    category: 'natural',
    categoryLabel: 'Natural Hair Care',
    image: '/images/hero1.png',
    aspect: 'wide',
    caption: 'Celebrating full, moisturized African hair with healthy natural bounce.'
  },
  {
    id: 'gal-3',
    title: 'Editorial Protective Braids',
    category: 'braids',
    categoryLabel: 'Protective Hairstyles',
    image: '/images/wa-style-1.jpeg',
    aspect: 'tall',
    caption: 'Tension-free protective styling that keeps hair nourished for weeks.'
  },
  {
    id: 'gal-4',
    title: 'Intricate Twists Artistry',
    category: 'braids',
    categoryLabel: 'Protective Hairstyles',
    image: '/images/wa-style-2.jpeg',
    aspect: 'tall',
    caption: 'Beautifully finished twists showing delicate styling and polished finish.'
  },
  {
    id: 'gal-5',
    title: 'Natural Texture Elegance',
    category: 'natural',
    categoryLabel: 'Natural Hair Care',
    image: '/images/style-6.png',
    aspect: 'tall',
    caption: 'Soft, nourished natural hair styling celebrating authenticity.'
  },
  {
    id: 'gal-6',
    title: 'Boutique Protective Finish',
    category: 'braids',
    categoryLabel: 'Protective Hairstyles',
    image: '/images/style-7.png',
    aspect: 'tall',
    caption: 'Protective hairstyles crafted with comfort and elegance.'
  },
  {
    id: 'gal-7',
    title: 'Hydrated & Defined Coils',
    category: 'natural',
    categoryLabel: 'Natural Hair Care',
    image: '/images/dalia-natural.png',
    aspect: 'wide',
    caption: 'Intense moisture therapy revealing defined, healthy curls.'
  },
  {
    id: 'gal-8',
    title: 'Editorial Studio Portrait',
    category: 'editorial',
    categoryLabel: 'Studio Editorial',
    image: '/images/hero5.png',
    aspect: 'wide',
    caption: 'Quiet luxury and understated African beauty at Dorry Hair Studio.'
  },
  {
    id: 'gal-9',
    title: 'Nourished Salon Finish',
    category: 'treatment',
    categoryLabel: 'Hair Treatments',
    image: '/images/wa-style-3.jpeg',
    aspect: 'tall',
    caption: 'Client transformation showcasing restored shine and healthy edges.'
  },
  {
    id: 'gal-10',
    title: 'Salon Artistry Transformation',
    category: 'braids',
    categoryLabel: 'Protective Hairstyles',
    image: '/images/wa-style-4.jpeg',
    aspect: 'tall',
    caption: 'Long-lasting protective styling with seamless root blending.'
  },
  {
    id: 'gal-11',
    title: 'Lustrous Botanical Therapy',
    category: 'treatment',
    categoryLabel: 'Hair Treatments',
    image: '/images/hero4.png',
    aspect: 'wide',
    caption: 'Deep moisture and protein infusion restoring vitality.'
  },
  {
    id: 'gal-12',
    title: 'The Dorry Luxury Experience',
    category: 'editorial',
    categoryLabel: 'Studio Editorial',
    image: '/images/dorry-style-2.png',
    aspect: 'tall',
    caption: 'Personalized care in a serene, private salon environment.'
  }
];

export const HAIR_CARE_ARTICLES: HairCareArticle[] = [
  {
    id: 'moisture-retention-blueprint',
    title: 'The Moisture Retention Blueprint for Natural African Hair',
    subtitle: 'How to lock in deep hydration and eliminate chronic dryness',
    category: 'Moisture & Hydration',
    readTime: '4 min read',
    summary: 'African hair textures are naturally coiled and require deliberate layering of moisture and sealing emollients. Discover the authentic salon routine for keeping coils soft and flexible.',
    content: [
      {
        heading: 'Understanding Why Natural Hair Loses Moisture',
        paragraphs: [
          'Because sebum travels slowly along spiral curl patterns, natural African hair requires intentional topical hydration. Water is the only true moisturizer — creams, butters, and oils serve as protective sealants.',
          'At Dorry Hair Studio, we teach clients that brittle hair is usually dehydrated hair that lacks water rather than heavy grease.'
        ],
        tips: [
          'Always apply your leave-in conditioner while hair is damp, never bone dry.',
          'Adopt the L.O.C (Liquid, Oil, Cream) or L.C.O method based on your hair porosity.',
          'Schedule regular deep steaming sessions to open the cuticle safely.'
        ]
      },
      {
        heading: 'The Steaming Ritual Advantage',
        paragraphs: [
          'Steaming introduces moist warm vapor that gently lifts hair cuticles, allowing therapeutic conditioners to penetrate into the hair shaft rather than sitting on the surface.',
          'Clients who incorporate monthly steam hydration consistently experience up to 70% less single-strand knotting and breakage.'
        ]
      }
    ]
  },
  {
    id: 'protective-styling-health',
    title: 'Preserving Hair Health Beneath Protective Styles',
    subtitle: 'How to wear braids, locs, and twists without sacrificing your edges',
    category: 'Protective Styling',
    readTime: '5 min read',
    summary: 'Protective styles should protect your hair, not damage it. Learn how to maintain your scalp, hydrate your roots, and ensure your edges remain strong throughout the styling period.',
    content: [
      {
        heading: 'The Golden Rule: Zero Excessive Tension',
        paragraphs: [
          'A protective style should never cause headaches, bumps, or pulling sensation on your scalp. High tension damages hair follicles and can trigger traction alopecia.',
          'At Dorry Hair Studio, our stylists specialize in lightweight parting and tension-free attachment, prioritizing root preservation over tight tension.'
        ],
        tips: [
          'Spritz your braids with rosewater or lightweight aloe mist 2-3 times weekly.',
          'Never leave braids or twists installed beyond 6 to 8 weeks.',
          'Allow a 2-week rest and deep conditioning period between installations.'
        ]
      },
      {
        heading: 'Nighttime Rituals That Count',
        paragraphs: [
          'Cotton pillowcases absorb moisture from hair strands like a sponge and cause microscopic friction. A pure satin or mulberry silk bonnet or pillowcase preserves your hairstyle while locking in essential oils.'
        ]
      }
    ]
  },
  {
    id: 'scalp-care-foundations',
    title: 'Healthy Scalp, Thriving Hair: The Root Connection',
    subtitle: 'Detoxifying your scalp for optimal natural hair growth in Nairobi',
    category: 'Scalp Health',
    readTime: '3 min read',
    summary: 'Healthy hair growth begins at the follicle level. Unclogging pores, eliminating product buildup, and stimulating circulation are foundational to natural hair health.',
    content: [
      {
        heading: 'Combatting City Dust and Product Buildup',
        paragraphs: [
          'Daily life in Nairobi exposes hair to dust, hard water minerals, and styling gels that accumulate around hair follicles, stifling natural oxygen exchange.',
          'A gentle clarifying cleanse once a month resets your scalp environment without stripping the natural sebum barrier.'
        ],
        tips: [
          'Massage your scalp using your fingertips (never nails) for 4 minutes daily.',
          'Choose botanical scalp oils like jojoba and tea tree instead of heavy mineral oils.',
          'Book a professional scalp detox at the salon if you experience flakiness or irritation.'
        ]
      }
    ]
  }
];
