"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./menu.css";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  { path: "/menu", label: "Home" },
  { path: "/menu/work", label: "Work" },
  { path: "/menu/lab", label: "Lab" },
  { path: "/menu/contact", label: "Contact" },
  { path: "/menu/about", label: "About" },
];

export const Menu = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const tl = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });
      tl.current
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-container" ref={container}>
      <div className="menu-bar">
        <div className="menu-logo">
          <Link href={"/menu"}>OKHub</Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p>Menu</p>
        </div>
      </div>

      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Link href={"/menu"}>OKHub</Link>
          </div>
          <div className="menu-close" onClick={toggleMenu}>
            <p>Close</p>
          </div>
        </div>
        <div className="menu-close-icon">
          <p>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link, index) => (
              <div className="menu-link-item" key={index}>
                <div className="menu-link-item-holder" onClick={toggleMenu}>
                  <Link href={link.path} className="menu-link">
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              <Link href={"/menu"}>X &#8599;</Link>
              <Link href={"/menu"}>Instagram &#8599;</Link>
              <Link href={"/menu"}>LinkedIn &#8599;</Link>
              <Link href={"/menu"}>Behance &#8599;</Link>
              <Link href={"/menu"}>Dribbble &#8599;</Link>
            </div>
            <div className="menu-info-col">
              <p>River@gmail.com</p>
              <p>0345613090</p>
            </div>
          </div>
        </div>
        <div className="menu-preview">
          <p>View more</p>
        </div>
      </div>
    </div>
  );
};

export const MenuCode = `
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./menu.css";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  { path: "/menu", label: "Home" },
  { path: "/menu/work", label: "Work" },
  { path: "/menu/lab", label: "Lab" },
  { path: "/menu/contact", label: "Contact" },
  { path: "/menu/about", label: "About" },
];

export const Menu = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const tl = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });
      tl.current
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-container" ref={container}>
      <div className="menu-bar">
        <div className="menu-logo">
          <Link href={"/menu"}>OKHub</Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p>Menu</p>
        </div>
      </div>

      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Link href={"/menu"}>OKHub</Link>
          </div>
          <div className="menu-close" onClick={toggleMenu}>
            <p>Close</p>
          </div>
        </div>
        <div className="menu-close-icon">
          <p>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link, index) => (
              <div className="menu-link-item" key={index}>
                <div className="menu-link-item-holder" onClick={toggleMenu}>
                  <Link href={link.path} className="menu-link">
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              <Link href={"/menu"}>X &#8599;</Link>
              <Link href={"/menu"}>Instagram &#8599;</Link>
              <Link href={"/menu"}>LinkedIn &#8599;</Link>
              <Link href={"/menu"}>Behance &#8599;</Link>
              <Link href={"/menu"}>Dribbble &#8599;</Link>
            </div>
            <div className="menu-info-col">
              <p>River@gmail.com</p>
              <p>0345613090</p>
            </div>
          </div>
        </div>
        <div className="menu-preview">
          <p>View more</p>
        </div>
      </div>
    </div>
  );
};
`;
