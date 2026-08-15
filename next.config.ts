import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["gsap", "@gsap/react", "three"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
