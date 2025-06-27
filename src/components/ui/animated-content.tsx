"use client";
import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string | ((progress: number) => number);
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  onComplete?: () => void;
  showCopyButton?: boolean;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete,
  showCopyButton = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const copyCode = () => {
    const code = `<AnimatedContent
  distance={${distance}}
  direction="${direction}"
  reverse={${reverse}}
  duration={${duration}}
  ease="${ease}"
  initialOpacity={${initialOpacity}}
  animateOpacity={${animateOpacity}}
  scale={${scale}}
  threshold={${threshold}}
  delay={${delay}}
>
  {/* Your content here */}
</AnimatedContent>`;
    
    navigator.clipboard.writeText(code).then(() => {
      // Có thể thêm toast notification ở đây
      console.log('Code copied!');
    });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
    });

    gsap.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
      delay,
      onComplete,
      scrollTrigger: {
        trigger: el,
        start: `top ${startPct}%`,
        toggleActions: "play none none none",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(el);
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    onComplete,
  ]);

  return (
    <div className="relative">
      {showCopyButton && (
        <button
          onClick={copyCode}
          className="absolute top-2 right-2 z-10 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Copy Code
        </button>
      )}
      <div ref={ref}>{children}</div>
    </div>
  );
};

export default AnimatedContent;
