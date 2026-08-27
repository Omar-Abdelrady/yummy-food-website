# Recipes Video Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a static-compatible `/recipes` page with reusable YouTube thumbnail cards that open an accessible iframe lightbox, using the supplied Chinese Noodle Soup video.

**Architecture:** Keep video metadata in the content layer, render the recipes route as a server component, and isolate browser-only lightbox state in one client component. The same component will be available for a future homepage company-history video, but the supplied RecipeTin Eats video will not be used or labeled as company history.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react, static export for GitHub Pages.

## Global Constraints

- The supplied video ID is `xlg-fWC3GzA`, with public title `Chinese Noodle Soup` and creator `RecipeTin Eats`.
- The recipe page uses the existing beige/ink/gold design system, `PageHeader`, `Container`, `Reveal`/`Stagger`, and custom `rounded-xl3`/display tokens.
- The iframe is mounted only while its lightbox is open; recipe cards never load several active YouTube players at once.
- The lightbox must support a visible close button, Escape, backdrop click, semantic dialog labeling, and strict iframe permissions/referrer policy.
- No server actions, API routes, or runtime data are introduced; the result must work with the existing `output: "export"` build.
- Do not modify or stage the existing unrelated `.vscode/settings.json`, `pnpm-lock.yaml`, or `pnpm-workspace.yaml` changes.

---

### Task 1: Add verified recipe video content and route discoverability

**Files:**
- Create: `src/content/videos.ts`
- Modify: `src/content/index.ts`
- Modify: `src/lib/utils.ts`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Produces `VideoItem`, `recipeVideo`, and `recipeVideoCards` from `src/content/videos.ts` for the route and video-card component.
- Keeps the existing `navigation` array and sitemap route shapes intact while adding `/recipes`.

- [ ] **Step 1: Define the content contract and verified source data**

  Create `src/content/videos.ts` with:

  ```ts
  export interface VideoItem {
    id: string;
    title: string;
    source: string;
    thumbnail: string;
  }

  export interface RecipeVideoCard extends VideoItem {
    label: string;
    number: string;
    className: string;
  }

  export const recipeVideo: VideoItem = {
    id: "xlg-fWC3GzA",
    title: "Chinese Noodle Soup",
    source: "RecipeTin Eats",
    thumbnail: "https://i.ytimg.com/vi/xlg-fWC3GzA/hqdefault.jpg",
  };

  export const recipeVideoCards: RecipeVideoCard[] = [
    { ...recipeVideo, label: "Recipe watch", number: "01", className: "lg:col-span-7 lg:row-span-2" },
    { ...recipeVideo, label: "Broth & noodles", number: "02", className: "lg:col-span-5" },
    { ...recipeVideo, label: "A warm bowl", number: "03", className: "lg:col-span-5" },
    { ...recipeVideo, label: "Kitchen inspiration", number: "04", className: "lg:col-span-4" },
    { ...recipeVideo, label: "Made to share", number: "05", className: "lg:col-span-4" },
    { ...recipeVideo, label: "Watch again", number: "06", className: "lg:col-span-4" },
  ];
  ```

  Keep every card’s title/source accurate to the one supplied video; the labels are presentation labels, not claims that the source contains six different recipes.

- [ ] **Step 2: Export the video data through the content seam**

  In `src/content/index.ts`, import `recipeVideo`, `recipeVideoCards`, and their types from `./videos`, then re-export them alongside the existing content exports. Do not make route files import `./videos` directly.

- [ ] **Step 3: Add navigation and sitemap entries**

  Insert `{ label: "Recipes", href: "/recipes" }` in `src/lib/utils.ts` between Products and Services. Add `{ url: `${site.url}/recipes`, priority: 0.85, changeFrequency: "monthly" }` to the static `routes` array in `src/app/sitemap.ts`.

- [ ] **Step 4: Run the static type/lint check for the content changes**

  Run:

  ```bash
  npm run lint
  ```

  Expected: exit code 0 with no new warnings or errors.

- [ ] **Step 5: Commit the discoverability slice**

  ```bash
  git add src/content/videos.ts src/content/index.ts src/lib/utils.ts src/app/sitemap.ts
  git commit -m "feat: add recipes route content"
  ```

### Task 2: Build the reusable YouTube video card and lightbox

**Files:**
- Create: `src/components/video/YouTubeVideoCard.tsx`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes `RecipeVideoCard` from `@/content`.
- Produces a client component with signature `YouTubeVideoCard({ video }: { video: RecipeVideoCard }): JSX.Element`.

- [ ] **Step 1: Add the client component with card state and browser cleanup**

  Start the file with `"use client"`. Use `useEffect`, `useRef`, and `useState` plus `AnimatePresence`/`motion` from Framer Motion and `Play`, `X`, and `ExternalLink` from lucide-react.

  Implement these behaviors exactly:

  - `open` state starts `false`; the trigger button sets it to `true`.
  - When open, register a `keydown` listener that calls `setOpen(false)` for `Escape`; register a cleanup function.
  - When open, set `document.body.style.overflow = "hidden"`; cleanup restores `""`.
  - Save the trigger button ref and focus it after close; focus the modal close button after open.
  - Build the player URL as `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`.

- [ ] **Step 2: Render the responsive recipe card**

  Extend `next.config.ts` with a `remotePatterns` entry for the YouTube thumbnail host:

  ```ts
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  ```

  Preserve the existing conditional `images: { unoptimized: true }` behavior by placing the host allowlist in the static-export branch together with `unoptimized`, without changing normal Vercel behavior.

  Render a semantic `<button type="button">` with `aria-haspopup="dialog"` and an accessible label that includes the verified title and source. Apply the incoming `video.className`, `group`, `relative`, `overflow-hidden`, `rounded-xl3`, and responsive aspect/layout classes.

  Use `next/image` with `src={video.thumbnail}`, `alt={`${video.title} video thumbnail`}`, `fill`, `unoptimized`, and responsive `sizes`, so the remote YouTube thumbnail is present without adding a local asset. Add a dark gradient overlay, a gold circular play control, the `number`, `label`, title, source, and a hover lift/scale treatment using existing tokens.

- [ ] **Step 3: Render the accessible lightbox only while open**

  Wrap the modal in `AnimatePresence`. Render a fixed `z-[100]` backdrop and a centered panel when `open` is true. The panel must use `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to a visually visible title, and `onClick` on the backdrop that closes only when `event.target === event.currentTarget`.

  Inside the panel, render a labeled close `<button>` and a responsive `aspect-video` wrapper containing:

  ```tsx
  <iframe
    src={embedUrl}
    title={`${video.title} by ${video.source}`}
    className="size-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
  ```

  Include a small external YouTube link below the player for visitors who prefer the original page. Do not render the iframe outside the open branch.

- [ ] **Step 4: Run lint after the component is implemented**

  Run:

  ```bash
  npm run lint
  ```

  Expected: exit code 0.

- [ ] **Step 5: Commit the reusable interaction**

  ```bash
  git add next.config.ts src/components/video/YouTubeVideoCard.tsx
  git commit -m "feat: add youtube video lightbox"
  ```

### Task 3: Compose the `/recipes` page in the existing visual system

**Files:**
- Create: `src/app/recipes/page.tsx`

**Interfaces:**
- Consumes `recipeVideoCards` from `@/content` and `YouTubeVideoCard` from `@/components/video/YouTubeVideoCard`.
- Produces the statically prerenderable `/recipes` route with page metadata and the video-card grid.

- [ ] **Step 1: Add route metadata and shared page framing**

  Export metadata with title `Recipes` and a description explaining that visitors can watch noodle recipe inspiration from Yummy Food’s recipe collection; set `alternates: { canonical: "/recipes" }`. Render `PageHeader` with eyebrow `Recipe inspiration`, title `Good noodles start with a good bowl.`, highlight `[`"good"`, `"bowl."`]`, a short lede, and breadcrumbs Home → Recipes.

- [ ] **Step 2: Add the editorial video grid**

  Render a white section with `Container size="wide"`, a short intro row using `SectionHeading` (`From pack to bowl`, `A little inspiration for the next serving.`), and a `Stagger` grid. Map `recipeVideoCards` to `Reveal`/`StaggerItem` wrappers and render `YouTubeVideoCard` for each card. Use a 12-column desktop grid, one large lead card and five smaller cards from `className`, collapsing to one column on mobile.

- [ ] **Step 3: Add an on-brand closing CTA**

  Render the existing `CTA` component with copy that directs wholesale/private-label visitors to contact Yummy Food after watching the recipe content. Do not add a company-history video or use the RecipeTin Eats video in homepage content.

- [ ] **Step 4: Run lint and build the route**

  Run:

  ```bash
  npm run lint
  npm run build
  test -f out/recipes/index.html
  ```

  Expected: all commands exit 0 and `out/recipes/index.html` exists. The build must continue to pass with `STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/yummy-food-website` as used by GitHub Pages:

  ```bash
  STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/yummy-food-website npm run build
  test -f out/recipes/index.html
  ```

- [ ] **Step 5: Commit the route**

  ```bash
  git add src/app/recipes/page.tsx
  git commit -m "feat: add recipes video page"
  ```

### Task 4: Final verification and handoff

**Files:**
- Modify: none unless verification exposes an implementation issue.

**Interfaces:**
- Verifies the final route, navigation, static export, and working-tree boundaries.

- [ ] **Step 1: Inspect the final diff and status**

  Run:

  ```bash
  git diff --check
  git status --short
  git log -4 --oneline
  ```

  Expected: no whitespace errors; only the intended feature commits plus the user’s pre-existing `.vscode/settings.json`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` changes remain.

- [ ] **Step 2: Verify route strings and generated files**

  Run:

  ```bash
  rg -n 'Recipes|/recipes|xlg-fWC3GzA|role="dialog"|youtube.com/embed' src
  test -f out/recipes/index.html
  ```

  Expected: the navigation, sitemap, recipe route, video ID, dialog semantics, and embed URL are present.

- [ ] **Step 3: Report the pending history-video dependency**

  The handoff must state that the recipes page is complete and that the homepage company-history embed still needs a separate Yummy Food YouTube URL. The RecipeTin Eats video must not be described as company history.
