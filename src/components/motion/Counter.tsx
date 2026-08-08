"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Milliseconds. Kept short — a long count reads as a loading state. */
  duration?: number;
  className?: string;
  decimals?: number;
}

/**
 * Number counter.
 *
 * Uses rAF rather than a spring so the curve is a clean ease-out with a
 * guaranteed exact landing on `value` — springs overshoot, which looks like a
 * bug on a statistic. Under reduced motion the final value renders immediately.
 */
export function Counter({
  value,
  prefix,
  suffix,
  duration = 1600,
  className,
  decimals = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    // Under reduced motion the initial state is already `value`, so there is
    // nothing to animate and nothing to set.
    if (!inView || reduced) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, settles precisely.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(value * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
