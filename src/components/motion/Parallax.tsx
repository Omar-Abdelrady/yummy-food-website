"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Pixels of travel across the full scroll pass. Keep under ~120. */
  distance?: number;
  className?: string;
  /** Horizontal parallax instead of vertical — used by the gallery. */
  axis?: "y" | "x";
}

/**
 * Scroll parallax.
 *
 * Deliberately small travel distances: parallax that moves more than ~120px
 * stops reading as depth and starts reading as a glitch. Disabled entirely
 * under reduced motion.
 */
export function Parallax({
  children,
  distance = 70,
  className,
  axis = "y",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const move = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={axis === "y" ? { y: move } : { x: move }}
    >
      {children}
    </motion.div>
  );
}
