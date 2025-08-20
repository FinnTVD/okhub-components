"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import slides from "./sliders";
import Link from "next/link";
import Image from "next/image";
import "./styles.css";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface TransitionRange {
  transition: number;
  startVh: number;
  endVh: number;
  startPercent: number;
  endPercent: number;
}

const Slider = () => {
  const slideImagesRef = useRef<HTMLDivElement>(null);
  const titleElementRef = useRef<HTMLParagraphElement>(null);
  const firstSlideImageRef = useRef<HTMLImageElement>(null);
  const exploreLinkRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const totalSlides = slides.length;
    const stripsCount = 25;
    let currentTitleIndex = 0;
    let queuedTitleIndex: number | null = null;
    let isAnimating = false;

    const firstSlideImage = document.querySelector(
      "#img-1 img"
    ) as HTMLImageElement;
    if (firstSlideImage) {
      firstSlideImage.style.transform = "scale(1.25)";
    }

    // Slide Images Creation
    for (let i = 1; i < totalSlides; i++) {
      const imgContainer = document.createElement("div");
      imgContainer.className = "img-container";
      imgContainer.id = `img-container-${i + 1}`;
      imgContainer.style.opacity = "0";

      for (let j = 0; j < stripsCount; j++) {
        const strip = document.createElement("div");
        strip.className = "strip";

        const img = document.createElement("img");
        img.src = slides[i].image;
        img.alt = slides[i].title;
        img.className = "slide-image";
        img.style.transform = "scale(1.25)";

        const stripPositionFromBottom = stripsCount - j - 1;
        const stripLowerBound =
          (stripPositionFromBottom + 1) * (100 / stripsCount);
        const stripUpperBound = stripPositionFromBottom * (100 / stripsCount);

        strip.style.clipPath = `polygon(0 ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${
          stripUpperBound - 0.1
        }%, 0 ${stripUpperBound - 0.1}%)`;

        strip.appendChild(img);
        imgContainer.appendChild(strip);
      }

      if (slideImagesRef.current) {
        slideImagesRef.current.appendChild(imgContainer);
      }
    }

    // Scroll trigger logic
    const transitionCount = totalSlides - 1;
    const scrollDistancePerTransition = 1000;
    const initialScrollDelay = 300;
    const finalScrollDelay = 300;

    const totalScrollDistance =
      transitionCount * scrollDistancePerTransition +
      initialScrollDelay +
      finalScrollDelay;

    const transitionRanges: TransitionRange[] = [];
    let currentScrollPosition = initialScrollDelay;

    for (let i = 0; i < transitionCount; i++) {
      const transitionStart = currentScrollPosition;
      const transitionEnd = transitionStart + scrollDistancePerTransition;

      transitionRanges.push({
        transition: i,
        startVh: transitionStart,
        endVh: transitionEnd,
        startPercent: transitionStart / totalScrollDistance,
        endPercent: transitionEnd / totalScrollDistance,
      });

      currentScrollPosition = transitionEnd;
    }

    function calculateImageProgress(scrollProgress: number): number {
      let imageProgress = 0;

      if (scrollProgress < transitionRanges[0].startPercent) {
        return 0;
      }

      if (
        scrollProgress >
        transitionRanges[transitionRanges.length - 1].endPercent
      ) {
        return transitionRanges.length;
      }

      for (let i = 0; i < transitionRanges.length; i++) {
        const range = transitionRanges[i];

        if (
          scrollProgress >= range.startPercent &&
          scrollProgress <= range.endPercent
        ) {
          const rangeSize = range.endPercent - range.startPercent;
          const normalizedProgress =
            (scrollProgress - range.startPercent) / rangeSize;
          imageProgress = i + normalizedProgress;
          break;
        } else if (scrollProgress > range.endPercent) {
          imageProgress = i + 1;
        }
      }

      return imageProgress;
    }

    function getScaleForImage(
      imageIndex: number,
      currentImageIndex: number,
      progress: number
    ): number {
      if (imageIndex > currentImageIndex) return 1.25;
      if (imageIndex < currentImageIndex - 1) return 1;

      const totalProgress =
        imageIndex === currentImageIndex ? progress : 1 + progress;
      return 1.25 - (0.25 * totalProgress) / 2;
    }

    function getTitleIndexForProgress(imageProgress: number): number {
      const currentImageIndex = Math.floor(imageProgress);
      return Math.min(currentImageIndex, slides.length - 1);
    }

    function animateTitleChange(index: number, direction: string) {
      if (index === currentTitleIndex) return;

      if (index < 0 || index >= slides.length) return;

      if (isAnimating) {
        queuedTitleIndex = index;
        return;
      }

      isAnimating = true;
      const newTitle = slides[index].title;
      const newUrl = slides[index].url;
      const outY = direction === "down" ? "-120%" : "120%";
      const inY = direction === "down" ? "120%" : "-120%";

      if (titleElementRef.current) {
        gsap.killTweensOf(titleElementRef.current);
      }

      if (exploreLinkRef.current) {
        exploreLinkRef.current.href = newUrl;
      }

      if (titleElementRef.current) {
        gsap.to(titleElementRef.current, {
          y: outY,
          duration: 0.5,
          ease: "power3.Out",
          onComplete: () => {
            if (titleElementRef.current) {
              titleElementRef.current.textContent = newTitle;
              gsap.set(titleElementRef.current, { y: inY });

              gsap.to(titleElementRef.current, {
                y: "0%",
                duration: 0.5,
                ease: "power3.out",
                onComplete: () => {
                  currentTitleIndex = index;
                  isAnimating = false;
                  if (
                    queuedTitleIndex !== null &&
                    queuedTitleIndex !== currentTitleIndex
                  ) {
                    const nextIndex = queuedTitleIndex;
                    queuedTitleIndex = null;
                    animateTitleChange(nextIndex, direction);
                  }
                },
              });
            }
          },
        });
      }
    }

    let lastImageProgress = 0;

    ScrollTrigger.create({
      trigger: ".sticky-slider",
      start: "top top",
      end: `+=${totalScrollDistance}vh`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const imageProgress = calculateImageProgress(self.progress);

        if (typeof imageProgress === "number") {
          const scrollDirection =
            imageProgress > lastImageProgress ? "down" : "up";
          const currentImageIndex = Math.floor(imageProgress);
          const imageSpecificProgress = imageProgress - currentImageIndex;

          const correctTitleIndex = getTitleIndexForProgress(imageProgress);

          if (correctTitleIndex !== currentTitleIndex) {
            queuedTitleIndex = correctTitleIndex;
            if (!isAnimating) {
              animateTitleChange(correctTitleIndex, scrollDirection);
            }
          }

          const firstSlideImgScale = getScaleForImage(
            0,
            currentImageIndex,
            imageSpecificProgress
          );

          if (firstSlideImageRef.current) {
            firstSlideImageRef.current.style.transform = `scale(${firstSlideImgScale})`;
          }

          for (let i = 1; i < totalSlides; i++) {
            const imgIndex = i + 1;
            const transitionIndex = imgIndex - 2;
            const imgContainer = document.getElementById(
              `img-container-${imgIndex}`
            ) as HTMLDivElement;

            if (!imgContainer) continue;

            imgContainer.style.opacity = "1";

            const strips = imgContainer.querySelectorAll(
              ".strip"
            ) as NodeListOf<HTMLDivElement>;
            const images = imgContainer.querySelectorAll(
              "img"
            ) as NodeListOf<HTMLImageElement>;

            if (transitionIndex < currentImageIndex) {
              strips.forEach((strip, stripIndex) => {
                const stripPositionFromBottom = stripsCount - stripIndex - 1;
                const stripUpperBound =
                  stripPositionFromBottom * (100 / stripsCount);
                const stripLowerBound =
                  (stripPositionFromBottom + 1) * (100 / stripsCount);
                strip.style.clipPath = `polygon(0 ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${
                  stripUpperBound - 0.1
                }%, 0 ${stripUpperBound - 0.1}%)`;
              });
            } else if (transitionIndex === currentImageIndex) {
              strips.forEach((strip, stripIndex) => {
                const stripPositionFromBottom = stripsCount - stripIndex - 1;
                const stripUpperBound =
                  stripPositionFromBottom * (100 / stripsCount);
                const stripLowerBound =
                  (stripPositionFromBottom + 1) * (100 / stripsCount);
                const stripDelay = (stripIndex / stripsCount) * 0.5;
                const adjustedProgress = Math.max(
                  0,
                  Math.min(1, (imageSpecificProgress - stripDelay) * 2)
                );
                const currentStripUpperBound =
                  stripLowerBound -
                  (stripLowerBound - (stripUpperBound - 0.1)) *
                    adjustedProgress;

                strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${currentStripUpperBound}%, 0% ${currentStripUpperBound}%)`;
              });
            } else {
              strips.forEach((strip, stripIndex) => {
                const stripPositionFromBottom = stripsCount - stripIndex - 1;
                const stripLowerBound =
                  (stripPositionFromBottom + 1) * (100 / stripsCount);
                strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${stripLowerBound}%, 0% ${stripLowerBound}%)`;
              });
            }

            const imgScale = getScaleForImage(
              transitionIndex,
              currentImageIndex,
              imageSpecificProgress
            );

            images.forEach((img) => {
              img.style.transform = `scale(${imgScale})`;
            });
          }

          lastImageProgress = imageProgress;
        }
      },
    });
  }, []);

  return (
    <>
      <section className="intro section-scroll">
        <h4>
          Where organic concepts meets desert serenity, creating timeless
          sanctuaries awarding mindful living that embrace natural light
        </h4>
      </section>

      <section className="sticky-slider section-scroll">
        <div className="slide-images" ref={slideImagesRef}>
          <div className="img" id="img-1">
            <Image
              src="/img/img-1.jpg"
              className="slide-image"
              alt="/"
              ref={firstSlideImageRef}
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="slide-info">
          <div className="slide-title-prefix">
            <p className="slide-title-text">Essence</p>
          </div>

          <div className="slide-title">
            <p
              className="slide-title-text"
              id="title-text"
              ref={titleElementRef}
            >
              Desert Oasis Pool
            </p>
          </div>

          <div className="slide-link">
            <Link className="nav-link" href="#" ref={exploreLinkRef}>
              Explore &#8599;
            </Link>
          </div>
        </div>
      </section>

      <section className="outro section-scroll">
        <h4>
          Transform your vision into reality with spaces that honor both
          nature&apos;s wisdom and modern design, inviting you to experience the
          profound harmony of curved walls
        </h4>
      </section>
    </>
  );
};

export default Slider;
