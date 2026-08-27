"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Play, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { MouseEvent } from "react";
import type { VideoCardItem } from "@/content";
import { cn, EASE } from "@/lib/utils";

interface YouTubeVideoCardProps {
  video: VideoCardItem;
}

export function YouTubeVideoCard({ video }: YouTubeVideoCardProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const titleId = useId();
  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`;

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        triggerRef.current?.focus();
      }
      wasOpen.current = false;
      return;
    }

    wasOpen.current = true;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeOnBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-label={`Watch ${video.title} by ${video.source}`}
        onClick={() => setOpen(true)}
        className={cn(
          "group relative flex h-full w-full min-h-[19rem] overflow-hidden rounded-xl3 text-left transition-all duration-700 ease-brand hover:-translate-y-1.5 hover:shadow-[0_32px_70px_-35px_rgba(11,11,12,0.6)] focus-visible:outline-offset-4 lg:min-h-0",
          video.className,
        )}
      >
        <Image
          src={video.thumbnail}
          alt={`${video.title} video thumbnail`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-brand group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.05)_15%,rgba(11,11,12,0.78)_100%)]"
        />

        <span className="absolute left-6 top-6 inline-flex rounded-full border border-white/20 bg-ink/30 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md lg:left-8 lg:top-8">
          {video.number}
        </span>

        <span className="absolute right-6 top-6 inline-flex size-12 items-center justify-center rounded-full border border-gold-300/60 bg-gold-500 text-ink shadow-[0_10px_28px_-10px_rgba(201,162,39,0.8)] transition-transform duration-500 ease-brand group-hover:scale-110 lg:right-8 lg:top-8">
          <Play className="ml-0.5 size-4 fill-current" strokeWidth={1.5} />
        </span>

        <span className="relative mt-auto flex w-full flex-col p-6 lg:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
            {video.label}
          </span>
          <span className="mt-2 font-display text-2xl font-semibold leading-tight text-white lg:text-3xl">
            {video.title}
          </span>
          <span className="mt-2 text-sm text-warm-200">By {video.source}</span>
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink/85 p-4 backdrop-blur-md sm:p-8"
            onClick={closeOnBackdrop}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative my-auto w-full max-w-5xl overflow-hidden rounded-xl3 border border-white/15 bg-charcoal shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]"
            >
              <div className="flex items-start justify-between gap-6 border-b border-white/10 px-5 py-5 sm:px-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
                    Now playing
                  </p>
                  <h2 id={titleId} className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">
                    {video.title}
                  </h2>
                  <p className="mt-1 text-sm text-warm-300">By {video.source}</p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close video"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors duration-300 hover:border-gold-300/60 hover:text-gold-300"
                >
                  <X className="size-5" strokeWidth={1.6} />
                </button>
              </div>

              <div className="aspect-video w-full bg-black">
                <iframe
                  src={embedUrl}
                  title={`${video.title} by ${video.source}`}
                  className="size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-7">
                <p className="text-xs text-warm-400">Recipe inspiration from {video.source}.</p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-gold-300 transition-colors duration-300 hover:text-gold-200"
                >
                  Open on YouTube
                  <ExternalLink className="size-3.5" strokeWidth={1.8} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
