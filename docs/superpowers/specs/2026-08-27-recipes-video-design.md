# Recipes Video Experience Design

## Goal

Add a `/recipes` page that presents YouTube recipe-video cards in the existing Yummy Food visual language. Clicking a card opens a polished, accessible YouTube iframe lightbox. Reuse the same video-card/lightbox component for a company-history section on the homepage, using the supplied video at the user's direction while keeping the original creator attribution visible.

## Confirmed video

- YouTube URL: `https://www.youtube.com/watch?v=xlg-fWC3GzA`
- Video ID: `xlg-fWC3GzA`
- Public title: `Chinese Noodle Soup`
- Public creator: `RecipeTin Eats`
- Thumbnail: `https://i.ytimg.com/vi/xlg-fWC3GzA/hqdefault.jpg`

The supplied video is used for the recipes page and the homepage company-history section at the user's direction. The card and lightbox continue to identify RecipeTin Eats as the source.

## Options considered

1. **Reusable lightbox (recommended).** Recipe cards show a thumbnail and play affordance; clicking opens one responsive dark modal containing the iframe. The iframe is mounted only while open. This gives the strongest presentation, avoids multiple active iframes, and works with a static Next.js export.
2. **Inline expansion.** The clicked card replaces its thumbnail with an iframe. This is simpler, but produces inconsistent card heights and can leave many heavy embeds on one page.
3. **External YouTube link.** This is lightest, but does not satisfy the iframe requirement or keep visitors in the site experience.

## Architecture

- `src/content/videos.ts` owns the verified video ID, title, creator, and recipe-card presentation data.
- `src/components/video/YouTubeVideoCard.tsx` is a client component responsible for the clickable card and its lightbox state. It renders the iframe only when open, closes on backdrop click and Escape, and exposes accessible dialog/button labels.
- `src/app/recipes/page.tsx` composes the shared `PageHeader`, a responsive editorial card grid, and a closing CTA using existing site components and tokens.
- `src/lib/utils.ts` adds `/recipes` to the primary navigation.
- `src/app/sitemap.ts` adds the `/recipes` route to generated metadata.
- `src/components/sections/HistoryVideo.tsx` renders the supplied video on the homepage after the intro section, using the same card/lightbox component.

## Visual behavior

- The page uses the established beige page header, charcoal/gold feature treatment, warm-gray copy, `rounded-xl3` cards, and Framer Motion reveal/stagger primitives.
- The recipe grid uses one larger featured card plus smaller supporting cards, with varied spans and consistent aspect ratios so the repeated source video still feels like an editorial collection rather than duplicated embeds.
- Every card uses the verified title “Chinese Noodle Soup” and identifies the source as RecipeTin Eats; presentation labels may vary, but no invented recipe claims are shown.
- The lightbox uses a near-black backdrop, centered responsive 16:9 iframe, gold-accent close control, and a visible title/source context.
- On small screens the dialog has safe viewport padding and a full-width iframe; on larger screens it is capped to a comfortable reading width.

## Accessibility and behavior

- Cards are semantic buttons with visible focus states and descriptive accessible names.
- The modal uses `role="dialog"`, `aria-modal="true"`, an associated title, a labeled close button, and Escape/backdrop close behavior.
- The iframe includes `title`, `allow`, `allowFullScreen`, and a strict referrer policy.
- `prefers-reduced-motion` is respected by using existing motion primitives and avoiding required animation for content visibility.
- No server actions, API routes, or runtime data are introduced; the feature remains compatible with GitHub Pages static export.

## Testing and acceptance

- `npm run lint` passes.
- `npm run build` passes with the existing static-export configuration.
- The generated export contains `/recipes/index.html`.
- The recipe link appears in desktop and mobile navigation and in the sitemap.
- A card opens the YouTube iframe, Escape and the close button dismiss it, and the page remains usable on narrow screens.
- The homepage history section uses the supplied video as requested and keeps the RecipeTin Eats source attribution visible in the card and lightbox.
