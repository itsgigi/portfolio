import type { Projects } from "../utils/types";

export const webProjects: Projects[] = [
  {
    name: "Alessia's Flat",
    description: "House rental platform built with Next.js and Hygraph.",
    url: "https://alessias-flat.vercel.app",
    icons: [{name: 'Next.js', url:'/nextjsLogo.png'}, {name: 'Hygraph', url:'hygraphLogo.png'}, {name: 'Maps API', url:'mapsLogo.png'}, {name: 'Zustand', url:'zustandLogo.svg'}, {name: 'EmailJS', url:'emailjsLogo.png'}],
    bullets: [
      "Headless CMS with Hygraph for property listings — editors update content without touching code",
      "Google Maps API integration for location display and nearby POI",
      "Zustand for lightweight global state (filters, booking flow) without Redux overhead",
      "EmailJS for serverless contact form — no backend needed for MVP",
    ]
  },
  {
    name: "DaysOf landing",
    description: "Landing page for days and nights of milan.",
    url: "https://days-of-chi.vercel.app/days",
    icons: [{name: 'React.js', url:'/reactLogo.png'}, {name: 'Hygraph', url:'hygraphLogo.png'}],
    bullets: [
      "Hygraph CMS drives all event content — new events published without deploys",
      "React with dynamic routing per event category (days vs nights)",
      "Responsive layout optimized for mobile-first discovery experience",
    ]
  },
  {
    name: "Alessandro Scafati's Portfolio",
    description: "A profesional portfolio.",
    url: "https://www.alessandroscafati.it/",
    icons: [{name: 'React.js', url:'/reactLogo.png'}, {name: 'Motion', url:'framerLogo.png'}, {name: 'Hygraph', url:'hygraphLogo.png'}],
    bullets: [
      "Simple and elegant design focused on showcasing the actor's showreel and credits",
      "Events section with dynamic filtering by role type (theater, film, tv) and date automatically parsed from Hygraph CMS",
      "Gallery section with masonry layout and lightbox for high-res images from photoshoots and performances",
    ]
  },
  {
    name: "AI Chat Assistant",
    description: "An AI-powered chat assistant trained on my info.",
    url: "https://portfolio-two-flax-84.vercel.app/#contacts",
    icons: [{name: 'React.js', url:'/reactLogo.png'}, {name: 'OpenAI API', url:'/openaiLogo.png'}],
    bullets: [
      "OpenAI API integration for context-aware conversational responses",
      "Trained on personal info to answer questions about my work and experience",
      "Real-time streaming responses for natural conversation flow",
    ],
    isTryable: true,
  },
]

export const showcaseProjects: Projects[] = [
  {
    name: "Viewsource",
    description: "Recreations of Awwwards-winning sites, broken down by AI.",
    url: "https://viewsource-tawny.vercel.app/",
    icons: [{name: 'Next.js', url:'/nextjsLogo.png'}, {name: 'ChatGPT', url:'/openaiLogo.png'}],
    bullets: [
      "A growing collection of Awwwards-winning sites I am rebuilding from scratch, published for anyone to study and to use.",
      "Each recreation is fed to an AI that reverse-engineers it into standalone components and the prompts that can be used to recreate them.",
      "Goal: make top-tier web design techniques accessible — instead of just admiring award-winning sites, developers can grab the pieces and prompts behind them.",
    ]
  },
  {
    name: "Mustang Fastback",
    description: "Scroll-driven tribute showcase of the 1968 Ford Mustang Fastback.",
    url: "https://ford-showcase.vercel.app",
    icons: [{name: 'React.js', url:'/reactLogo.png'}, {name: 'Three.js', url:'/threejsLogo.png'}, {name: 'GSAP', url:'gsapLogo.svg'}],
    bullets: [
      "Cinematic scroll showcase built around the 1968 Ford Mustang Fastback, celebrating the icon with full-bleed photography and cinematic pacing.",
      "Full 3D car model and environment built with React Three Fiber, explorable alongside the scroll-driven story.",
      "React with GSAP ScrollTrigger driving section-by-section reveals — a scroll-first, mobile-friendly presentation.",
      "A love letter to a classic muscle car, built to let its lines and history do the talking.",
    ]
  },
  {
    name: "Rado Anatom",
    description: "Vibecoded interactive showcase of Rado's Anatom skeleton.",
    url: "https://rado-anatom-skeleton.vercel.app/",
    icons: [{name: 'React.js', url:'/reactLogo.png'}, {name: 'GSAP', url:'gsapLogo.svg'}, {name: 'ChatGPT', url:'/openaiLogo.png'}, {name: 'Higgsfield', url:'/higgsfieldLogo.png'}],
    bullets: [
      "An interactive scroll-driven showcase of Rado's Anatom skeleton, built in React with GSAP ScrollTrigger. Each section of the page unfolds as the user scrolls, revealing the product in a cinematic, brand-aligned experience.",
      "The entire asset pipeline was AI-powered: visuals generated and refined with Higgsfield AI, copy and ideation handled via ChatGPT, and the codebase built iteratively with Claude Code. What would have taken months a few years ago came together in days.",
      "Vibecoding isn't just pressing enter — it took days of brand research, structure planning, design iterations and hundreds of prompt cycles. The AI does the heavy lifting, but the direction, taste and decisions are still yours.",
      "The biggest takeaway: AI lowers the barrier to entry dramatically, but production readiness — performance, asset optimization, lazy loading, accessibility — still demands real frontend knowledge. The gap between a vibecoded prototype and a shippable product is where that knowledge lives.",
    ]
  },
  {
    name: "Roma Palmares",
    description: "Interactive scroll showcase of 2022 Conference League win.",
    url: "https://roma-palmares.vercel.app",
    icons: [{name: 'React.js', url:'/reactLogo.png'}, {name: 'GSAP', url:'gsapLogo.svg'}],
    bullets: [
      "Scroll-driven timeline retracing AS Roma's albo d'oro (roll of honor), culminating in the 2022 UEFA Conference League triumph.",
      "Built with React and GSAP ScrollTrigger for cinematic section-by-section reveals as the fan scrolls through the club's history.",
      "A fan project exploring how storytelling and motion design can turn a stats page into an emotional, matchday-style experience.",
    ]
  },
]
