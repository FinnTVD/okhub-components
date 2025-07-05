"use client";

import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { gsap } from "gsap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TabContent } from "./tab-content";
import { TabNavigation } from "./tab-navigation";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function AnimatedTabs({ tabs, defaultTab }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [prevTab, setPrevTab] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [isStickyVisible, setIsStickyVisible] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );

  // Memoize tabs to prevent unnecessary re-renders
  const memoizedTabs = useMemo(() => tabs, [tabs]);

  // Use useRef for all DOM references to prevent re-creation
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const backgroundRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevContentRef = useRef<HTMLDivElement>(null);
  const activeContentRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const stickyTabRef = useRef<HTMLDivElement>(null);
  const stickySentinelRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const stickyEndSentinelRef = useRef<HTMLDivElement>(null);

  const scrollDirection = useScrollDirection();

  // Memoize animateBackground function to prevent recreation on every render
  const animateBackground = useCallback((targetTab: string) => {
    const targetElement = tabsRef.current[targetTab];
    const backgroundElement = backgroundRef.current;
    const containerElement = containerRef.current;

    if (!targetElement || !backgroundElement || !containerElement) return;

    const containerRect = containerElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    const x = targetRect.left - containerRect.left;
    const width = targetRect.width;
    const height = targetRect.height;

    gsap.to(backgroundElement, {
      x,
      width,
      height,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  // Memoize handleTabClick to prevent recreation
  const handleTabClick = useCallback(
    (tabId: string) => {
      if (tabId === activeTab || isAnimating) return;

      // Determine slide direction based on tab order
      const currentIndex = memoizedTabs.findIndex(
        (tab) => tab.id === activeTab
      );
      const targetIndex = memoizedTabs.findIndex((tab) => tab.id === tabId);
      const direction = targetIndex > currentIndex ? "right" : "left";
      setSlideDirection(direction);

      setPrevTab(activeTab);
      setActiveTab(tabId);
      animateBackground(tabId);
      setIsAnimating(true);

      // Scroll to the content container instead of tab navigation
      if (contentContainerRef.current) {
        const rect = contentContainerRef.current.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetScrollTop = scrollTop + rect.top - 300;

        window.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      }
    },
    [activeTab, isAnimating, memoizedTabs, animateBackground]
  );

  // Memoize refs object to prevent recreation
  const tabNavigationRefs = useMemo(
    () => ({
      tabsRef,
      backgroundRef,
      containerRef,
      stickyTabRef,
      stickySentinelRef,
      stickyWrapperRef,
    }),
    []
  );

  const tabContentRefs = useMemo(
    () => ({
      prevContentRef,
      activeContentRef,
      contentContainerRef,
      stickyEndSentinelRef,
    }),
    []
  );

  // Handle scroll direction changes
  useEffect(() => {
    if (scrollDirection === "up") {
      setIsStickyVisible(false);
    } else if (scrollDirection === "down") {
      setIsStickyVisible(true);
    }
  }, [scrollDirection]);

  // Update container height when active tab changes
  useEffect(() => {
    const updateHeight = () => {
      if (activeContentRef.current) {
        setContainerHeight(activeContentRef.current.scrollHeight);
      }
    };
    const timer = setTimeout(updateHeight, 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Animate background when active tab changes
  useEffect(() => {
    const timer = setTimeout(() => {
      animateBackground(activeTab);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab, animateBackground]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      animateBackground(activeTab);
      if (activeContentRef.current) {
        setContainerHeight(activeContentRef.current.scrollHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab, animateBackground]);

  // Handle tab content animation
  useEffect(() => {
    if (!prevTab || !isAnimating) return;

    const prevEl = prevContentRef.current;
    const activeEl = activeContentRef.current;
    const containerEl = contentContainerRef.current;

    if (!prevEl || !activeEl || !containerEl) {
      setIsAnimating(false);
      setPrevTab(null);
      return;
    }

    const prevHeight = prevEl.scrollHeight;
    const activeHeight = activeEl.scrollHeight;
    const windowWidth = window.innerWidth;

    // Set container height to accommodate both contents
    gsap.set(containerEl, { height: Math.max(prevHeight, activeHeight) });

    // Set previous content to current position
    gsap.set(prevEl, { x: 0, opacity: 1 });

    // Set active content to slide in from full screen width
    const startX = slideDirection === "right" ? windowWidth : -windowWidth;
    gsap.set(activeEl, { x: startX, opacity: 1 });

    // Create timeline for smoother animation
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setPrevTab(null);
        setContainerHeight(activeHeight);
      },
    });

    // Animate: previous content slides out with full screen width
    tl.to(
      prevEl,
      {
        x: slideDirection === "right" ? -windowWidth : windowWidth,
        duration: 0.8,
        ease: "power2.inOut",
      },
      0
    );

    // Active content slides in with full screen width
    tl.to(
      activeEl,
      {
        x: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      0
    );

    // Update height smoothly
    tl.to(
      containerEl,
      {
        height: activeHeight,
        duration: 0.8,
        ease: "power2.inOut",
      },
      0
    );
  }, [activeTab, prevTab, isAnimating, slideDirection]);

  // Memoize sticky className to prevent recalculation
  const stickyClassName = useMemo(
    () =>
      `sticky z-50 transition-all duration-300 ${
        isStickyVisible ? "top-[2rem] xsm:top-0" : "top-[-5rem]"
      }`,
    [isStickyVisible]
  );

  return (
    <>
      <div className={stickyClassName}>
        <TabNavigation
          tabs={memoizedTabs}
          activeTab={activeTab}
          {...tabNavigationRefs}
          onTabClick={handleTabClick}
        />
      </div>
      <TabContent
        tabs={memoizedTabs}
        activeTab={activeTab}
        prevTab={prevTab}
        isAnimating={isAnimating}
        containerHeight={containerHeight}
        {...tabContentRefs}
      />
    </>
  );
}

export const AnimatedTabsCode = `
"use client";

import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { gsap } from "gsap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TabContent } from "./tab-content";
import { TabNavigation } from "./tab-navigation";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function AnimatedTabs({ tabs, defaultTab }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [prevTab, setPrevTab] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [isStickyVisible, setIsStickyVisible] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );

  // Memoize tabs to prevent unnecessary re-renders
  const memoizedTabs = useMemo(() => tabs, [tabs]);

  // Use useRef for all DOM references to prevent re-creation
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const backgroundRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevContentRef = useRef<HTMLDivElement>(null);
  const activeContentRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const stickyTabRef = useRef<HTMLDivElement>(null);
  const stickySentinelRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const stickyEndSentinelRef = useRef<HTMLDivElement>(null);

  const scrollDirection = useScrollDirection();

  // Memoize animateBackground function to prevent recreation on every render
  const animateBackground = useCallback((targetTab: string) => {
    const targetElement = tabsRef.current[targetTab];
    const backgroundElement = backgroundRef.current;
    const containerElement = containerRef.current;

    if (!targetElement || !backgroundElement || !containerElement) return;

    const containerRect = containerElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    const x = targetRect.left - containerRect.left;
    const width = targetRect.width;
    const height = targetRect.height;

    gsap.to(backgroundElement, {
      x,
      width,
      height,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  // Memoize handleTabClick to prevent recreation
  const handleTabClick = useCallback(
    (tabId: string) => {
      if (tabId === activeTab || isAnimating) return;

      // Determine slide direction based on tab order
      const currentIndex = memoizedTabs.findIndex(
        (tab) => tab.id === activeTab
      );
      const targetIndex = memoizedTabs.findIndex((tab) => tab.id === tabId);
      const direction = targetIndex > currentIndex ? "right" : "left";
      setSlideDirection(direction);

      setPrevTab(activeTab);
      setActiveTab(tabId);
      animateBackground(tabId);
      setIsAnimating(true);

      // Scroll to the content container instead of tab navigation
      if (contentContainerRef.current) {
        const rect = contentContainerRef.current.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetScrollTop = scrollTop + rect.top - 300;

        window.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      }
    },
    [activeTab, isAnimating, memoizedTabs, animateBackground]
  );

  // Memoize refs object to prevent recreation
  const tabNavigationRefs = useMemo(
    () => ({
      tabsRef,
      backgroundRef,
      containerRef,
      stickyTabRef,
      stickySentinelRef,
      stickyWrapperRef,
    }),
    []
  );

  const tabContentRefs = useMemo(
    () => ({
      prevContentRef,
      activeContentRef,
      contentContainerRef,
      stickyEndSentinelRef,
    }),
    []
  );

  // Handle scroll direction changes
  useEffect(() => {
    if (scrollDirection === "up") {
      setIsStickyVisible(false);
    } else if (scrollDirection === "down") {
      setIsStickyVisible(true);
    }
  }, [scrollDirection]);

  // Update container height when active tab changes
  useEffect(() => {
    const updateHeight = () => {
      if (activeContentRef.current) {
        setContainerHeight(activeContentRef.current.scrollHeight);
      }
    };
    const timer = setTimeout(updateHeight, 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Animate background when active tab changes
  useEffect(() => {
    const timer = setTimeout(() => {
      animateBackground(activeTab);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab, animateBackground]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      animateBackground(activeTab);
      if (activeContentRef.current) {
        setContainerHeight(activeContentRef.current.scrollHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab, animateBackground]);

  // Handle tab content animation
  useEffect(() => {
    if (!prevTab || !isAnimating) return;

    const prevEl = prevContentRef.current;
    const activeEl = activeContentRef.current;
    const containerEl = contentContainerRef.current;

    if (!prevEl || !activeEl || !containerEl) {
      setIsAnimating(false);
      setPrevTab(null);
      return;
    }

    const prevHeight = prevEl.scrollHeight;
    const activeHeight = activeEl.scrollHeight;
    const windowWidth = window.innerWidth;

    // Set container height to accommodate both contents
    gsap.set(containerEl, { height: Math.max(prevHeight, activeHeight) });

    // Set previous content to current position
    gsap.set(prevEl, { x: 0, opacity: 1 });

    // Set active content to slide in from full screen width
    const startX = slideDirection === "right" ? windowWidth : -windowWidth;
    gsap.set(activeEl, { x: startX, opacity: 1 });

    // Create timeline for smoother animation
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setPrevTab(null);
        setContainerHeight(activeHeight);
      },
    });

    // Animate: previous content slides out with full screen width
    tl.to(
      prevEl,
      {
        x: slideDirection === "right" ? -windowWidth : windowWidth,
        duration: 0.8,
        ease: "power2.inOut",
      },
      0
    );

    // Active content slides in with full screen width
    tl.to(
      activeEl,
      {
        x: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      0
    );

    // Update height smoothly
    tl.to(
      containerEl,
      {
        height: activeHeight,
        duration: 0.8,
        ease: "power2.inOut",
      },
      0
    );
  }, [activeTab, prevTab, isAnimating, slideDirection]);

  // Memoize sticky className to prevent recalculation
  const stickyClassName = useMemo(
    () =>
      "sticky z-50 transition-all duration-300 " +
      (isStickyVisible ? "top-[2rem] xsm:top-0" : "top-[-5rem]"),
    [isStickyVisible]
  );

  return (
    <>
      <div className={stickyClassName}>
        <TabNavigation
          tabs={memoizedTabs}
          activeTab={activeTab}
          {...tabNavigationRefs}
          onTabClick={handleTabClick}
        />
      </div>
      <TabContent
        tabs={memoizedTabs}
        activeTab={activeTab}
        prevTab={prevTab}
        isAnimating={isAnimating}
        containerHeight={containerHeight}
        {...tabContentRefs}
      />
    </>
  );
}
`;
