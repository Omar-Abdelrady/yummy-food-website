"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/utils";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between children. 0.06–0.08 reads as intentional; more feels slow. */
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "section";
  amount?: number;
}

/**
 * Parent for staggered lists. Pair with `StaggerItem` children.
 * Falls back to a plain element under reduced motion.
 */
export function Stagger({
  children,
  className,
  gap = 0.07,
  delay = 0,
  as = "div",
  amount = 0.2,
}: StaggerProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "span";
  distance?: number;
}

export function StaggerItem({
  children,
  className,
  as = "div",
  distance = 24,
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: EASE },
        },
      }}
    >
      {children}
    </Component>
  );
}
