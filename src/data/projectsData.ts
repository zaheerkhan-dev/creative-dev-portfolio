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
    id: "usalef",
    title: "USALEF",
    img: "/Images/Projects/Project_1_ALEF/ALEF.mp4",
    projectImages: [
      { url: "/Images/Projects/Project_1_ALEF/ALEF-1.png", pageName: "Home Page" },
      { url: "/Images/Projects/Project_1_ALEF/ALEF-2.png", pageName: "Our Mission & Leadership" },
      { url: "/Images/Projects/Project_1_ALEF/ALEF-3.png", pageName: "Policy Advocacy" },
      { url: "/Images/Projects/Project_1_ALEF/ALEF-4.png", pageName: "Educational Initiatives" },
      { url: "/Images/Projects/Project_1_ALEF/ALEF-5.png", pageName: "Events & Summits" },
      { url: "/Images/Projects/Project_1_ALEF/ALEF-6.png", pageName: "Community Programs" },
      { url: "/Images/Projects/Project_1_ALEF/ALEF-7.png", pageName: "Research & Publications" },
      { url: "/Images/Projects/Project_1_ALEF/ALEF-8.png", pageName: "Media & Podcasts" },
      { url: "/Images/Projects/Project_1_ALEF/ALEF-9.png", pageName: "Membership Flow" },
      { url: "/Images/Projects/Project_1_ALEF/ALEF-10.png", pageName: "Donation Portal" },
      { url: "/Images/Projects/Project_1_ALEF/ALEF-11.png", pageName: "Multilingual Hub" },
      { url: "/Images/Projects/Project_1_ALEF/ALEF-12.png", pageName: "Contact & Support" },
    ],
    url: "https://www.usalef.org/",
    client: "American Lebanon Education Foundation",
    year: "2025",
    role: "Full-Stack Development & Creative Direction",
    techStack: ["Next.js", "CMS", "CRM", "Payment Integration", "i18n Multilingual"],
    description:
      "A web platform built for the American Lebanon Education Foundation (ALEF) to bring together supporters, policy experts, and the global Lebanese community. It serves as an easy-to-use digital hub for online donations, news updates, research, and legislative tracking — supporting ALEF's vision of a free, sovereign, and prosperous Lebanon.",
    whatIDid:
      "I handled the complete design and development from the ground up. The client specifically requested a theme using navy blue, red, and white, so I carefully crafted a design that made these exact colors look modern and cohesive, alongside full dark mode support. Knowing the target audience includes older and non-tech users, I prioritized clear navigation and clean layouts over heavy visual clutter, keeping the experience simple, intuitive, and accessible.",
    howIBuiltThis:
      "Built with Next.js, React, and TypeScript for high performance and responsiveness. I integrated 4-language support (English, French, Arabic, and Spanish), secure payment processing, user authentication, a CMS for content updates, and a CRM for donor management. I used subtle GSAP micro-animations to keep the site engaging without slowing down performance.",
    keyTakeaway:
      "While I personally enjoy heavy motion and experimental animations, this project taught me the value of putting the client’s vision and target audience first. By focusing on accessibility, clear brand identity, and essential non-profit tools, I delivered a site that truly served the client's mission and their community.",
    tagline: [
      "An advocacy platform for Lebanese sovereignty, designed to engage",
      "A global audience and simplify complex legislative initiatives.",
    ],
  },
  {
    id: "mycelius",
    title: "Mycelius",
    img: "/Images/Projects/Project_2_Mycelius/Mycelius.mp4",
    projectImages: [
      { url: "/Images/Projects/Project_2_Mycelius/Mycelius_1.png", pageName: "Home Page" },
      { url: "/Images/Projects/Project_2_Mycelius/Mycelius_2.png", pageName: "Biomaterial Vision" },
      { url: "/Images/Projects/Project_2_Mycelius/Mycelius_3.png", pageName: "Product Line" },
      { url: "/Images/Projects/Project_2_Mycelius/Mycelius_4.png", pageName: "Limited Edition" },
      { url: "/Images/Projects/Project_2_Mycelius/Mycelius_5.png", pageName: "Regenerative Biomass" },
      { url: "/Images/Projects/Project_2_Mycelius/Mycelius_6.png", pageName: "Material Culture" },
      { url: "/Images/Projects/Project_2_Mycelius/Mycelius_7.png", pageName: "Performance & Aesthetics" },
      { url: "/Images/Projects/Project_2_Mycelius/Mycelius_8.png", pageName: "Architectural Applications" },
      { url: "/Images/Projects/Project_2_Mycelius/Mycelius_9.png", pageName: "Sustainability Impact" },
      { url: "/Images/Projects/Project_2_Mycelius/Mycelius_10.png", pageName: "Get In Touch" },
    ],
    url: "https://www.myceliuslab.com/",
    client: "Mycelius Bio",
    year: "2025",
    role: "Full-Stack Development & Creative Direction",
    techStack: ["Next.js", "WebGL & Shaders", "TypeScript", "Tailwind CSS", "GSAP"],
    description:
      "A website built for Mycelius, an innovative brand that grows eco-friendly biomaterials and furniture from mushroom roots and agricultural waste. The platform showcases their sustainable interior products — supporting Mycelius's vision of proving that modern design can be beautiful, high-performing, and good for the planet without compromise.",
    whatIDid:
      "I designed and developed the website completely from scratch. The client wanted a unique and highly creative platform, which gave me full artistic freedom. I focused on structuring every section creatively while keeping the overall experience clean, modern, and engaging without overusing heavy motion.",
    howIBuiltThis:
      "Built with Next.js, React, TypeScript, and Tailwind CSS. To match the brand's organic theme, I engineered a custom WebGL shader animation and applied it consistently across all interactive buttons and links. I combined this with smooth GSAP animations to present each section creatively while keeping performance fast and fluid.",
    keyTakeaway:
      "This project taught me that overly complex or excessive animations don't automatically make a website cool. A site becomes truly exceptional when motion is used purposefully — applying animations selectively only where they enhance the user experience and tell a clearer story.",
    tagline: [
      "Regenerative biomaterial platform engineered for Mycelius Bio.",
      "Building a new material culture from fungi and regenerative biomass.",
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
