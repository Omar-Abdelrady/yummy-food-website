"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. Above ~10 it stops looking like an object. */
  max?: number;
  /** Pixels the content lifts toward the viewer on hover. */
  lift?: number;
}

/**
 * Pointer-tracking 3D tilt.
 *
 * Used on product imagery to make a flat PNG behave like a physical object —
 * the "subtle 3D" requirement met with two CSS transforms rather than a WebGL
 * bundle. Disabled under reduced motion and inert on touch (no hover, and
 * pointer events never fire on tap-scroll).
 */
export function Tilt({ children, className, max = 7, lift = 24 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const config = { stiffness: 150, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), config);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), config);
  const translateZ = useSpring(0, config);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleEnter(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    translateZ.set(lift);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
    translateZ.set(0);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("perspective-1200", className)}>
      <motion.div
        className="preserve-3d h-full w-full"
        style={{ rotateX, rotateY, translateZ }}
        onPointerMove={handleMove}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}
