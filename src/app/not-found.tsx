import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[72vh] items-center overflow-hidden bg-beige pt-[var(--header-h)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_10%,rgba(232,199,102,0.34),transparent_60%)]"
      />

      <Container className="relative py-24">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] text-d1 font-semibold text-ink">
          This page is <span className="text-gold-gradient">off the line.</span>
        </h1>
        <p className="mt-7 max-w-[46ch] text-lede text-warm-500">
          The page you were looking for has moved or never existed. The range,
          the services and the plant details are all still where you left them.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/products" variant="secondary" size="lg">
            Browse products
          </Button>
        </div>
      </Container>
    </section>
  );
}
