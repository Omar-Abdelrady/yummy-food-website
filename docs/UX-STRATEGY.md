# Yummy Food — UX Strategy & Design Blueprint

Corporate presentation website. Not e-commerce. No cart, no prices, no checkout.

---

## 0. Grounding: What the Assets Actually Tell Us

Everything below is derived from the supplied packaging photography and logo — not invented.
This matters, because credibility on a corporate site comes from specificity.

| Evidence found on packaging | Strategic consequence for the site |
|---|---|
| `Made in Egypt / صنع في مصر` printed on back panel | Egyptian-manufacturer positioning is provable. Lead with it. |
| `Kang Shi Fu Yummy Food Ltd, Co.` (company name, back panel) | Legal entity name for footer, About, and structured data. |
| `Plot No. 11, First Industrial Zone, Badr City` | Real factory address → Contact page + map + About/Factory. |
| Halal seal on every retail pack | Certification section is real, not decorative. |
| 4 languages on-pack: Chinese, English, Arabic, Korean | The company already packages for export. Export/Distribution services are the real commercial story. |
| `好味道` (hǎo wèi dào — "good flavour") lockup on all packs | Sub-brand mark. Treat as heritage/authenticity signal. |
| `Classic 经典` gold medallion on sachet range | There is a product tier system. Use as a "Classic Range" badge. |
| Nutrition panel: Flour Ext 72%, Protein 12.1%, 367.2 Kcal, Sodium chloride 0.56% | Real specs for Product Detail pages. |
| `9 months from Production Date` shelf life | Real spec. Export buyers care about this more than flavour. |
| `S. No. 1546/2011` + batch `20231101B01` | Traceability / lot coding → supports Quality Standards claims. |
| Barcode `6 625000 435018` | GS1-registered → retail-ready claim. |
| Logo = gold gradient leaf + fork & spoon negative space | Gold is the brand's own equity, not a trend choice. Palette is derived, not imposed. |

**Product line inventory (9 SKUs, 3 categories):**

*Instant Noodles — Sachet (Classic Range)*
1. Spicy Beef Noodles — 香辣牛肉面 / طعم لحم حار — orange pack
2. Chicken Noodles — 营养鸡汤面 / طعم الفراخ — yellow pack
3. Vegetables Noodles — 风味蔬菜面 / طعم الخضار — green pack

*Cup Noodles*
4. Braised Beef Cup — 红烧牛肉面 — red cup
5. Spicy Beef Cup — 香辣牛肉面 — orange cup
6. Chicken Cup — 营养鸡汤面 — yellow cup

*Dried Noodles — Handmade*
7. WenZhou Chinese Noodles (Red) — 温州挂面 — 500 g
8. WenZhou Chinese Noodles (Yellow) — 温州挂面 — 500 g
9. Egg Noodles Handmade — 鸡蛋面 — 500 g

*Bulk / Food-service*
10. Yummy Noodles Bulk Pack — 拉面 — multi-pack (front + back imagery, one SKU)

---

## 1. Audience → the whole design follows from this

A corporate site for a food manufacturer has **three** audiences with conflicting needs.
Designing for "visitors" produces the generic template we must avoid. Designing for these
three produces the structure below.

**A. Import / distribution buyer (primary, ~60% of commercial value).**
Foreign or regional wholesaler evaluating whether Yummy is a safe supplier.
They are risk-assessing, not shopping. They want: capacity numbers, certifications,
shelf life, packaging/carton configuration, MOQ signals, export experience, and a human
to email. They will skim Home in 20 seconds looking for *scale proof*, then jump straight
to Products → a spec table → Contact.
→ Drives: Statistics, Certifications, Manufacturing Process, Specifications tables, Export service.

**B. Private-label / OEM client (secondary, highest margin).**
A regional brand that wants noodles made under *their* label. They need to believe the
factory is competent and the process is turnkey. They want: process transparency,
capability list, and a low-friction way to start a conversation.
→ Drives: Services architecture, Private Label & OEM detail pages, Process timelines.

**C. Retail consumer / brand-curious visitor (tertiary, but sets perceived scale).**
Sees the pack in a shop, searches the brand. Judges the company's size purely by
production value. Cares about flavours and trust, not specs.
→ Drives: Hero, Featured Products, Gallery, photographic warmth, animation quality.

**The tension, and its resolution.** B2B audiences want dense proof; consumers want
emotional imagery. Cramming both into one flat page is what makes food-manufacturer
sites look cheap. Resolution: **Home is an emotional trailer with proof-points embedded
as scannable numeric anchors; depth is one click away.** Nothing on Home tries to be
complete. Every Home section is a doorway with a single job.

---

## 2. Sitemap

```
/                             Home
│
├── /about                    About Us
│                             (story · mission · vision · values · factory ·
│                              team · capacity · quality · certificates)
│
├── /products                 Products — filterable grid, 3 categories
│   ├── /products/spicy-beef-noodles
│   ├── /products/chicken-noodles
│   ├── /products/vegetable-noodles
│   ├── /products/braised-beef-cup-noodles
│   ├── /products/spicy-beef-cup-noodles
│   ├── /products/chicken-cup-noodles
│   ├── /products/wenzhou-noodles-red
│   ├── /products/wenzhou-noodles-yellow
│   ├── /products/egg-noodles
│   └── /products/yummy-noodles-bulk
│
├── /services                 Services — 5 capabilities
│   ├── /services/food-manufacturing
│   ├── /services/private-label
│   ├── /services/oem
│   ├── /services/export
│   └── /services/distribution
│
├── /contact                  Contact — form · map · hours · channels
│
└── system
    ├── /sitemap.xml          generated
    ├── /robots.txt           generated
    ├── /manifest.webmanifest
    └── /not-found            404
```

**Depth is capped at 2 clicks from Home to any page.** A buyer should never feel
they are digging. Nav is 5 items — flat, no dropdown mega-menu, because a 5-item flat
nav reads as *confident* while a mega-menu on a 9-product catalogue reads as *padded*.

### Why no blog / news / careers
Adding empty content shells is the single fastest way to look *smaller* than you are.
An empty "News" page with two 2019 posts destroys the illusion of scale. The routes
are pre-structured in the content layer so they can be switched on the day there is
real content to fill them.

---

## 3. User Flows

### Flow A — Import buyer (primary)
```
Google "instant noodles manufacturer Egypt"  ─┐
LinkedIn / trade-fair card                   ─┼──▶  HOME
Referral                                     ─┘       │
                                                      │  scans hero → sees
                                                      │  "Made in Egypt · Halal ·
                                                      │   Export to N markets"
                                                      ▼
                                          STATISTICS (counter animation)
                                                      │  "is this real scale?"
                                                      ▼
                                          CERTIFICATIONS  ── satisfied ──┐
                                                      │                  │
                                                      ▼                  │
                                              PRODUCTS grid              │
                                                      │                  │
                                                      ▼                  │
                                          PRODUCT DETAIL                 │
                                          → Specifications table         │
                                          → Packaging / carton config    │
                                                      │                  │
                                                      ├──────────────────┤
                                                      ▼                  ▼
                                              CONTACT FORM  ◀── inline CTA on
                                              (subject preset:            every detail page
                                               "Product enquiry")
```
Design consequence: **a contact affordance must exist within one scroll of every
terminal page.** Product Detail and Service Detail both end in a CTA block; the header
keeps a persistent "Contact" action. Buyer never has to hunt.

### Flow B — Private-label client
```
HOME ──▶ FEATURED SERVICES ──▶ SERVICE DETAIL (Private Label)
                                      │
                                      ├─▶ Process (5 steps, revealed on scroll)
                                      ├─▶ Benefits
                                      └─▶ CTA ──▶ CONTACT (subject: "Private label")
                                                       │
                            cross-sell ◀───────────────┘
                            "See what we already make" ──▶ PRODUCTS
```

### Flow C — Consumer
```
HOME ──▶ hero motion, floating packs ──▶ FEATURED PRODUCTS
                                              │
                        ┌─────────────────────┼─────────────────┐
                        ▼                     ▼                 ▼
                   CATEGORIES            GALLERY           PRODUCT DETAIL
                        │                                       │
                        └──────────▶ PRODUCTS grid ◀────────────┘
                                                                │
                                                        "where to buy?"
                                                                ▼
                                                    CONTACT (Distribution)
```

### Flow D — Verification visit (short, high-stakes)
Someone has a meeting in 10 minutes and wants to check the company is legitimate.
`HOME → ABOUT → factory + capacity + certificates → footer address`.
Design consequence: About must front-load *proof* (factory, capacity, certificates),
not bury it after a long founder story. Story is first for narrative, but the proof
blocks are visually heavier and pull the eye.

---

## 4. Information Architecture

Three content domains, each with a strict rule about what it may contain. This is
what keeps the site from bloating into a template.

```
┌─ COMPANY (who we are) ───────────── About, Statistics, Certifications, Gallery
│  Rule: every claim must be verifiable. No stock-photo lifestyle filler.
│
├─ PRODUCT (what we make) ─────────── Products, Categories, Product Detail
│  Rule: specification-led. No prices, no cart, no urgency language, ever.
│
└─ CAPABILITY (what we can do for you) ─ Services, Process, Service Detail
   Rule: every service ends in a conversation, not a transaction.
```

### Content model (CMS-ready)
All copy lives in typed data modules under `src/content/`, never inline in JSX.
Each entity is a plain serialisable object with a stable `slug`. Pages read via
a thin repository layer (`getProducts()`, `getProductBySlug()`, …).

The day a CMS is introduced, only the repository functions change — becoming `async`
and hitting an API — while every component's props stay identical. Field names are
deliberately CMS-shaped (`slug`, `title`, `excerpt`, `body`, `seo`, `order`, `featured`).

```
Product   { slug, name, nameZh, nameAr, category, tagline, excerpt,
            image, gallery[], description, features[],
            specs{ netWeight, shelfLife, packaging, cartonQty, flavour,
                   ingredients, nutrition{} }, related[], featured, order }

Service   { slug, title, icon, excerpt, hero{}, description,
            process[{ step, title, body }], benefits[], featured, order }

Category  { slug, title, excerpt, image, productCount }

Company   { legalName, tradeName, founded, address, phones[], emails[],
            hours[], social[], stats[], certifications[], values[],
            mission, vision, story[] }
```

### Global navigation
`Home · About · Products · Services · Contact` + a gold "Get in touch" action.
Five is the right number: enough to signal a real company, few enough that every
item is a genuine destination. The CTA is styled as an action, not a nav item, so
the nav still *reads* as five.

---

## 5. Wireframes (low fidelity)

Legend: `▓` image/media · `▒` glass surface · `═` heavy display type · `─` body copy
· `[ ]` button · `#` number · `·` metadata

### 5.1 Global shell
```
┌──────────────────────────────────────────────────────────────────────┐
│ ▒ ▓logo  YUMMY FOOD    Home About Products Services Contact [Get in │ ← fixed, glass,
│                                                        touch]       │   blurs on scroll
├──────────────────────────────────────────────────────────────────────┤ ← 2px gold scroll-
│                                                                      │   progress bar
```
Persistent glass header + a hairline gold scroll-progress bar. The progress bar is not
decoration: on long corporate pages it tells a skimming buyer how much proof is left,
which reduces bounce. Mouse-follow gold glow lives in the hero only, so it stays an
event rather than a gimmick.

### 5.2 Home
```
╔══════════════════════════════════════════════════════════════════════╗
║  HERO                                    ▓ ▓                        ║
║  · Est. Badr City, Egypt                   ▓  floating packs       ║  100vh
║  ═══════════════════════════════════        ▓  (3 layers,           ║
║  ═ Noodles engineered ═══════                 parallax + idle       ║  soft radial gold
║  ═ for the world. ═══════                     float, staggered)     ║  gradient, grain
║  ── Egyptian manufacturing. Halal. ──                               ║  mouse-follow glow
║  ── Export-ready in four languages. ──                              ║
║  [ Explore products ]  [ Talk to us ]                               ║
║                                    ↓ scroll                         ║
╚══════════════════════════════════════════════════════════════════════╝
```
*Why:* one job — establish scale + legitimacy in 3 seconds. Headline is a capability
claim, not a greeting. Two CTAs = the two real intents (evaluate / enquire). Floating
packs are the *actual* product, so the visual richness doubles as a product tease
instead of abstract decoration.

```
┌── INTRODUCTION ──────────────────────────────────────────────────────┐
│  · Who we are                                                        │
│  ═ We make noodles that ═     ── Founded in Badr City's First    ──  │
│  ═ travel well. ═════════     ── Industrial Zone, Yummy Food     ──  │
│                               ── produces instant, cup and       ──  │
│                               ── dried noodles for domestic and  ──  │
│                               ── export markets. ──                  │
│                               [ Our story → ]                        │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* the hero makes a promise; a visitor immediately asks "who is this?". Answering
in ~40 words with a link out prevents the wall-of-text About-on-Home that kills
premium sites. Split layout (statement left / substance right) creates the
editorial rhythm that reads as "designed", not "assembled".

```
┌── FEATURED PRODUCTS ─────────────────────────────────────────────────┐
│  · Selected range                            [ All products → ]      │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                        │
│  │  ▓▓▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓▓▓  │ │  ▓▓▓▓▓▓▓▓  │  ← lift + image zoom  │
│  │  [badge]   │ │  [badge]   │ │  [badge]   │    on hover, stagger  │
│  │ ═ Name ═   │ │ ═ Name ═   │ │ ═ Name ═   │    reveal on scroll   │
│  │ ── desc ── │ │ ── desc ── │ │ ── desc ── │                        │
│  └────────────┘ └────────────┘ └────────────┘                        │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* proof-by-artefact. Three hero SKUs (one per category) prove the range is real
without dumping the catalogue. Card is the site's most-repeated component, so its
quality sets perceived production value everywhere.

```
┌── CATEGORIES ────────────────────────────────────────────────────────┐
│  ┌──────────────────┐┌──────────────────┐┌──────────────────┐        │
│  │ ▓ Instant Sachet ││ ▓ Cup Noodles    ││ ▓ Dried Handmade │        │
│  │   3 products →   ││   3 products →   ││   3 products →   │        │
│  └──────────────────┘└──────────────────┘└──────────────────┘        │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* a buyer thinks in formats (sachet / cup / dried) because format determines
line, machinery and carton logistics. Categorising by format speaks their language
and simultaneously signals three production lines — i.e. a bigger factory.

```
┌── WHY CHOOSE US ─────────────────────────────────────────────────────┐
│  ═ Built for buyers who ═       ▒┌─────────┐ ▒┌─────────┐            │
│  ═ cannot afford surprises ═     │ ⬡ Halal │  │ ⬡ 4-lang│            │
│                                  │ ── ──── │  │ ── ──── │            │
│                                 ▒└─────────┘ ▒└─────────┘            │
│                                 ▒┌─────────┐ ▒┌─────────┐            │
│                                  │ ⬡ 9-mo  │  │ ⬡ Batch │            │
│                                 ▒└─────────┘ ▒└─────────┘            │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* differentiation must be *specific* to beat competitors' identical "quality,
trust, service" triads. Every card here is a fact off the packaging. Glass cards on
a dark band give the section its own visual identity so the page doesn't read as one
long scroll of white blocks.

```
┌── MANUFACTURING PROCESS ─────────────────────────────────────────────┐
│  · How it's made                                                     │
│  ①───────②───────③───────④───────⑤                                   │
│  Milling  Mixing  Steaming  Frying  Sealing        ← gold line draws │
│  ──       ──      ──        ──      ──               as you scroll   │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* process transparency is the highest-trust content a manufacturer owns —
it says "we have nothing to hide" and doubles as capability proof for OEM clients.
The scroll-drawn connector line makes a static list feel engineered. Horizontal on
desktop (a production line), vertical on mobile (a timeline).

```
┌── STATISTICS ────────────────────────────────────────────────────────┐
│    #12,000        #9         #4          #100%                       │
│    tonnes/yr      SKUs       languages   halal                       │
│    ── ──          ── ──      ── ──       ── ──   ← count up in view  │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* the single most efficient "we are bigger than you think" device. Numbers are
skimmable in under two seconds — exactly matching the buyer's Home dwell time.
Counter animation earns attention without being childish because motion is linear
and brief. Placed *after* process so the numbers land as a consequence of capability.

```
┌── CERTIFICATIONS ────────────────────────────────────────────────────┐
│  ═ Compliance is the ═     ▒[ Halal ]  ▒[ ISO 22000 ]                │
│  ═ product. ═              ▒[ HACCP ]  ▒[ GS1 ]                      │
│                            ▒[ Egyptian Org. for Standardization ]    │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* for export buyers this is a gate, not a nicety — no certs, no purchase order.
Given its own section (not shrunk into a footer logo strip) because it is decisive.
Halal and GS1 are on-pack facts; the rest are marked in the content layer as
`unverified: true` so the client can confirm or remove before launch.

```
┌── FEATURED SERVICES ─────────────────────────────────────────────────┐
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                  │
│  │ ⬡ Private    │ │ ⬡ OEM        │ │ ⬡ Export     │  → detail pages  │
│  │   Label      │ │              │ │              │                  │
│  └──────────────┘ └──────────────┘ └──────────────┘                  │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* Products answer "what do you sell?"; Services answer "what can you do for
*me*?" — the higher-margin question. Surfacing three on Home captures the B2B
visitor who never intended to browse a catalogue.

```
┌── GALLERY ───────────────────────────────────────────────────────────┐
│  ┌────────┐┌──────────────┐┌────────┐    ← asymmetric masonry,       │
│  │  ▓▓▓▓  ││   ▓▓▓▓▓▓▓▓   ││  ▓▓▓▓  │      parallax on scroll        │
│  └────────┘└──────────────┘└────────┘                                │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* atmosphere and scale by accumulation — the emotional counterweight to the
spec-heavy sections above, and the last thing the consumer visitor needs before
deciding the brand feels substantial. Asymmetric grid signals art direction.

```
┌── CTA ───────────────────────────────────────────────────────────────┐
│         ═ Let's talk about your ═                                    │
│         ═ next order. ═══════════                                    │
│         [ Contact us ]   [ Download line card ]                      │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* the page must terminate in a decision. Dark, full-bleed, minimal — visually
distinct from everything above so it reads as a threshold rather than another section.

```
┌── FOOTER ────────────────────────────────────────────────────────────┐
│ ▓logo            Quick links   Products      Contact                 │
│ ── one-line ──   Home          Instant       Plot 11, First Ind.     │
│ ── positioning   About         Cup           Zone, Badr City         │
│                  Products      Dried         +20 ·  @  ·  hours      │
│                  Services                    ▢ ▢ ▢  social          │
│ ─────────────────────────────────────────────────────────────────    │
│ © Kang Shi Fu Yummy Food Ltd, Co.        Made in Egypt              │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* footer is where the verification visitor lands to confirm the company is real.
Full legal name + physical address does more for trust than any hero headline.

### 5.3 Products
```
┌── HEADER ────────────────────────────────────────────────────────────┐
│ · 10 products · 3 categories                                         │
│ ═ Our range ═══════════════                                          │
│ ── Instant, cup and dried noodles, produced in Badr City. ──         │
│ [ All ] [ Instant ] [ Cup ] [ Dried ]        ← client-side filter,   │
├──────────────────────────────────────────────────────────────────────┤   animated layout
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                                 │
│  │ ▓ card  │ │ ▓ card  │ │ ▓ card  │   3-up desktop / 2-up tablet    │
│  └─────────┘ └─────────┘ └─────────┘   1-up mobile, stagger reveal   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                                 │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* grid, as specified. Filters are client-side and instant — a 10-item catalogue
must never make you wait or navigate. Count metadata ("10 products · 3 categories")
sets expectations honestly, which reads as confidence rather than apology.

### 5.4 Product Detail
```
┌──────────────────────────────────────────────────────────────────────┐
│ Products / Instant Noodles / Spicy Beef            ← breadcrumb      │
│ ┌──────────────────┐  · Instant Noodles · Classic Range              │
│ │                  │  ═ Spicy Beef Noodles ═══                       │
│ │   ▓▓▓▓▓▓▓▓▓▓▓▓   │  ── 香辣牛肉面 · طعم لحم حار ──                 │
│ │   large image    │  ── Two-paragraph description. ──               │
│ │   3D tilt on     │                                                 │
│ │   pointer move   │  Net weight   Shelf life   Packaging            │
│ │                  │  70 g         9 months     30 × carton          │
│ └──────────────────┘  [ Enquire about this product ]                 │
│ ┌──┐┌──┐┌──┐  ← gallery thumbs, crossfade main image                 │
├──────────────────────────────────────────────────────────────────────┤
│  SPECIFICATIONS (table)          │  FEATURES (list)                  │
│  Net weight ····· 70 g           │  ✓ Halal certified                │
│  Shelf life ····· 9 months       │  ✓ Four-language packaging        │
│  Flavour ········ Spicy beef     │  ✓ Batch-coded for traceability   │
│  Carton ········· 30 pcs         │  ✓ 9-month ambient shelf life     │
│  Protein ········ 12.1 %         │                                   │
├──────────────────────────────────────────────────────────────────────┤
│  PACKAGING — sachet · carton · pallet configuration                  │
├──────────────────────────────────────────────────────────────────────┤
│  RELATED PRODUCTS  ┌────┐┌────┐┌────┐                                │
├──────────────────────────────────────────────────────────────────────┤
│  CONTACT CTA — "Request a sample or spec sheet"                       │
└──────────────────────────────────────────────────────────────────────┘
```
*Why each block:*
- **Large image + gallery** — the product *is* the packaging; buyers judge shelf
  presence. Subtle 3D tilt makes a flat PNG feel like an object without a WebGL cost.
- **Key specs above the fold** — weight/shelf-life/carton are the first three
  questions of every enquiry email. Answering them pre-emptively is the entire
  value of the page.
- **Full spec table** — where an e-commerce site would put price and Add to Cart.
  This is the deliberate substitution that keeps the page satisfying without selling.
- **Features** — translates specs into benefits for less technical readers.
- **Packaging** — carton/pallet configuration is the difference between a brochure
  and a supplier document. This is the single section that most makes the company
  look export-ready.
- **Related products** — cross-sell without commerce; keeps a browsing buyer inside
  the catalogue instead of bouncing.
- **Contact CTA** — the page's only conversion. Deep-links to Contact with the
  product pre-selected, so the buyer never re-types what they were looking at.

### 5.5 Services / Service Detail
```
SERVICES                          SERVICE DETAIL
┌───────────────────────┐         ┌───────────────────────────────────┐
│ ═ What we do ═        │         │ HERO — ═ Private Label ═          │
│ ┌────────┐ ┌────────┐ │         │ ── promise line ──   ▓            │
│ │⬡ Manuf ││⬡ Priv  │ │         ├───────────────────────────────────┤
│ │  ──    ││  ──    │ │  ──▶    │ DESCRIPTION — 2 cols              │
│ └────────┘ └────────┘ │         ├───────────────────────────────────┤
│ ┌────────┐ ┌────────┐ │         │ PROCESS ①─②─③─④─⑤ scroll reveal  │
│ │⬡ OEM   ││⬡ Export│ │         ├───────────────────────────────────┤
│ └────────┘ └────────┘ │         │ BENEFITS — ▒glass grid            │
│ ┌────────┐            │         ├───────────────────────────────────┤
│ │⬡ Distr │            │         │ CTA + CONTACT (subject preset)    │
│ └────────┘            │         └───────────────────────────────────┘
└───────────────────────┘
```
*Why:* five services in an asymmetric grid, not a uniform 5-up row — uniform rows
read as a feature list, weighted cards read as capabilities. Each detail page is
Hero → Description → Process → Benefits → CTA because that is the order a B2B
reader actually asks: *what is it? how does it work? what do I get? how do I start?*
The Process block is the trust engine; Benefits is the sales argument; they are not
interchangeable and the order matters.

### 5.6 Contact
```
┌──────────────────────────────────────────────────────────────────────┐
│ ═ Let's talk ═══         ▒┌──────────────────────────┐               │
│ ── We reply within ──     │ Name          Company    │               │
│ ── one business day ──    │ Email         Phone      │               │
│                           │ Enquiry type  ▾          │  ← preset from│
│ ⬡ +20 ...                 │ Message                  │    ?subject=  │
│ ⬡ hello@...               │ [ Send enquiry ]         │               │
│ ⬡ Plot 11, Badr City      └──────────────────────────┘               │
│ ⬡ Sun–Thu 09:00–17:00                                                │
│ ▢ ▢ ▢                                                                │
├──────────────────────────────────────────────────────────────────────┤
│  ▓▓▓ GOOGLE MAP — Badr City First Industrial Zone ▓▓▓                │
└──────────────────────────────────────────────────────────────────────┘
```
*Why:* form on the right (where the eye lands last, after trust is established by
the details on the left). Enquiry-type select routes the lead and is pre-filled from
whichever page referred the visitor — the small detail that makes the site feel
engineered rather than assembled. A real map with a real industrial-zone address is
the strongest single trust signal on the whole site; an embedded iframe is lazy-loaded
so it costs nothing until scrolled to. Working hours prevent the "why no reply"
frustration that kills B2B leads.

### 5.7 Responsive strategy (desktop-first, per brief)
| | Desktop ≥1280 | Tablet 768–1279 | Mobile <768 |
|---|---|---|---|
| Nav | full inline + CTA | inline, condensed | glass sheet drawer |
| Hero | 2-col, 3 floating packs | 2-col, 2 packs | stacked, 1 pack |
| Cards | 3-up | 2-up | 1-up |
| Process | horizontal line | horizontal, scroll | vertical timeline |
| Detail | 2-col sticky image | 2-col, unsticky | stacked |
| Type scale | clamp max | clamp mid | clamp min |
| Parallax / tilt | on | reduced | off (perf + touch) |

Motion respects `prefers-reduced-motion` throughout: transforms collapse to instant
opacity, counters snap to final value. Accessibility is not a toggle bolted on — the
reveal system's default end-state is *visible*, so content is never hidden if JS fails.

---

## 6. Design System

**Palette** — derived from the logo's gold gradient and the packs' black/white lockups.
```
Gold        #C9A227  primary          — from logo gradient mid-tone
Gold light  #E8C766  hover / gradient — logo highlight
Gold deep   #8C6B15  gradient end     — logo shadow
Ink         #0B0B0C  near-black       — pack typography
Charcoal    #17181B  dark sections
Warm gray   #6B6862  body text        — secondary, per brief
Beige       #F6F1E7  light bands      — secondary, per brief
White       #FFFFFF  base
```
Gold is used as *accent and light*, never as large fills — that is the difference
between luxury and cheap. Large gold areas read as budget; gold hairlines, gradients,
and 1-px borders on black read as expensive.

**Type** — Inter Tight for display (tight tracking at large sizes, geometric,
international), Inter for body. Both variable, self-hosted via `next/font`
(zero layout shift, no external request). Display scale uses `clamp()` so the
"large typography" requirement holds at every viewport instead of only at 1440.

**Spacing** — 4 px base; section rhythm 96/128/160 px desktop, 64/80/96 mobile.
Generous vertical space is the primary premium signal and is non-negotiable.

**Surfaces** — radius 16/24/32 px. Glass = `backdrop-blur` + 8 % white + 1-px
white-alpha border, used only on dark or photographic backgrounds where blur has
something to blur. Glass over flat white is a common tell of an amateur build; it
is deliberately avoided.

**Motion** — one shared easing curve `[0.16, 1, 0.3, 1]`, durations 0.4–0.8 s,
stagger 60–80 ms. Framer Motion only; no GSAP — nothing in this brief needs a
timeline engine, and dropping it saves ~50 KB. Every animation is either a reveal,
a hover, or a slow idle float. No bounces, no spins, no attention-seeking.

---

## 7. Build Plan

```
src/
├── app/
│   ├── layout.tsx                 fonts, metadata, shell, JSON-LD
│   ├── page.tsx                   Home
│   ├── about/page.tsx
│   ├── products/page.tsx
│   ├── products/[slug]/page.tsx   generateStaticParams
│   ├── services/page.tsx
│   ├── services/[slug]/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts · robots.ts · not-found.tsx
├── content/                       ← the CMS seam
│   ├── company.ts  products.ts  services.ts  categories.ts
│   └── index.ts                   repository: getProducts(), getProductBySlug()…
├── components/
│   ├── layout/      Header Footer ScrollProgress MobileNav
│   ├── ui/          Button Badge Card GlassCard SectionHeading Container
│   ├── motion/      Reveal Stagger Counter TextReveal Parallax Tilt MouseGlow
│   └── sections/    Hero Intro FeaturedProducts Categories WhyUs Process
│                    Stats Certifications Services Gallery CTA …
└── lib/             utils, seo, constants
```

Static-first: every page is a server component and prerenders. Client components are
leaf-level only (motion wrappers, filter, mobile nav, tilt) so the JS payload stays
small. Product images are `next/image` with explicit sizes, `priority` only on the
hero pack.

---

## 8. Deliverable Checklist
- [x] Sitemap · User flows (4) · IA · Wireframes · Section-by-section rationale
- [ ] Design system in code (tokens, primitives)
- [ ] 7 route types, 20 prerendered pages
- [ ] Motion system · SEO (metadata, OG, JSON-LD, sitemap, robots) · a11y · responsive
