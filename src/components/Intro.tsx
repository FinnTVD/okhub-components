"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(SplitText, CustomEase);

export default function Intro({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const active = useRef(false);

  useGSAP(() => {
    if (active.current) return;
    const oneRem = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const split = SplitText.create("#heading", { type: "words, chars" });
    CustomEase.create("hop", ".8, 0, .3, 1");
    gsap.to(split.chars.slice(1, split.chars.length - 3), {
      duration: 0.2,
      y: 100,
      stagger: 0.1,
      onComplete: () => {
        gsap.to(split.chars.slice(1, split.chars.length - 3), {
          duration: 0.3,
          width: "0",
        });
        gsap.to(split.chars[0], {
          scale: 0.5,
          y: `-${oneRem * 1.3}px`,
          x: `${oneRem * 2.2}px`,
          delay: 0.5,
          duration: 0.5,
        });
        gsap.to(split.chars.slice(split.chars.length - 3, split.chars.length), {
          x: `-${oneRem * 2.2}px`,
          delay: 0.5,
          duration: 0.5,
        });
        gsap.to("#overlay_center", {
          clipPath: "polygon(0% 48.5%, 100% 48.5%, 100% 51.5%, 0% 51.5%)",
          delay: 1.2,
          duration: 0.75,
          onComplete: () => {
            gsap.to("#overlay_center", {
              overflow: "auto",
              height: "auto",
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              delay: 0.1,
              duration: 0.5,
            });
            active.current = true;
          },
        });
      },
    });
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="fixed inset-0 flex items-center justify-center z-10"
      >
        <div className="bg-[#181818] absolute top-0 left-0 size-full"></div>

        <div className="relative z-10">
          <h1
            id="heading"
            className="text-[#f4efe7] text-[8rem] font-semibold overflow-hidden leading-[0.7]"
          >
            TRINH VAN DUC
          </h1>
        </div>
      </section>
      <main
        id="overlay_center"
        className="z-20 relative w-full h-screen overflow-hidden bg-white"
        style={{
          clipPath: "polygon(0% 48.5%, 0% 48.5%, 0% 51.5%, 0% 51.5%)",
        }}
      >
        {children}
      </main>
    </>
  );
}
