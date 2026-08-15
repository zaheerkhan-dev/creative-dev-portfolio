# 🌌 Nikhil Dhakad — Creative Developer Portfolio

An award-winning caliber, high-performance creative developer portfolio built with **Next.js 15 (App Router)**, **Three.js & React Three Fiber**, **GSAP (ScrollTrigger & SplitText)**, **Lenis Smooth Scroll**, and **Tailwind CSS**.

![Next.js](https://img.shields.io/badge/Next.js-15.2.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.185.1-black?style=for-the-badge&logo=three.js)
![GSAP](https://img.shields.io/badge/GSAP-3.12.7-green?style=for-the-badge&logo=greensock)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features & Architecture

### 1. 🌌 Interactive Particle Cloud Canvas (`/`)
- **78,631 Dynamic Particle Points**: Real-time WebGL canvas sampling high-contrast typography bitmap.
- **Physics Simulation**: Distance-squared repulsion from cursor, smooth velocity damping, spring return elasticity, and custom GLSL vertex point shading.
- **Vignette & Smudge Masking**: Cinematic framing with responsive layout.

### 2. 🏛️ About Page & 3D Interactive Roman Bust (`/about`)
- **Organic SVG Bottom Wave Morphing**: Custom SVG clip-path dynamically morphing curve geometry on scroll with GSAP ScrollTrigger.
- **Interactive Smudge Mask Reveals**: Two-tier cursor smudge mask revealing contrasting foreground and background philosophies.
- **What I Do Dynamic Slider**: 12 categorized rolling capability cards with sarcastic developer quotes and horizontal drag mechanics.
- **Circular Testimonials Dial**: Arc mathematics (`sin`/`cos`) arranging reviewer avatars on a dynamic radius dial with autoplay rotation and modal review inspection.
- **3D Marcus Aurelius Bust**: Three.js & React Three Fiber GLTF model with real-time mouse/scroll parallax tracking, dual-lighting, and interactive sunglasses overlay.

### 3. 🎬 Interactive Dual-Split Projects Showcase (`/projects`)
- **Polygon Clipping Slider**: Mathematical dual-column split slider with dynamic polygon clipping (`polygon(0% ${100-r}%, 100% ${100-r}%, 100% 100%, 0% 100%)`).
- **Synchronized Video Playback**: Parallel left and right video streams with wheel inertia (`deltaY / 1000`), touch swipe inertia, arrow key snapping, and custom floating `"VIEW"` cursor.

### 4. 🖼️ Dynamic Case Studies & Three.js Gallery (`/projects/[id]`)
- **Case Study Deep Dives**: Rich project breakdown for 5 featured projects (`usalef`, `mycelius`, `orbit-matter`, `design-hive`, `matchitt`).
- **Parallax Hero Showcase**: Scrubbed video/image presentation with SplitText line reveals and metadata specs.
- **WebGL Barrel Distortion Gallery**: Interactive infinite draggable Three.js canvas texture atlas with custom barrel distortion vertex and fragment GLSL shaders.
- **Dual-Split Bottom Nav**: Seamless Next/Previous project switcher.

### 5. 📬 Animated Contact Experience (`/contact`)
- **Morphing Submit Button**: Pill-shaped action button smoothly collapsing into a progress bar line, expanding into a circular badge, and drawing SVG status checkmark with signature letter staggers.
- **Dynamic Social Tooltips**: Staggered center-aligned social tooltips with interactive hover micro-animations.

### 6. ⚡ Global Performance & Motion System
- **25-Slice Curtain Page Transitions**: Signature DrawSVG stroke overlay combined with 25-column vertical curtain wipe on page routing.
- **Lenis Smooth Scrolling**: Globally synchronized with GSAP ticker loop.
- **100% Offline Local Assets**: 60MB+ of optimized local videos, images, 3D GLTF models, and webfonts bundled directly in `/public`.

---

## 📁 Project Structure

```
nikhildhakad-portfolio/
├── public/
│   ├── 3D/                     # Marcus Aurelius GLTF 3D model
│   ├── draco/                  # Local Draco WASM decoders
│   ├── Fonts/                  # Barlow Condensed & Bigger Display Webfonts
│   ├── Images/                 # Screenshots, portraits, & texture assets
│   └── Videos/                 # Project showcase MP4 video loops
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
│   │   ├── Navbar.tsx          # Rolling text link navigation
│   │   ├── SmoothScroll.tsx    # Lenis smooth scroll provider
│   │   ├── TransitionRouter.tsx# 25-slice vertical curtain page transitions
│   │   ├── LoadingScreen.tsx   # Number counter preloader with SVG draw
│   │   ├── ParticleCanvas.tsx  # WebGL 78k particle cloud engine
│   │   ├── about/              # MarcusAureliusModel, SmudgeMask, WhatTheySaid, etc.
│   │   ├── projects/           # ProjectsSlider, ProjectGallery (Three.js shaders)
│   │   └── contact/            # ContactForm, ContactFooter
│   ├── data/
│   │   └── projectsData.ts     # Metadata, specs, & case study content
│   └── lib/
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
git clone https://github.com/zaheerkhan-dev/nikhildhakad-portfolio.git
cd nikhildhakad-portfolio
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

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 15 (App Router)** | Framework, static generation & server components |
| **React 19** | UI components & state orchestration |
| **Three.js & React Three Fiber** | 3D Marcus Aurelius bust, WebGL particle simulation & barrel distortion gallery |
| **GSAP & ScrollTrigger** | Scroll animations, SplitText character choreography & SVG path morphing |
| **Lenis** | Momentum smooth scroll engine |
| **Tailwind CSS 4** | Utility styling & responsive layout system |
| **TypeScript** | Type safety across metadata and 3D scenes |

---

## 📄 License
MIT License © 2026. Built with passion and attention to detail.
