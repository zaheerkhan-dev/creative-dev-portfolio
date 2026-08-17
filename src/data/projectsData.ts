export interface ProjectImage {
  url: string;
  pageName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  img: string;
  projectImages: ProjectImage[];
  url: string;
  client: string;
  year: string;
  role: string;
  techStack: string[];
  description: string;
  whatIDid: string;
  howIBuiltThis: string;
  keyTakeaway: string;
  tagline: [string, string];
}

export const projectsData: ProjectItem[] = [
  {
    id: "staurga",
    title: "Staurga",
    img: "/Images/Projects/Project_1_Staurga/Staurga.mp4",
    projectImages: [
      { url: "/Images/Projects/Project_1_Staurga/Staurga-1.png", pageName: "Hero & Strategic Positioning" },
      { url: "/Images/Projects/Project_1_Staurga/Staurga-2.png", pageName: "The Executive Problem Breakdown" },
      { url: "/Images/Projects/Project_1_Staurga/Staurga-3.png", pageName: "Services & Done-For-You Offerings" },
      { url: "/Images/Projects/Project_1_Staurga/Staurga-4.png", pageName: "Brand Story & Methodology" },
      { url: "/Images/Projects/Project_1_Staurga/Staurga-5.png", pageName: "Founder Growth Case Studies" },
      { url: "/Images/Projects/Project_1_Staurga/Staurga-6.png", pageName: "Client Social Proof & Testimonials" },
      { url: "/Images/Projects/Project_1_Staurga/Staurga-7.png", pageName: "Interactive FAQ System" },
      { url: "/Images/Projects/Project_1_Staurga/Staurga-8.png", pageName: "High-Conversion Booking Portal" },
      { url: "/Images/Projects/Project_1_Staurga/Staurga-9.png", pageName: "Careers & Hiring Application Portal" },
      { url: "/Images/Projects/Project_1_Staurga/Staurga-10.png", pageName: "Editorial Blog & Thought Leadership Hub" },
    ],
    url: "https://staurga.com/",
    client: "Shahida Zia (Staurga)",
    year: "2026",
    role: "Full-Stack Development & Conversion Architecture",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Cloudflare Serverless",
    ],
    description:
      "A full-suite B2B agency platform engineered for Staurga, a premier LinkedIn ghostwriting firm. Built with an authoritative marketing frontend, a dedicated **Admin Panel** for content management, automated **Lead Magnet** pipelines, and a streamlined **Hiring Application Portal**.",
    whatIDid:
      "I designed and engineered the complete ecosystem from the ground up: an executive marketing frontend, a custom zero-code content management system, an SEO-optimized MDX blog engine, seamless Calendly booking flows, and an interactive recruitment portal for scaling the ghostwriting team.",
    howIBuiltThis:
      "Built with Next.js App Router, React, TypeScript, and Tailwind CSS. The platform features buttery smooth Framer Motion micro-interactions, Lenis smooth scrolling, an MDX content layer for high-ranking authority articles, and custom form automation, all deployed on a zero-maintenance Cloudflare Serverless architecture ($0/mo hosting cost) with structured JSON-LD schema for peak search visibility.",
    keyTakeaway:
      "A high-performing agency platform isn't just a portfolio — it's a scalable business operating system. By unifying client acquisition, editorial authority, lead magnet automation, and talent recruiting into one seamless stack, Staurga is positioned to scale rapidly with zero overhead.",
    tagline: [
      "A full-suite executive branding platform engineered for Staurga.",
      "Unifying client acquisition, editorial authority, and automated hiring pipelines.",
    ],
  },
  {
    id: "linkryse",
    title: "Linkryse",
    img: "/Images/Projects/Project_2_Linkryse/Linkryse.mp4",
    projectImages: [
      { url: "/Images/Projects/Project_2_Linkryse/Linkryse-1.png", pageName: "Landing Page & Hero Positioning" },
      { url: "/Images/Projects/Project_2_Linkryse/Linkryse-2.png", pageName: "Analytics Dashboard & Click Velocity" },
      { url: "/Images/Projects/Project_2_Linkryse/Linkryse-3.png", pageName: "Link Creation & Parameter Modals" },
      { url: "/Images/Projects/Project_2_Linkryse/Linkryse-4.png", pageName: "Custom Domain & Edge DNS Routing" },
      { url: "/Images/Projects/Project_2_Linkryse/Linkryse-5.png", pageName: "Geo-Attribution & City-Level Heatmaps" },
      { url: "/Images/Projects/Project_2_Linkryse/Linkryse-6.png", pageName: "Referrer & Device Telemetry Tracking" },
      { url: "/Images/Projects/Project_2_Linkryse/Linkryse-7.png", pageName: "UTM Campaign Builder & Tag Management" },
      { url: "/Images/Projects/Project_2_Linkryse/Linkryse-8.png", pageName: "Dynamic QR Code Customization Engine" },
      { url: "/Images/Projects/Project_2_Linkryse/Linkryse-9.png", pageName: "Multi-Tenant Workspaces & Member RBAC" },
      { url: "/Images/Projects/Project_2_Linkryse/Linkryse-10.png", pageName: "Security, 2FA & Session Controls" },
      { url: "/Images/Projects/Project_2_Linkryse/Linkryse-11.png", pageName: "API Keys & Developer Webhook Gateway" },
    ],
    url: "https://linkryse.com/",
    client: "Linkryse (Self-Built SaaS)",
    year: "2026",
    role: "Founder & Full-Stack Systems Architect",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Hono API",
      "Cloudflare Workers",
      "Cloudflare D1",
      "Drizzle ORM",
    ],
    description:
      "A production-grade, edge-native link management, marketing analytics, and conversion attribution SaaS platform. Engineered from scratch with a **Sub-15ms Edge Redirect Engine**, deep **Real-Time Analytics & Attribution**, and a **Multi-Tenant Workspace Architecture** on 100% serverless Cloudflare infrastructure.",
    whatIDid:
      "I architected and built the entire SaaS ecosystem from the ground up: the high-throughput edge redirect engine on Cloudflare Workers, 76+ RESTful API endpoints using Hono and Drizzle ORM, real-time analytics data visualizations with Visx, multi-tenant workspace access controls, and custom domain routing.",
    howIBuiltThis:
      "Built on a modern full-stack edge architecture: Next.js and TypeScript on the frontend paired with Hono on Cloudflare Workers. Utilizes Cloudflare D1 for distributed SQL data, Cloudflare KV for ultra-fast link caching, and Cloudflare R2 for asset storage, achieving enterprise-grade performance with $0/month baseline infrastructure costs.",
    keyTakeaway:
      "Building a high-throughput SaaS platform from scratch taught me how to design for true edge performance. Replacing heavy monolithic backends with lightweight Cloudflare Workers and KV caching delivers global speed and eliminates cloud hosting overhead.",
    tagline: [
      "Production-grade edge link infrastructure & marketing analytics.",
      "Delivering sub-15ms global redirects and deep conversion attribution.",
    ],
  },
  {
    id: "patreon",
    title: "Patreon",
    img: "/Images/Projects/Project_3_Patreon/Patreon.mp4",
    projectImages: [
      { url: "/Images/Projects/Project_3_Patreon/Patreon-1.jpg", pageName: "Hero Video Showcase & Creator Spotlight" },
      { url: "/Images/Projects/Project_3_Patreon/Patreon-2.jpg", pageName: "Interactive Creator Carousel" },
      { url: "/Images/Projects/Project_3_Patreon/Patreon-3.jpg", pageName: "Direct-to-Fan Monetization & Membership" },
      { url: "/Images/Projects/Project_3_Patreon/Patreon-4.png", pageName: "Community Audio & Video Player Hub" },
      { url: "/Images/Projects/Project_3_Patreon/Patreon-5.jpg", pageName: "Exclusive Creator Commerce & Digital Products" },
      { url: "/Images/Projects/Project_3_Patreon/Patreon-6.jpg", pageName: "Creator Business Growth & Analytics" },
      { url: "/Images/Projects/Project_3_Patreon/Patreon-7.jpg", pageName: "Mobile App Ecosystem & Push Notifications" },
      { url: "/Images/Projects/Project_3_Patreon/Patreon-8.jpg", pageName: "Join The Creator Revolution CTA" },
    ],
    url: "https://www.patreon.com/",
    client: "Patreon (Platform Reconstruction)",
    year: "2026",
    role: "Creative Development & Interaction Engineering",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "GSAP 3",
      "ScrollTrigger",
      "OGL Shaders",
      "Lenis",
    ],
    description:
      "A pixel-perfect creative engineering reconstruction of the Patreon creator platform. Built to showcase high-performance **GSAP ScrollTrigger Choreography**, interactive **OGL WebGL Shaders**, and buttery smooth **Lenis Physics**.",
    whatIDid:
      "I engineered the complete frontend interaction layer from scratch: choreographing complex GSAP ScrollTrigger timelines, implementing custom OGL WebGL shader grain effects, building responsive creator media carousels, and optimizing 60fps animation performance across all viewports.",
    howIBuiltThis:
      "Built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4. Leveraged GSAP 3 with ScrollTrigger for physics-accurate scroll choreography, OGL for lightweight GPU shader rendering, and Lenis for unified smooth scrolling across modern desktop and mobile browsers.",
    keyTakeaway:
      "Building high-production creative agency platforms requires bridging art and engineering. By utilizing lightweight WebGL shaders and GPU-accelerated transforms, you can deliver breathtaking visual choreography while maintaining <2.5s LCP and flawless 60fps frame rates.",
    tagline: [
      "Pixel-perfect creative engineering reconstruction of Patreon.",
      "Mastering GSAP ScrollTrigger choreography & WebGL shader pipelines.",
    ],
  },
  {
    id: "orunk",
    title: "Orunk",
    img: "/Images/Projects/Project_4_Orunk/Orunk.mp4",
    projectImages: [
      { url: "/Images/Projects/Project_4_Orunk/Orunk-1.png", pageName: "Hero & Interactive PixelCanvas" },
      { url: "/Images/Projects/Project_4_Orunk/Orunk-2.png", pageName: "Architecture & SaaS Starters Overview" },
      { url: "/Images/Projects/Project_4_Orunk/Orunk-3.png", pageName: "Component Demos & Live Registry" },
    ],
    url: "https://orunk.com",
    client: "Orunk (In Progress)",
    year: "2026",
    role: "Founder & Full-Stack Systems Architect",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "Turborepo",
      "Hono",
      "Cloudflare Workers",
      "Drizzle ORM",
    ],
    description:
      "I kept rebuilding the same things — **auth flows**, **payment integrations**, **UI component libraries** — on every new project. So I started extracting all of it into one system. Orunk is a Turborepo monorepo with production starters, a reusable component registry, and a license-gated CLI. Currently in heavy development and already powering my own client work.",
    whatIDid:
      "I built the full ecosystem: a Hono-based license server on Cloudflare Workers with Drizzle ORM, machine-hashed activation keys, Stripe checkout with webhook fulfillment, Google OAuth with sliding-window JWT sessions, a browsable UI component registry, and the interactive PixelCanvas engine on the homepage.",
    howIBuiltThis:
      "Turborepo monorepo with two apps (Next.js 16 frontend, Hono Workers backend) and shared packages. The backend handles auth, licensing, checkout, template delivery, and a component registry API. The frontend uses Tailwind CSS v4, Framer Motion, and a custom 2D Canvas pixel physics engine with cursor repulsion and traveling shimmer waves.",
    keyTakeaway:
      "Every repeated pattern from client work gets extracted into Orunk. Auth, billing, UI — write it once, use it everywhere. The hardest part is not the code, it is designing the abstraction boundaries so each starter stays flexible enough for real projects.",
    tagline: [
      "A SaaS starter ecosystem born from my own repeated frustrations.",
      "In heavy development — already powering real client projects.",
    ],
  },
  {
    id: "yappedin",
    title: "YappedIn",
    img: "/Images/Projects/Project_5_YappedIn/YappedIn.mp4",
    projectImages: [
      { url: "/Images/Projects/Project_5_YappedIn/YappedIn-1.png", pageName: "LinkedIn Chat Injection" },
      { url: "/Images/Projects/Project_5_YappedIn/YappedIn-2.png", pageName: "Voice Recording Studio" },
      { url: "/Images/Projects/Project_5_YappedIn/YappedIn-3.png", pageName: "Waveform Playback & Preview" },
      { url: "/Images/Projects/Project_5_YappedIn/YappedIn-4.png", pageName: "Settings & Audio Config" },
    ],
    url: "https://yappedin.com",
    client: "YappedIn (Self-Built Product)",
    year: "2026",
    role: "Extension Architecture, Audio Pipeline & Reverse Engineering",
    techStack: [
      "Chrome MV3",
      "WXT Framework",
      "TypeScript",
      "React 19",
      "Web Audio API",
      "mp4box.js",
      "Zustand",
    ],
    description:
      "LinkedIn has had voice notes on mobile for years but never built it for desktop. I wanted to learn how browser extensions work, but not by building something basic — so I reverse-engineered LinkedIn's mobile endpoints and built a Chrome Extension that injects a **native voice recording studio** directly into LinkedIn's chat UI, including **Shadow DOM chat drawers**.",
    whatIDid:
      "I engineered the complete extension architecture from scratch: a content script injection engine that pierces LinkedIn's Shadow DOM overlays, an in-browser M4A/AAC audio encoding pipeline using mp4box.js (because LinkedIn's player rejects WebM), reverse-engineered iOS spoofing headers to authenticate against LinkedIn's mobile APIs, and an MV3-compliant offscreen document architecture for continuous microphone capture.",
    howIBuiltThis:
      "Built with the WXT framework on Chrome Manifest V3. The audio pipeline captures PCM via Web Audio API, encodes to AAC, muxes into a valid M4A container client-side using mp4box.js, then uploads directly to LinkedIn's CDN using the user's existing session cookies. Zero backend server — the extension is 100% client-side by design, so user credentials never leave their browser.",
    keyTakeaway:
      "My first browser extension. I picked this project specifically because I wanted to learn extension development by solving a real problem I had. The hardest part was the audio encoding — browsers record WebM natively, but LinkedIn's voice player only accepts M4A. Building a client-side muxer to bridge that gap taught me more about audio containers than any tutorial could.",
    tagline: [
      "Voice notes for LinkedIn Desktop — because they never built it.",
      "My first extension, built to solve a real problem I had.",
    ],
  },
];
