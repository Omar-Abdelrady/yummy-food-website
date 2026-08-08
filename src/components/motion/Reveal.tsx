"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  /** Seconds. Use with `Stagger` sparingly — prefer Stagger for lists. */
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "article" | "header";
  /** Fires once by default — re-animating on every scroll pass looks cheap. */
  once?: boolean;
  amount?: number;
}

/**
 * Scroll reveal.
 *
 * Under `prefers-reduced-motion` this renders a plain element with no transform
 * and no opacity animation, so content is present immediately rather than
 * hidden behind a transition that never runs.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  direction = "up",
  className,
  as = "div",
  once = true,
  amount = 0.25,
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const { x, y } = offset[direction];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}
