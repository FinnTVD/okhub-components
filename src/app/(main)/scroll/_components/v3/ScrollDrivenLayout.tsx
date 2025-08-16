"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

let currentPhase = 0;

export default function ScrollDrivenLayout() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const oneRem = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        onUpdate: (self) => {
          console.log(self.progress);
          if (self.progress >= 0.25 && currentPhase === 0) {
            currentPhase = 1;
            gsap.to(".col-1", {
              opacity: 0,
              scale: 0.75,
              duration: 0.75,
            });
            gsap.to(".col-2", {
              x: "-100%",
              right: `${oneRem * 0.75}px`,
              duration: 0.75,
            });
            gsap.to(".col-3", {
              y: 0,
              duration: 0.75,
            });
            gsap.to(".img-1", {
              opacity: 0,
              scale: 1.5,
              duration: 0.75,
            });
            gsap.to(".img-2", {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              scale: 1,
              duration: 0.75,
            });
          }
          if (self.progress >= 0.6 && currentPhase === 1) {
            currentPhase = 2;
            gsap.to(".col-2", {
              opacity: 0,
              scale: 0.75,
              duration: 0.75,
            });
            gsap.to(".col-3", {
              x: "-100%",
              right: `${oneRem * 0.75}px`,
              duration: 0.75,
            });
            gsap.to(".col-4", {
              y: 0,
              duration: 0.75,
            });
            gsap.to(".img-3", {
              scale: 1,
              duration: 0.75,
            });
          }
          if (self.progress < 0.25 && currentPhase >= 1) {
            currentPhase = 0;
            gsap.to(".col-1", {
              opacity: 1,
              scale: 1,
              duration: 0.75,
            });
            gsap.to(".col-2", {
              x: 0,
              right: 0,
              duration: 0.75,
            });
            gsap.to(".col-3", {
              y: "110%",
              duration: 0.75,
            });
            gsap.to(".img-1", {
              opacity: 1,
              scale: 1,
              duration: 0.75,
            });
            gsap.to(".img-2", {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              scale: 1.5,
              duration: 0.75,
            });
          }
          if (self.progress < 0.6 && currentPhase === 2) {
            currentPhase = 1;
            gsap.to(".col-2", {
              opacity: 1,
              scale: 1,
              duration: 0.75,
            });
            gsap.to(".col-3", {
              x: 0,
              right: 0,
              duration: 0.75,
            });
            gsap.to(".col-4", {
              y: "110%",
              duration: 0.75,
            });
            gsap.to(".img-3", {
              scale: 1.5,
              duration: 0.75,
            });
          }
        },
      });

      // Refresh ScrollTrigger after everything is set up
      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <div className="w-full relative bg-[#181818] min-h-[200vh]">
      <div className="h-[50vh]"></div>
      <section ref={sectionRef} className="w-full relative">
        <div className="w-full h-screen p-3 overflow-hidden">
          <div className="flex justify-between relative h-full">
            <div className="col-1 h-full w-[calc(50%-0.375rem)] overflow-hidden relative rounded-[5rem] bg-[#2a2725]"></div>
            <div className="col-2 h-full w-[calc(50%-0.375rem)] overflow-hidden rounded-[5rem] bg-[#2a2725] absolute right-0 top-0">
              <Image
                className="size-full object-cover pointer-events-none img-1"
                src="https://capsules.moyra.co/_ipx/q_80/images/cap3-square.jpg"
                alt="image"
                fill
                sizes="100vw"
              />
              <Image
                className="size-full object-cover scale-150 pointer-events-none img-2"
                style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
                src="https://capsules.moyra.co/_ipx/q_80/images/cap2-square.jpg"
                alt="image"
                fill
                sizes="100vw"
              />
            </div>
            <div className="col-3 h-full w-[calc(50%-0.375rem)] overflow-hidden rounded-[5rem] bg-[#2a2725] absolute right-0 bottom-0 translate-y-[110%]"></div>
            <div className="col-4 h-full w-[calc(50%-0.375rem)] overflow-hidden rounded-[5rem] bg-[#2a2725] absolute right-0 bottom-0 translate-y-[110%]">
              <Image
                className="size-full object-cover scale-150 pointer-events-none img-3"
                src="https://capsules.moyra.co/_ipx/q_80/images/cap1-square.jpg"
                alt="image"
                fill
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
