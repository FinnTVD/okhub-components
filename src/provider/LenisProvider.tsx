"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useGSAP(() => {
    // Create Lenis instance
    const lenis = new Lenis();

    // Update ScrollTrigger when Lenis scrolls
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker to run Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Remove GSAP lag smoothing for exact sync
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after everything is set up
    ScrollTrigger.refresh();

    // Cleanup function
    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
