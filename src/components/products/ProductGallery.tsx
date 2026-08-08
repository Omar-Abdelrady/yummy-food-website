"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Tilt } from "@/components/motion/Tilt";
import { cn, EASE } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

/**
 * Product imagery with thumbnails.
 *
 * The product *is* the packaging for this audience — a buyer judges shelf
 * presence before they read a spec — so the image gets the largest single block
 * on the page. Pointer tilt makes the flat cut-out behave like a physical
 * object without the cost of a WebGL bundle.
 */
export function ProductGallery({ images, name }: ProductGalleryProps) {
  const unique = Array.from(new Set(images));
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  return (
    <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
      <Tilt className="w-full" max={6} lift={18}>
        <div className="relative aspect-square overflow-hidden rounded-xl4 border border-ink/8 bg-beige">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(110%_85%_at_50%_108%,rgba(201,162,39,0.24),transparent_62%)]"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={unique[index]}
              initial={reduced ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 1.015 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={unique[index]}
                alt={`${name} packaging`}
                fill
                priority
                sizes="(min-width:1024px) 46vw, 92vw"
                className="object-contain p-10 drop-shadow-[0_28px_44px_rgba(11,11,12,0.18)] lg:p-14"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </Tilt>

      {unique.length > 1 ? (
        <div
          role="group"
          aria-label={`${name} images`}
          className="mt-4 flex gap-3"
        >
          {unique.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1} of ${unique.length}`}
              aria-pressed={i === index}
              className={cn(
                "relative aspect-square w-20 overflow-hidden rounded-xl2 border bg-beige transition-all duration-400 ease-brand hover:-translate-y-0.5 sm:w-24",
                i === index
                  ? "border-gold-400/70 shadow-[0_0_0_1px_rgba(201,162,39,0.3)]"
                  : "border-ink/8 opacity-65 hover:opacity-100",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-contain p-2.5"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
