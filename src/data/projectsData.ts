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
      { url: "/Images/Projects/Project_2_Linkryse/Mycelius_1.png", pageName: "Dashboard Overview" },
      { url: "/Images/Projects/Project_2_Linkryse/Mycelius_2.png", pageName: "Link Management & Shortening" },
      { url: "/Images/Projects/Project_2_Linkryse/Mycelius_3.png", pageName: "Real-Time Geo & Device Analytics" },
      { url: "/Images/Projects/Project_2_Linkryse/Mycelius_4.png", pageName: "UTM Campaign Builder" },
      { url: "/Images/Projects/Project_2_Linkryse/Mycelius_5.png", pageName: "Dynamic QR Code Generator" },
      { url: "/Images/Projects/Project_2_Linkryse/Mycelius_6.png", pageName: "Multi-Tenant Workspaces & RBAC" },
      { url: "/Images/Projects/Project_2_Linkryse/Mycelius_7.png", pageName: "Custom Domain Routing" },
      { url: "/Images/Projects/Project_2_Linkryse/Mycelius_8.png", pageName: "Conversion Attribution Tracking" },
      { url: "/Images/Projects/Project_2_Linkryse/Mycelius_9.png", pageName: "Security, 2FA & Auth Controls" },
      { url: "/Images/Projects/Project_2_Linkryse/Mycelius_10.png", pageName: "API Key Management" },
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
      "A production-grade, edge-native link management, marketing analytics, and conversion attribution SaaS platform. Engineered from scratch to deliver sub-15ms global redirects, deep UTM analytics, custom domains, and automated lead funnels on 100% serverless edge infrastructure.",
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
    id: "orbit-matter",
    title: "Orbit Matter",
    img: "/Images/Projects/Project_5_Orbit_Matter/Orbit_Matter.mp4",
    projectImages: [
      { url: "/Images/Projects/Project_5_Orbit_Matter/orbit-matter-1.png", pageName: "Index Page" },
      { url: "/Images/Projects/Project_5_Orbit_Matter/orbit-matter-2.png", pageName: "Observatory Page" },
      { url: "/Images/Projects/Project_5_Orbit_Matter/orbit-matter-3.png", pageName: "Orbital Dynamics" },
      { url: "/Images/Projects/Project_5_Orbit_Matter/orbit-matter-4.png", pageName: "Gravitational Mapping" },
      { url: "/Images/Projects/Project_5_Orbit_Matter/orbit-matter-5.png", pageName: "Planetary Telemetry" },
      { url: "/Images/Projects/Project_5_Orbit_Matter/orbit-matter-6.png", pageName: "Cosmic Signals" },
      { url: "/Images/Projects/Project_5_Orbit_Matter/orbit-matter-7.png", pageName: "Deep Space Logs" },
      { url: "/Images/Projects/Project_5_Orbit_Matter/orbit-matter-8.png", pageName: "Astrochemistry" },
      { url: "/Images/Projects/Project_5_Orbit_Matter/orbit-matter-9.png", pageName: "Atmospheric Data" },
      { url: "/Images/Projects/Project_5_Orbit_Matter/orbit-matter-10.png", pageName: "Solar Activity" },
      { url: "/Images/Projects/Project_5_Orbit_Matter/orbit-matter-11.png", pageName: "Interstellar Medium" },
      { url: "/Images/Projects/Project_5_Orbit_Matter/orbit-matter-12.png", pageName: "Terminal Access" },
    ],
    url: "https://orbitmatter.space",
    client: "Autonomous Research Experiment",
    year: "2024",
    role: "Creative Coding & Front-End Architecture",
    techStack: ["WebGL", "Three.js", "GLSL Shaders", "GSAP", "TypeScript"],
    description:
      "An experimental digital observatory interface exploring deep space telemetry, gravitational mechanics, and planetary mapping through interactive creative coding.",
    whatIDid:
      "Architected the interactive 3D particle simulations, orbital path mathematics, and custom post-processing shaders to replicate high-altitude scientific instruments in the browser.",
    howIBuiltThis:
      "Crafted using custom WebGL shaders, Three.js point clouds, and GSAP timeline sequencing for cinematic transitions and zero frame-drop responsiveness.",
    keyTakeaway:
      "Pushed GPU compute bounds in browser environments and mastered advanced particle system optimization and multi-pass GLSL rendering pipelines.",
    tagline: [
      "Front-end interface simulating a futuristic space observatory.",
      "Driven by advanced creative coding & narrative experimental design.",
    ],
  },
  {
    id: "design-hive",
    title: "Design Hive",
    img: "/Images/Projects/Project_4_Design_Hive/Design_Hive.mp4",
    projectImages: [
      { url: "/Images/Projects/Project_4_Design_Hive/design-hive-1.png", pageName: "Community Landing" },
      { url: "/Images/Projects/Project_4_Design_Hive/design-hive-2.png", pageName: "Design Challenges" },
      { url: "/Images/Projects/Project_4_Design_Hive/design-hive-3.png", pageName: "Creative Hub" },
      { url: "/Images/Projects/Project_4_Design_Hive/design-hive-4.png", pageName: "Resource Library" },
      { url: "/Images/Projects/Project_4_Design_Hive/design-hive-5.png", pageName: "Mentorship Grid" },
      { url: "/Images/Projects/Project_4_Design_Hive/design-hive-6.png", pageName: "Event Schedule" },
      { url: "/Images/Projects/Project_4_Design_Hive/design-hive-7.png", pageName: "Showcase Wall" },
      { url: "/Images/Projects/Project_4_Design_Hive/design-hive-8.png", pageName: "Design System" },
      { url: "/Images/Projects/Project_4_Design_Hive/design-hive-9.png", pageName: "Member Stories" },
      { url: "/Images/Projects/Project_4_Design_Hive/design-hive-10.png", pageName: "Job Board" },
      { url: "/Images/Projects/Project_4_Design_Hive/design-hive-11.png", pageName: "Workshop Portal" },
      { url: "/Images/Projects/Project_4_Design_Hive/design-hive-12.png", pageName: "Join The Hive" },
    ],
    url: "https://designhive.io",
    client: "Design Hive Collective",
    year: "2024",
    role: "Full-Stack Development & Interaction Design",
    techStack: ["Next.js", "Tailwind CSS", "GSAP ScrollTrigger", "Framer Motion"],
    description:
      "A community and resource platform built for contemporary digital designers, showcasing workshops, design challenges, and mentorship connections in a high-energy layout.",
    whatIDid:
      "Engineered micro-interactions, responsive typography hierarchies, dark theme palettes, and seamless page transitions across all community features.",
    howIBuiltThis:
      "Built with Next.js 14 and Tailwind CSS with custom GSAP scroll-pinned sections and dynamic letter stagger animations.",
    keyTakeaway:
      "Delivered a design system that balances expressive visual identity with clear readability and effortless navigation.",
    tagline: [
      "A dynamic ecosystem for modern designers and creative teams.",
      "Connecting talent with real-world opportunities and tools.",
    ],
  },
  {
    id: "matchitt",
    title: "Matchitt",
    img: "/Images/Projects/Project_3_Matchitt/Matchitt.mp4",
    projectImages: [
      { url: "/Images/Projects/Project_3_Matchitt/Matchitt_1.png", pageName: "Home Page" },
      { url: "/Images/Projects/Project_3_Matchitt/Matchitt_2.png", pageName: "The Matchitt Way" },
      { url: "/Images/Projects/Project_3_Matchitt/Matchitt_3.png", pageName: "Who We Are" },
      { url: "/Images/Projects/Project_3_Matchitt/Matchitt_4.png", pageName: "What We Do" },
      { url: "/Images/Projects/Project_3_Matchitt/Matchitt_5.png", pageName: "Who We Work With" },
      { url: "/Images/Projects/Project_3_Matchitt/Matchitt_6.png", pageName: "About Us" },
      { url: "/Images/Projects/Project_3_Matchitt/Matchitt_7.png", pageName: "Brand Strategy" },
      { url: "/Images/Projects/Project_3_Matchitt/Matchitt_8.png", pageName: "Get In Touch" },
    ],
    url: "https://matchitt.com",
    client: "The Matchitt Agency",
    year: "2025",
    role: "Full-Stack Development & Brand Platform",
    techStack: ["Next.js", "Three.js", "TypeScript", "Tailwind CSS", "GSAP"],
    description:
      "A website built for Matchitt, a digital agency founded by two sisters focused on connecting brands with the right audience. Built around the belief that businesses need strategic direction over more content, the platform showcases their social strategy and brand storytelling.",
    whatIDid:
      "The client came to me with a messy site built by a previous developer, so I rebuilt the entire platform from scratch. While they provided Figma designs, their main priority was smooth scrolling and a 3D model that animated fluidly across the site. I engineered the 3D model motion and positioning from the ground up, optimized responsiveness for all devices, and suggested improved layout animations along the way.",
    howIBuiltThis:
      "Built with Next.js, Three.js, React, TypeScript, and Tailwind CSS. I used Three.js to render and position the 3D model, pairing it with GSAP ScrollTrigger and smooth scroll integration to drive fluid 3D motion while keeping overall page performance fast and lightweight.",
    keyTakeaway:
      "This project was a major milestone in my 3D web development journey. I learned how to handle complex 3D element motion, synchronize 3D camera transforms with scroll behavior, and optimize 3D model rendering across different screen sizes.",
    tagline: [
      "Helping brands reach the people who matter the most.",
      "Engineered with Next.js, Tailwind CSS & smooth GSAP animations.",
    ],
  },
];
