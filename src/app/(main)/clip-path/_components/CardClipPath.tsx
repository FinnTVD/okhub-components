"use client";
import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";

// Tạo các cấu hình animation
const animationConfig = {
  in: {
    clipPath: "circle(150% at 0 0)",
    duration: 0.8,
    ease: "power2.out",
  },
  out: {
    clipPath: "circle(0% at 0 0)",
    duration: 0.8,
    ease: "power2.inOut",
  },
};

const CardClipPath = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Tạo một hàm animate tái sử dụng
  const animate = useCallback((direction: "in" | "out") => {
    if (!imageRef.current) return;

    // Nếu đang có animation, kill nó trước
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Tạo animation mới với GSAP
    animationRef.current = gsap.to(
      imageRef.current,
      animationConfig[direction]
    );
  }, []);

  // Tối ưu các hàm xử lý sự kiện với useCallback
  const handleMouseEnter = useCallback(() => {
    animate("in");
  }, [animate]);

  const handleMouseLeave = useCallback(() => {
    animate("out");
  }, [animate]);

  // Thiết lập ban đầu và cleanup
  useEffect(() => {
    // Đảm bảo clip-path ban đầu được thiết lập
    if (imageRef.current) {
      gsap.set(imageRef.current, { clipPath: "circle(0% at 0 0)" });
    }

    // Cleanup khi component unmount
    return () => {
      // Hủy bỏ animation nếu đang chạy
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <Link href={"#"} className="relative" onNavigate={handleMouseEnter}>
      <div
        className="z-10 absolute inset-0 size-full xsm:hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div className="relative h-[21.75rem] w-[45.1875rem] xsm:w-full xsm:h-[10.6875rem]">
        <Image
          className="size-full object-cover"
          src={"/clip-path/item-project.jpg"}
          alt=""
          width={723}
          height={348}
        />
        <Image
          ref={imageRef}
          className="absolute top-0 left-0 size-full object-cover"
          src={"/clip-path/item-project-hover.jpg"}
          alt=""
          width={723}
          height={348}
        />
      </div>
    </Link>
  );
};

export default CardClipPath;

export const CardClipPathCode = `
"use client";
import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";

// Tạo các cấu hình animation
const animationConfig = {
  in: {
    clipPath: "circle(150% at 0 0)",
    duration: 0.8,
    ease: "power2.out",
  },
  out: {
    clipPath: "circle(0% at 0 0)",
    duration: 0.8,
    ease: "power2.inOut",
  },
};

const CardClipPath = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Tạo một hàm animate tái sử dụng
  const animate = useCallback((direction: "in" | "out") => {
    if (!imageRef.current) return;

    // Nếu đang có animation, kill nó trước
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Tạo animation mới với GSAP
    animationRef.current = gsap.to(
      imageRef.current,
      animationConfig[direction]
    );
  }, []);

  // Tối ưu các hàm xử lý sự kiện với useCallback
  const handleMouseEnter = useCallback(() => {
    animate("in");
  }, [animate]);

  const handleMouseLeave = useCallback(() => {
    animate("out");
  }, [animate]);

  // Thiết lập ban đầu và cleanup
  useEffect(() => {
    // Đảm bảo clip-path ban đầu được thiết lập
    if (imageRef.current) {
      gsap.set(imageRef.current, { clipPath: "circle(0% at 0 0)" });
    }

    // Cleanup khi component unmount
    return () => {
      // Hủy bỏ animation nếu đang chạy
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <Link href={"#"} className="relative" onNavigate={handleMouseEnter}>
      <div
        className="z-10 absolute inset-0 size-full xsm:hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div className="relative h-[21.75rem] w-[45.1875rem] xsm:w-full xsm:h-[10.6875rem]">
        <Image
          className="size-full object-cover"
          src={"/clip-path/item-project.jpg"}
          alt=""
          width={723}
          height={348}
        />
        <Image
          ref={imageRef}
          className="absolute top-0 left-0 size-full object-cover"
          src={"/clip-path/item-project-hover.jpg"}
          alt=""
          width={723}
          height={348}
        />
      </div>
    </Link>
  );
};

export default CardClipPath;
`;
