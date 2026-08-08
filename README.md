# Yummy Food — Corporate Website

A static corporate presentation site for **Kang Shi Fu Yummy Food Ltd, Co.**, a
noodle manufacturer in Badr City, Egypt.

Not e-commerce: no cart, no checkout, no prices, no authentication, no database.
The commercial goal is to make an enquiry easy for wholesale buyers, private
label clients and OEM partners.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion | Framer Motion |
| Icons | lucide-react + inline SVG brand marks |
| Fonts | Inter Tight (display) + Inter (body), self-hosted via `next/font` |

GSAP is deliberately not used — nothing in this build needs a timeline engine,
and omitting it keeps the JS payload down.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export of 25 prerendered pages
npm run lint
```

## Structure

```
docs/UX-STRATEGY.md      Sitemap, user flows, IA, wireframes, section rationale
src/
├── app/                 Routes. Every page is a server component.
│   ├── page.tsx                  Home
│   ├── about/ contact/           Static pages
│   ├── products/[slug]/          10 prerendered products
│   ├── services/[slug]/          5 prerendered services
│   └── sitemap.ts robots.ts      Generated from the content layer
├── content/             ← THE CMS SEAM. All copy lives here.
│   ├── company.ts products.ts services.ts categories.ts types.ts
│   └── index.ts         Repository: getProducts(), getProductBySlug(), …
├── components/
│   ├── layout/          Header, Footer, ScrollProgress
│   ├── ui/              Button, Badge, Container, ProductCard, PageHeader, …
│   ├── motion/          Reveal, Stagger, Counter, TextReveal, Parallax, Tilt,
│   │                    MouseGlow
│   ├── sections/        Home page sections
│   ├── products/ services/ contact/   Route-specific components
└── lib/utils.ts         cn(), site config, navigation, contactLink()
```

## Migrating to a CMS

Pages and sections import **only** from `src/content/index.ts`, never from the
raw data files. To move to a headless CMS:

1. Change the bodies of the repository functions in `src/content/index.ts` to
   fetch, and make them `async`.
2. `await` them at the (already async) page components.

No component prop signature changes. Field names are deliberately CMS-shaped
(`slug`, `title`, `excerpt`, `body`, `order`, `featured`, `seo`).

## Content accuracy

Everything specific on this site was read off the supplied packaging
photography — company legal name, plant address, registration number
(1546/2011), GS1 prefix, halal seal, 9-month shelf life, and the nutrition panel
(72% flour extraction, 12.1% protein, 367.2 kcal/100 g).

**Before launch, search the codebase for `TODO(client)`.** Those mark the values
that were *not* on the packaging and need confirming:

- Phone numbers and email addresses
- Social media profile URLs
- Carton quantities and pallet configurations
- Team member names and roles
- Dried-noodle shelf life (12 months assumed)

Certifications are split deliberately. `verified: true` entries (Halal, EOS,
GS1) are evidenced on-pack and render an "On pack" mark. ISO 22000, HACCP and
GMP are `verified: false` — confirm the certificates or delete the entries
rather than shipping an unsupported compliance claim.

## Design system

Tokens live in `src/app/globals.css` under `@theme`.

- **Gold** `#C9A227` — taken from the logo gradient. Used as accent and light,
  never as a large flat fill; large gold areas read as budget, gold hairlines
  and gradients on black read as expensive.
- **Ink** `#0B0B0C`, **warm gray** `#6B6862`, **beige** `#F6F1E7`
- **Type** — fluid `clamp()` display scale `text-d1`…`text-d4` plus `text-lede`
- **Radii** — `rounded-xl2/xl3/xl4` (20/28/36px)
- **Motion** — one shared curve, `--ease-brand` / `EASE`

> **Note:** custom `text-d*` and `rounded-xl*` utilities are registered with
> `tailwind-merge` in `src/lib/utils.ts`. Without that registration, `cn()`
> classifies `text-d2` as a *colour* utility and a sibling `text-ink` silently
> removes it, flattening headings to body size. Add any new custom size or
> radius utility to that config.

## Accessibility

- Every reveal animation's end state is **visible**, so content is never hidden
  if JS fails; `prefers-reduced-motion` collapses transforms rather than
  hiding elements.
- Skip link, visible gold focus rings, `aria-current` on active nav,
  `aria-expanded`/`aria-controls` on the mobile drawer, live regions on the
  product filter and contact form.
- Verified: no page scrolls horizontally at 390px width.

## The contact form

Static site, so there is no backend. Submitting composes a `mailto:` with the
form contents and hands off to the user's mail client. Native validation runs
first, so nothing malformed reaches the draft.

The form pre-fills from the URL: `/contact?subject=<type>&ref=<slug>` — used by
every product and service CTA so a buyer never retypes what they were looking
at. To move to a real endpoint, replace `handleSubmit` in
`src/components/contact/ContactForm.tsx`.

## Before deploying

Set the canonical origin, which drives metadata, Open Graph, sitemap and
JSON-LD:

```bash
NEXT_PUBLIC_SITE_URL=https://yummyfood-eg.com
```

Product photography currently doubles as Open Graph imagery. A dedicated
1200×630 OG image would present better when links are shared.
