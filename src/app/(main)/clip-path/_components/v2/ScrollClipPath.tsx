"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

export default function ScrollClipPath() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const images = sectionRef.current.querySelectorAll("img");

      images.forEach((image) => {
        ScrollTrigger.create({
          trigger: image,
          start: "top bottom",
          end: "top top",
          scrub: 0.5,
          invalidateOnRefresh: true,
          animation: gsap.fromTo(
            image,
            {
              clipPath: "polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)",
            },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              ease: "none",
              immediateRender: false,
            }
          ),
        });
        ScrollTrigger.create({
          trigger: image,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
          animation: gsap.fromTo(
            image,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)",
              ease: "none",
              immediateRender: false,
            }
          ),
        });
      });

      // Refresh ScrollTrigger after everything is set up
      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <main>
      <section ref={sectionRef}>
        <div className="grid grid-cols-1 gap-y-[5rem]">
          {Array.from({ length: 5 }).map((image, index) => (
            <Image
              key={index}
              src={`/clip-path/clip${index + 1}.avif`}
              alt="image"
              width={1600}
              height={780}
              quality={90}
              className="w-full h-auto object-cover"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
