import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { asset } from "@/lib/utils";

/**
 * Gallery.
 *
 * Atmosphere and scale by accumulation — the emotional counterweight to the
 * spec-heavy sections above, and the last thing a consumer visitor sees before
 * deciding whether the brand feels substantial.
 *
 * The grid is deliberately asymmetric with varying parallax rates: an even grid
 * of equal tiles reads as a stock template, while a composed one reads as art
 * direction. Tiles are sized by column span so the asymmetry survives the
 * responsive collapse instead of falling apart at tablet width.
 */
const tiles = [
  {
    src: "/products/spicy-beef-noodles.png",
    alt: "Spicy beef instant noodle sachet",
    className: "sm:col-span-3 lg:col-span-5 lg:row-span-2",
    aspect: "aspect-4/3 lg:aspect-auto lg:h-full",
    parallax: 24,
    tone: "bg-beige",
  },
  {
    src: "/products/braised-beef-noodles-cup.png",
    alt: "Braised beef cup noodles",
    className: "sm:col-span-3 lg:col-span-4",
    aspect: "aspect-4/3",
    parallax: 52,
    tone: "bg-charcoal",
  },
  {
    src: "/products/wenzhou-noodles-red.png",
    alt: "WenZhou handmade dried noodles in festive red packaging",
    className: "sm:col-span-2 lg:col-span-3",
    aspect: "aspect-3/4",
    parallax: 70,
    tone: "bg-beige-deep",
  },
  {
    src: "/products/vegetable-noodles.png",
    alt: "Vegetable instant noodle sachet",
    className: "sm:col-span-2 lg:col-span-4",
    aspect: "aspect-4/3",
    parallax: 38,
    tone: "bg-beige-deep",
  },
  {
    src: "/products/egg-noodles.png",
    alt: "Handmade dried egg noodles",
    className: "sm:col-span-2 lg:col-span-3",
    aspect: "aspect-4/3 lg:aspect-3/4",
    parallax: 60,
    tone: "bg-beige",
  },
];

export function Gallery() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="The range"
          title="Ten packs, four languages, one shelf."
          lede="Every product we make, photographed as it ships."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-6 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          {tiles.map((tile, i) => (
            <Reveal
              key={tile.src + i}
              delay={i * 0.07}
              className={tile.className}
            >
              <figure
                className={`group relative h-full overflow-hidden rounded-xl3 ${tile.tone} ${tile.aspect}`}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_105%,rgba(201,162,39,0.2),transparent_62%)]"
                />
                {/* The parallax plane is inset negatively so that translating
                    it never exposes the tile background at the edges. */}
                <Parallax
                  distance={tile.parallax}
                  className="absolute -inset-y-[12%] inset-x-0"
                >
                  <Image
                    src={asset(tile.src)}
                    alt={tile.alt}
                    fill
                    sizes="(min-width:1024px) 40vw, (min-width:640px) 50vw, 90vw"
                    className="object-contain p-8 transition-transform duration-[900ms] ease-brand group-hover:scale-[1.05] lg:p-12"
                  />
                </Parallax>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
