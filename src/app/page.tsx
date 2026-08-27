import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { HistoryVideo } from "@/components/sections/HistoryVideo";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Categories } from "@/components/sections/Categories";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { Certifications } from "@/components/sections/Certifications";
import { FeaturedServices } from "@/components/sections/FeaturedServices";
import { Gallery } from "@/components/sections/Gallery";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Noodle Manufacturing in Egypt",
  description:
    "Yummy Food manufactures instant, cup and dried noodles in Badr City, Egypt. Halal certified, batch-coded and packaged in four languages across three independent production lines.",
  alternates: { canonical: "/" },
};

/**
 * Homepage section order is an argument, not a list.
 *
 * Hero (promise) → Intro (who) → History (story) → Products (proof by
 * artefact) → Categories (scale of range) → Why us (differentiation) →
 * Process (how, builds trust) → Stats (consequence of that capability) →
 * Certifications (the gate) → Services (the higher-margin question) →
 * Gallery (emotional close) → CTA (decision).
 *
 * Each section is a doorway with one job; none tries to be complete, because
 * depth is always one click away.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <HistoryVideo />
      <FeaturedProducts />
      <Categories />
      <WhyUs />
      <Process />
      <Stats />
      <Certifications />
      <FeaturedServices />
      <Gallery />
      <CTA />
    </>
  );
}
