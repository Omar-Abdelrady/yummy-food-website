import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { YouTubeVideoCard } from "@/components/video/YouTubeVideoCard";
import { companyHistoryVideo } from "@/content";

export function HistoryVideo() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_100%_0%,rgba(201,162,39,0.18),transparent_62%)]"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <SectionHeading
            tone="dark"
            eyebrow="Company history"
            title="A bowl with a story behind it."
            highlight={["story", "behind", "it."]}
            lede="Every pack begins with a reason to make something people can come back to. Press play for a look at the story behind the bowl."
          />

          <Reveal delay={0.12} className="min-w-0">
            <YouTubeVideoCard video={companyHistoryVideo} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
