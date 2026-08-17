import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["gsap", "@gsap/react", "three"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
