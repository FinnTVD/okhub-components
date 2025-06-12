/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MAX_COUNT = 100;
const MIN_COUNT = 0;

const CounterV1 = () => {
  const [count, setCount] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const counterContainerRef = useRef<HTMLDivElement>(null);
  const minusBtnRef = useRef<HTMLButtonElement | null>(null);
  const plusBtnRef = useRef<HTMLButtonElement | null>(null);

  const animateOut = (
    element: gsap.TweenTarget,
    direction: number,
    onComplete: { (): void; (): void; (): void; (): void; (): void }
  ) => {
    gsap.to(element, {
      y: direction === 1 ? -30 : 30,
      opacity: 0,
      filter: "blur(4px)",
      duration: 0.15,
      onComplete,
    });
  };

  const animateIn = (element: gsap.TweenTarget, direction: number) => {
    gsap.fromTo(
      element,
      { y: direction === 1 ? 30 : -30, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.15 }
    );
  };

  const updateCounterDisplay = (direction: number) => {
    const container = counterContainerRef.current;
    if (!container) return;

    const previousCount = container.textContent?.trim() || "";
    const prevLength = previousCount.length;
    const newLength = count.toString().length;

    const newContent =
      count < 10
        ? `<span class="text-4xl font-medium w-7">${count}</span>`
        : `<span class="text-4xl font-medium w-7">${Math.floor(
            count / 10
          )}</span><span class="text-4xl font-medium w-7">${count % 10}</span>`;

    const oldSpans = container.querySelectorAll("span");

    const onComplete = () => {
      container.innerHTML = newContent;
      const newSpans = container.querySelectorAll("span");

      if (prevLength === 1 && newLength > 1) {
        newSpans.forEach((span: any) => animateIn(span, direction));
      } else if (prevLength > 1 && newLength === 1) {
        animateIn(newSpans[0], direction);
      } else if (prevLength > 1 && newLength > 1) {
        const prevDecade = Math.floor((count - direction) / 10);
        const newDecade = Math.floor(count / 10);

        if (prevDecade !== newDecade) {
          newSpans.forEach((span: any) => animateIn(span, direction));
        } else {
          animateIn(newSpans[1], direction);
        }
      } else {
        newSpans.forEach((span: any) => animateIn(span, direction));
      }
    };

    if (prevLength === 1 && newLength > 1) {
      oldSpans.forEach((span: any) => animateOut(span, direction, onComplete));
    } else if (prevLength > 1 && newLength === 1) {
      oldSpans.forEach((span: any) => animateOut(span, direction, onComplete));
    } else if (prevLength > 1 && newLength > 1) {
      const prevDecade = Math.floor((count - direction) / 10);
      const newDecade = Math.floor(count / 10);

      if (prevDecade !== newDecade) {
        oldSpans.forEach((span: any) =>
          animateOut(span, direction, onComplete)
        );
      } else {
        animateOut(oldSpans[1], direction, onComplete);
      }
    } else {
      oldSpans.forEach((span: any) => animateOut(span, direction, onComplete));
    }
  };

  const toggleButtonState = () => {
    if (minusBtnRef.current) {
      minusBtnRef.current.classList.toggle("disabled", count === MIN_COUNT);
    }
    if (plusBtnRef.current) {
      plusBtnRef.current.classList.toggle("disabled", count === MAX_COUNT);
    }
  };

  const addBounceEffect = (elementRef: React.RefObject<HTMLElement | null>) => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      { x: 0 },
      {
        x: 5,
        duration: 0.05,
        yoyo: true,
        repeat: 5,
        onComplete: () => {
          if (elementRef.current) {
            gsap.to(elementRef.current, { x: 0 });
          }
          return; // Explicitly return void
        },
      }
    );
  };

  const handleMinus = () => {
    if (count > MIN_COUNT) {
      setCount((prev) => prev - 1);
      updateCounterDisplay(-1);
    } else {
      addBounceEffect(minusBtnRef);
    }
  };

  const handlePlus = () => {
    if (count < MAX_COUNT) {
      setCount((prev) => prev + 1);
      updateCounterDisplay(1);
    } else {
      addBounceEffect(plusBtnRef);
    }
  };

  useEffect(() => {
    updateCounterDisplay(1);
    toggleButtonState();
  }, [count]);

  return (
    <div className="flex flex-col items-center w-full z-10">
      <div className="w-full border-b border-dashed border-white/10"></div>
      <div className="w-full flex flex-col gap-8 justify-center items-center h-full max-w-lg mx-auto p-16 bg-zinc-900">
        <div className="flex items-center justify-center box" ref={boxRef}>
          <button
            className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center minus active:scale-90"
            onClick={handleMinus}
            ref={minusBtnRef}
          >
            <img src="/minus.svg" alt="minus" className="w-5" />
          </button>
          <div className="flex items-center justify-center mx-8 mt-1">
            <h3
              className="w-16 text-center flex items-center justify-center text-white shrink-0 counter-container"
              ref={counterContainerRef}
            >
              <span className="text-4xl font-medium w-7">{count}</span>
            </h3>
          </div>
          <button
            className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center plus active:scale-90"
            onClick={handlePlus}
            ref={plusBtnRef}
          >
            <img src="/plus.svg" alt="plus" className="w-5" />
          </button>
        </div>
        <p className="text-white/50">{MAX_COUNT} is the max number.</p>
      </div>
      <div className="w-full border-t border-dashed border-white/10"></div>
    </div>
  );
};

export default CounterV1;

export const CounterV1Code = `
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MAX_COUNT = 20;
const MIN_COUNT = 0;

const CounterV1 = () => {
  const [count, setCount] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const counterContainerRef = useRef<HTMLDivElement>(null);
  const minusBtnRef = useRef<HTMLButtonElement | null>(null);
  const plusBtnRef = useRef<HTMLButtonElement | null>(null);

  const animateOut = (
    element: gsap.TweenTarget,
    direction: number,
    onComplete: { (): void; (): void; (): void; (): void; (): void }
  ) => {
    gsap.to(element, {
      y: direction === 1 ? -30 : 30,
      opacity: 0,
      filter: "blur(4px)",
      duration: 0.15,
      onComplete,
    });
  };

  const animateIn = (element: gsap.TweenTarget, direction: number) => {
    gsap.fromTo(
      element,
      { y: direction === 1 ? 30 : -30, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.15 }
    );
  };

  const updateCounterDisplay = (direction: number) => {
    const container = counterContainerRef.current;
    if (!container) return;

    const previousCount = container.textContent?.trim() || "";
    const prevLength = previousCount.length;
    const newLength = count.toString().length;

    const newContent =
      count < 10
        ? \`<span class=\"text-4xl font-medium w-7\">\${count}</span>\`
        : \`<span class=\"text-4xl font-medium w-7\">\${Math.floor(
            count / 10
          )}</span><span class=\"text-4xl font-medium w-7\">\${count % 10}</span>\`;

    const oldSpans = container.querySelectorAll("span");

    const onComplete = () => {
      container.innerHTML = newContent;
      const newSpans = container.querySelectorAll("span");

      if (prevLength === 1 && newLength > 1) {
        newSpans.forEach((span: any) => animateIn(span, direction));
      } else if (prevLength > 1 && newLength === 1) {
        animateIn(newSpans[0], direction);
      } else if (prevLength > 1 && newLength > 1) {
        const prevDecade = Math.floor((count - direction) / 10);
        const newDecade = Math.floor(count / 10);

        if (prevDecade !== newDecade) {
          newSpans.forEach((span: any) => animateIn(span, direction));
        } else {
          animateIn(newSpans[1], direction);
        }
      } else {
        newSpans.forEach((span: any) => animateIn(span, direction));
      }
    };

    if (prevLength === 1 && newLength > 1) {
      oldSpans.forEach((span: any) => animateOut(span, direction, onComplete));
    } else if (prevLength > 1 && newLength === 1) {
      oldSpans.forEach((span: any) => animateOut(span, direction, onComplete));
    } else if (prevLength > 1 && newLength > 1) {
      const prevDecade = Math.floor((count - direction) / 10);
      const newDecade = Math.floor(count / 10);

      if (prevDecade !== newDecade) {
        oldSpans.forEach((span: any) =>
          animateOut(span, direction, onComplete)
        );
      } else {
        animateOut(oldSpans[1], direction, onComplete);
      }
    } else {
      oldSpans.forEach((span: any) => animateOut(span, direction, onComplete));
    }
  };

  const toggleButtonState = () => {
    if (minusBtnRef.current) {
      minusBtnRef.current.classList.toggle("disabled", count === MIN_COUNT);
    }
    if (plusBtnRef.current) {
      plusBtnRef.current.classList.toggle("disabled", count === MAX_COUNT);
    }
  };

  const addBounceEffect = (elementRef: React.RefObject<HTMLElement | null>) => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      { x: 0 },
      {
        x: 5,
        duration: 0.05,
        yoyo: true,
        repeat: 5,
        onComplete: () => {
          if (elementRef.current) {
            gsap.to(elementRef.current, { x: 0 });
          }
          return; // Explicitly return void
        },
      }
    );
  };

  const handleMinus = () => {
    if (count > MIN_COUNT) {
      setCount((prev) => prev - 1);
      updateCounterDisplay(-1);
    } else {
      addBounceEffect(minusBtnRef);
    }
  };

  const handlePlus = () => {
    if (count < MAX_COUNT) {
      setCount((prev) => prev + 1);
      updateCounterDisplay(1);
    } else {
      addBounceEffect(plusBtnRef);
    }
  };

  useEffect(() => {
    updateCounterDisplay(1);
    toggleButtonState();
  }, [count]);

  return (
    <div className=\"flex flex-col items-center w-full z-10\">
      <div className=\"w-full border-b border-dashed border-white/10\"></div>
      <div className=\"w-full flex flex-col gap-8 justify-center items-center h-full max-w-lg mx-auto p-16 bg-zinc-900\">
        <div className=\"flex items-center justify-center box\" ref={boxRef}>
          <button
            className=\"w-14 h-14 rounded-full bg-white/10 flex items-center justify-center minus active:scale-90\"
            onClick={handleMinus}
            ref={minusBtnRef}
          >
            <img src=\"/minus.svg\" alt=\"minus\" className=\"w-5\" />
          </button>
          <div className=\"flex items-center justify-center mx-8 mt-1\">
            <h3
              className=\"w-16 text-center flex items-center justify-center text-white shrink-0 counter-container\"
              ref={counterContainerRef}
            >
              <span className=\"text-4xl font-medium w-7\">{count}</span>
            </h3>
          </div>
          <button
            className=\"w-14 h-14 rounded-full bg-white/10 flex items-center justify-center plus active:scale-90\"
            onClick={handlePlus}
            ref={plusBtnRef}
          >
            <img src=\"/plus.svg\" alt=\"plus\" className=\"w-5\" />
          </button>
        </div>
        <p className=\"text-white/50\">{MAX_COUNT} is the max number.</p>
      </div>
      <div className=\"w-full border-t border-dashed border-white/10\"></div>
    </div>
  );
};

export default CounterV1;
`;
