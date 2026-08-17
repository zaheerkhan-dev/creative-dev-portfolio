import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import TransitionRouter from "@/components/TransitionRouter";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Zaheer Khan | Creative Developer",
  description:
    "Creative web developer crafting beautiful and engaging digital experiences. Specializing in React, Next.js, Three.js, GSAP, and modern web technologies.",
  authors: [{ name: "Zaheer Khan" }],
  keywords: [
    "web developer",
    "react",
    "next.js",
    "portfolio",
    "creative developer",
    "gsap",
    "three.js",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <SmoothScroll />
        <AppProvider>
          <TransitionRouter>
            <Navbar />
            <LoadingScreen>{children}</LoadingScreen>
          </TransitionRouter>
        </AppProvider>
      </body>
    </html>
  );
}
