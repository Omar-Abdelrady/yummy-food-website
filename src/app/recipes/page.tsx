import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CTA } from "@/components/sections/CTA";
import { YouTubeVideoCard } from "@/components/video/YouTubeVideoCard";
import { recipeVideoCards } from "@/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Watch noodle recipe inspiration and discover new ways to bring a warm bowl to the table with Yummy Food.",
  alternates: { canonical: "/recipes" },
};

export default function RecipesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recipe inspiration"
        title="Good noodles start with a good bowl."
        highlight={["Good", "good", "bowl."]}
        lede="A simple bowl, a little patience and the right noodles. Press play for inspiration that turns a familiar pack into something worth sharing."
        crumbs={[{ label: "Home", href: "/" }, { label: "Recipes" }]}
      />

      <section className="bg-white pb-24 pt-16 lg:pb-32 lg:pt-20">
        <Container size="wide">
          <SectionHeading
            eyebrow="From pack to bowl"
            title="A little inspiration for the next serving."
            highlight={["inspiration", "serving."]}
            lede="Explore a warm, generous noodle bowl from RecipeTin Eats. Every card opens the full recipe video when you are ready to cook."
          />

          <Stagger className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:auto-rows-[16rem] lg:gap-5">
            {recipeVideoCards.map((video) => (
              <StaggerItem
                key={`${video.id}-${video.number}`}
                className={cn("h-full", video.className)}
              >
                <YouTubeVideoCard video={video} />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-10 max-w-[54ch] text-center text-sm leading-relaxed text-warm-400">
              The video featured here is published by RecipeTin Eats. Visit the
              original YouTube page from the player for the full recipe and
              creator details.
            </p>
          </Reveal>
        </Container>
      </section>

      <CTA
        eyebrow="Make your next move"
        title="Ready to make a noodle range of your own?"
        highlight={["noodle", "range", "of", "your", "own?"]}
        lede="From a proven format to a private-label brief, tell us what you want to put on the table and we will help you find the right route forward."
      />
    </>
  );
}
