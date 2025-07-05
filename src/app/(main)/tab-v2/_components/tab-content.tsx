"use client";

import { cn } from "@/lib/utils";
import { RefObject, memo, useMemo } from "react";
import { Tab } from "./animated-tabs";

interface TabContentProps {
  tabs: Tab[];
  activeTab: string;
  prevTab: string | null;
  isAnimating: boolean;
  containerHeight: number;
  prevContentRef: RefObject<HTMLDivElement>;
  activeContentRef: RefObject<HTMLDivElement>;
  contentContainerRef: RefObject<HTMLDivElement>;
  stickyEndSentinelRef: RefObject<HTMLDivElement>;
}

// Memoized content wrapper to prevent unnecessary re-renders
const MemoizedContent = memo(({ content }: { content: React.ReactNode }) => {
  return <>{content}</>;
});

MemoizedContent.displayName = "MemoizedContent";

function TabContentComponent({
  tabs,
  activeTab,
  prevTab,
  isAnimating,
  containerHeight,
  prevContentRef,
  activeContentRef,
  contentContainerRef,
  stickyEndSentinelRef,
}: TabContentProps) {
  // Memoize tab data to prevent recalculation
  const activeTabData = useMemo(
    () => tabs.find((tab) => tab.id === activeTab),
    [tabs, activeTab]
  );

  const prevTabData = useMemo(
    () => (prevTab ? tabs.find((tab) => tab.id === prevTab) : null),
    [tabs, prevTab]
  );

  // Memoize container style to prevent recalculation
  const containerStyle = useMemo(
    () => ({
      height: isAnimating ? containerHeight : "auto",
    }),
    [isAnimating, containerHeight]
  );

  // Memoize active content className to prevent recalculation
  const activeContentClassName = useMemo(
    () =>
      cn(isAnimating ? "absolute top-0 left-0 w-full " : "relative", "z-[2]"),
    [isAnimating]
  );

  // Memoize active content to prevent re-rendering
  const memoizedActiveContent = useMemo(() => {
    return activeTabData?.content;
  }, [activeTabData?.content]);

  // Memoize previous content to prevent re-rendering
  const memoizedPrevContent = useMemo(() => {
    return prevTabData?.content;
  }, [prevTabData?.content]);

  return (
    <div className="py-[4rem] xsm:bg-none xsm:py-[1rem]">
      <div
        className="w-full relative overflow-hidden"
        ref={contentContainerRef}
        style={containerStyle}
      >
        {isAnimating && prevTabData && (
          <div
            ref={prevContentRef}
            className="absolute top-0 left-0 w-full z-[1]"
          >
            <div className="max-w-[87.25rem] xsm:max-w-full mx-auto xsm:px-[0.75rem]">
              <MemoizedContent content={memoizedPrevContent} />
            </div>
          </div>
        )}
        <div ref={activeContentRef} className={activeContentClassName}>
          <div className="max-w-[87.25rem] xsm:max-w-full mx-auto xsm:px-[0.75rem]">
            <MemoizedContent content={memoizedActiveContent} />
          </div>
        </div>
      </div>
      <div ref={stickyEndSentinelRef} />
    </div>
  );
}

// Export memoized component
export const TabContent = memo(TabContentComponent);
