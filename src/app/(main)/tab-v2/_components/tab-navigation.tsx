"use client";

import { cn } from "@/lib/utils";
import { RefObject, memo, useCallback } from "react";
import { Tab } from "./animated-tabs";

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  tabsRef: RefObject<{ [key: string]: HTMLButtonElement | null }>;
  backgroundRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  stickyTabRef: RefObject<HTMLDivElement>;
  stickySentinelRef: RefObject<HTMLDivElement>;
  stickyWrapperRef: RefObject<HTMLDivElement>;
  onTabClick: (tabId: string) => void;
  isStickyVisible?: boolean;
}

function TabNavigationComponent({
  tabs,
  activeTab,
  tabsRef,
  backgroundRef,
  containerRef,
  stickyTabRef,
  stickySentinelRef,
  stickyWrapperRef,
  onTabClick,
}: TabNavigationProps) {
  // Memoize tab click handler to prevent recreation
  const handleTabClick = useCallback(
    (tabId: string) => {
      onTabClick(tabId);
    },
    [onTabClick]
  );

  // Memoize tab ref setter to prevent recreation
  const setTabRef = useCallback(
    (el: HTMLButtonElement | null, tabId: string) => {
      if (tabsRef.current) {
        tabsRef.current[tabId] = el;
      }
    },
    [tabsRef]
  );

  return (
    <div ref={stickyWrapperRef}>
      <div ref={stickySentinelRef} />
      <div ref={stickyTabRef} className="transition-all duration-300 z-50">
        <div className="max-w-[87.25rem] xsm:max-w-full xsm:overflow-auto mx-auto rounded-[1rem] xsm:rounded-none border border-[#0000000A] shadow-[8px_8px_16px_0px_rgba(138,138,138,0.08),2px_3px_9px_0px_rgba(138,138,138,0.08)] p-1 hidden_scroll bg-white">
          <div
            ref={containerRef}
            className="flex space-x-1 rounded-[10rem] xsm:rounded-none w-full bg-white relative h-full"
          >
            <div
              ref={backgroundRef}
              className="absolute inset-0 bg-[#323A59] transition-none rounded-[1rem] xsm:rounded-none"
              style={{ width: 0, height: 0 }}
            />
            {tabs.map((tab) => (
              <button
                key={tab.id}
                ref={(el) => setTabRef(el, tab.id)}
                onClick={() => handleTabClick(tab.id)}
                className={cn(
                  "relative z-10 flex-1 rounded-md px-[0.75rem] py-[1.2rem] text-sm font-medium transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer xsm:whitespace-nowrap xsm:py-[1rem] xsm:w-[11.5rem] xsm:flex-none",
                  activeTab === tab.id
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Export memoized component
export const TabNavigation = memo(TabNavigationComponent);
