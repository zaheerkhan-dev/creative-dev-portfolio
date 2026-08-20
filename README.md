# 🌌 Zaheer Khan — Creative Developer Portfolio (Code Study)

> **Note on Design & Code Study**:  
> This project is an independent technical recreation and code study of **[Nikhil Dhakad](https://www.linkedin.com/in/nikhil-dhakad/)**'s creative portfolio design. Built 100% from scratch in **Next.js 15 (App Router)**, **Three.js & React Three Fiber**, and **GSAP** by [Zaheer Khan](https://github.com/zaheerkhan-dev) as a deep-dive engineering exercise to master WebGL shaders, particle physics, 3D model orchestration, polygon clipping math, and zero-latency audio pooling.  
> 
> *All source code, performance pipelines, video synchronization engines, and case study content are custom-engineered from the ground up.*

🔗 **Live Demo**: [https://zaheerkhan-portfolio.pages.dev](https://zaheerkhan-portfolio.pages.dev)  
🎨 **Design Inspiration & Original Concept**: [Nikhil Dhakad](https://www.linkedin.com/in/nikhil-dhakad/)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-zaheerkhan--portfolio.pages.dev-orange?style=for-the-badge&logo=cloudflare-pages&logoColor=white)](https://zaheerkhan-portfolio.pages.dev)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185.1-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.7-green?style=for-the-badge&logo=greensock)](https://greensock.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Features & Architecture

### 1. 🌌 Interactive Particle Cloud Canvas (`/`)
- **78,631 Dynamic Particle Points**: Real-time WebGL canvas sampling high-contrast typography bitmap.
- **Physics Simulation**: Distance-squared repulsion from cursor, smooth velocity damping, spring return elasticity, and custom GLSL vertex point shading.
- **Staggered Social Tooltips**: Character-level split text reveals with interactive hover sound effects.

### 2. 🏛️ About Page & 3D Interactive Roman Bust (`/about`)
- **Organic SVG Bottom Wave Morphing**: Custom SVG clip-path dynamically morphing curve geometry on scroll with GSAP ScrollTrigger.
- **Interactive Smudge Mask Reveals**: Two-tier cursor smudge mask revealing contrasting philosophies.
- **What I Do Dynamic Slider**: 13 categorized rolling capability cards (SaaS development, AI workflows, WebGL, CMS, APIs, etc.) with horizontal drag mechanics.
- **Circular Testimonials Dial**: Arc mathematics (`sin`/`cos`) arranging reviewer avatars on a dynamic radius dial with autoplay rotation and modal review inspection.
- **3D Marcus Aurelius Bust**: Three.js & React Three Fiber GLTF model with real-time mouse/scroll parallax tracking, dual-lighting, and interactive sunglasses overlay.

### 3. 🎬 Interactive Dual-Split Projects Showcase (`/projects`)
- **Polygon Clipping Slider**: Mathematical dual-column split slider with dynamic polygon clipping (`polygon(0% ${100-r}%, 100% ${100-r}%, 100% 100%, 0% 100%)`).
- **Synchronized Video Playback**: Parallel left and right video streams with wheel inertia, touch swipe inertia, arrow key snapping, and custom floating `"VIEW"` cursor.
- **3G-Resilient Stream Engine**: Faststart MP4 atoms and optimized WebP fallback assets for instant loading on any connection speed.

### 4. 🖼️ Dynamic Case Studies & Three.js Gallery (`/projects/[id]`)
- **Case Study Deep Dives**: Rich project breakdown for 5 featured projects (`staurga`, `linkryse`, `patreon`, `orunk`, `yappedin`).
- **Parallax Hero Showcase**: Scrubbed video/image presentation with SplitText line reveals and metadata specs.
- **WebGL Barrel Distortion Gallery**: Interactive infinite draggable Three.js canvas texture atlas with custom barrel distortion vertex and fragment GLSL shaders.
- **Dual-Split Bottom Nav**: Seamless Next/Previous project switcher.

### 5. 📬 Animated Contact Experience (`/contact`)
- **Morphing Submit Button**: Pill-shaped action button smoothly collapsing into a progress bar line, expanding into a circular badge, and drawing SVG status checkmark with signature letter staggers.
- **Dynamic Social Tooltips**: Staggered center-aligned social tooltips with interactive hover micro-animations.

### 6. 🔊 Zero-Latency Sound Effects Engine
- **Preloaded Audio Pool System**: Multi-instance audio pool allowing simultaneous overlapping clicks and hovers without cutting off audio channels.
- **Interactive Micro-Acoustics**: Tactile `click.mp3` on navigation buttons, slider controls, and form submit; gentle `hover.mp3` on social link interactions.

### 7. ⚡ Global Performance & Optimization
- **WebP Image Compression**: All static screenshots and portraits optimized to WebP with **82.6% size reduction** (23.7MB → 4.1MB) at quality 95.
- **25-Slice Curtain Page Transitions**: Signature DrawSVG stroke overlay combined with 25-column vertical curtain wipe on page routing.
- **Lenis Smooth Scrolling**: Globally synchronized with GSAP ticker loop.

---

## 📁 Project Structure

```
creative-dev-portfolio/
├── public/
│   ├── 3D/                     # Marcus Aurelius GLTF 3D model
│   ├── draco/                  # Local Draco WASM decoders
│   ├── fonts/                  # Barlow Condensed & Bigger Display Webfonts
│   ├── Images/                 # Optimized WebP screenshots, portraits, & texture assets
│   ├── sounds/                 # Audio assets (click.mp3, hover.mp3, pop.mp3)
│   └── Videos/                 # Project showcase MP4 faststart video loops
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts, smooth scroll, & preloader
│   │   ├── page.tsx            # Home page with 78k particle cloud
│   │   ├── globals.css         # Global tokens, typography, & custom utilities
│   │   ├── about/page.tsx      # Full About page (5 interactive sections)
│   │   ├── contact/page.tsx    # Contact page with interactive form
│   │   ├── projects/
│   │   │   ├── page.tsx        # Dual-column polygon clipping slider
│   │   │   └── [id]/page.tsx   # Dynamic project showcase with WebGL gallery
│   ├── components/
│   │   ├── Navbar.tsx          # Rolling text link navigation with audio clicks
│   │   ├── SmoothScroll.tsx    # Lenis smooth scroll provider
│   │   ├── TransitionRouter.tsx# 25-slice vertical curtain page transitions
│   │   ├── LoadingScreen.tsx   # Number counter preloader with SVG draw
│   │   ├── ParticleCanvas.tsx  # WebGL 78k particle cloud engine
│   │   ├── SocialLinks.tsx     # Floating social links with hover audio & SplitText
│   │   ├── about/              # MarcusAureliusModel, SmudgeMask, WhatTheySaid, etc.
│   │   ├── projects/           # ProjectsSlider, ProjectGallery (Three.js shaders)
│   │   └── contact/            # ContactForm, ContactFooter
│   ├── data/
│   │   └── projectsData.ts     # Metadata, specs, & case study content
│   └── lib/
│       ├── soundEffects.ts     # Zero-latency audio pooling system
│       ├── splitText.ts        # Custom SplitText utility for line/char reveals
│       └── utils.ts            # Utility functions
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **npm** or **pnpm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/zaheerkhan-dev/creative-dev-portfolio.git
cd creative-dev-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:4005](http://localhost:4005) in your browser. Fast Refresh / HMR is active for instant real-time updates.

### 4. Build for Production & Static Export
```bash
npm run build
```
Generates a fully optimized static export in the `/out` directory, ready for Cloudflare Pages, Vercel, or AWS S3.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 15 (App Router)** | Framework, static HTML generation & server components |
| **React 19** | UI components & state orchestration |
| **Three.js & React Three Fiber** | 3D Marcus Aurelius bust, WebGL particle simulation & barrel distortion gallery |
| **GSAP & ScrollTrigger** | Scroll animations, SplitText character choreography & SVG path morphing |
| **Web Audio API** | Zero-latency preloaded audio pooling for sound effects |
| **Lenis** | Momentum smooth scroll engine |
| **Tailwind CSS 4** | Utility styling & responsive layout system |
| **TypeScript** | Type safety across metadata and 3D scenes |
| **Cloudflare Pages** | Global edge hosting and static deployment |

---

## 📄 License
MIT License © 2026 Zaheer Khan. Built with passion and attention to detail.
