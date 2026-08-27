"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { YouTubeVideoCard } from "@/components/video/YouTubeVideoCard";
import type { RecipeVideoCard } from "@/content";
import { cn } from "@/lib/utils";

interface RecipeVideoGalleryProps {
  videos: RecipeVideoCard[];
  pageSize?: number;
}

export function RecipeVideoGallery({
  videos,
  pageSize = 6,
}: RecipeVideoGalleryProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(videos.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const visibleVideos = videos.slice(startIndex, startIndex + pageSize);

  const goToPage = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  return (
    <>
      <Stagger
        key={page}
        className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:auto-rows-[16rem] lg:gap-5"
      >
        {visibleVideos.map((video) => (
          <StaggerItem
            key={`${page}-${video.id}-${video.number}`}
            className={cn("h-full", video.className)}
          >
            <YouTubeVideoCard video={video} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col gap-6 border-t border-ink/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p aria-live="polite" className="text-sm text-warm-500">
            Showing {startIndex + 1}–{Math.min(startIndex + pageSize, videos.length)} of {videos.length} videos
          </p>

          <nav aria-label="Recipe pages" className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
              className="inline-flex size-10 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors duration-300 hover:border-gold-400/60 hover:text-gold-700 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="size-4" strokeWidth={1.8} />
            </button>

            <div className="flex items-center gap-1" aria-label="Page numbers">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const active = pageNumber === page;

                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => goToPage(pageNumber)}
                    aria-current={active ? "page" : undefined}
                    aria-label={`Go to page ${pageNumber}`}
                    className={cn(
                      "inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300",
                      active
                        ? "bg-ink text-white"
                        : "text-warm-500 hover:bg-beige hover:text-ink",
                    )}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
              className="inline-flex size-10 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors duration-300 hover:border-gold-400/60 hover:text-gold-700 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="size-4" strokeWidth={1.8} />
            </button>
          </nav>
        </div>
      </Reveal>
    </>
  );
}
