"use client";

import { useState } from "react";

export default function SocialV2() {
  const [isSharing, setIsSharing] = useState(false);

  const onShare = async () => {
    if (typeof window === "undefined" || !navigator.share || isSharing) return;
    setIsSharing(true);
    const shareData = {
      title: "Okhub components",
      text: "Okhub components",
      url: window.location.origin,
    };
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={onShare}
      className="p-[0.375rem] pl-[0.875rem] flex items-center space-x-2"
    >
      <span className="text-base font-light text-title-body xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]">
        Share on:
      </span>
      <div className="size-7 xsm:size-6 rounded-full bg-mint flex-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg>
      </div>
    </button>
  );
}

export const SocialV2Code = `
"use client";

import { useState } from "react";

export default function SocialV2() {
  const [isSharing, setIsSharing] = useState(false);

  const onShare = async () => {
    if (typeof window === "undefined" || !navigator.share || isSharing) return;
    setIsSharing(true);
    const shareData = {
      title: "Okhub components",
      text: "Okhub components",
      url: window.location.origin,
    };
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={onShare}
      className="p-[0.375rem] pl-[0.875rem] flex items-center space-x-2"
    >
      <span className="text-base font-light text-title-body xsm:text-[0.875rem] xsm:tracking-[-0.00875rem]">
        Share on:
      </span>
      <div className="size-7 xsm:size-6 rounded-full bg-mint flex-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg>
      </div>
    </button>
  );
}
`;
