"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MouseGlowProps {
  className?: string;
  /** Radius of the glow in pixels. */
  size?: number;
  /** 0–1. Kept low; a bright glow reads as a novelty rather than lighting. */
  opacity?: number;
}

/**
 * Cursor-following gold glow.
 *
 * Scoped to the hero only, so it stays an event rather than a gimmick that
 * follows you down the page. Spring-damped so it trails the cursor slightly —
 * an instant follow feels mechanical, a slow trail feels like light.
 */
export function MouseGlow({
  className,
  size = 460,
  opacity = 0.16,
}: MouseGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const config = { stiffness: 90, damping: 22, mass: 0.7 };
  const x = useSpring(useMotionValue(-9999), config);
  const y = useSpring(useMotionValue(-9999), config);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, rgba(201,162,39,${opacity}), transparent 68%)`;

  useEffect(() => {
    if (reduced) return;
    const element = ref.current?.parentElement;
    if (!element) return;

    function handleMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      const rect = element!.getBoundingClientRect();
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    }

    function handleLeave() {
      x.set(-9999);
      y.set(-9999);
    }

    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerleave", handleLeave);
    return () => {
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);
    };
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 hidden lg:block",
        className,
      )}
      style={{ background }}
    />
  );
}
