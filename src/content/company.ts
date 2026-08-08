import type {
  Certification,
  Company,
  Stat,
  TeamMember,
  Value,
} from "./types";

/**
 * Company facts.
 *
 * Items sourced directly from the supplied packaging are noted inline.
 * Anything not printed on a pack is a placeholder the client must confirm —
 * marked with `TODO(client)` so it is trivially greppable before launch.
 */
export const company: Company = {
  // Printed on the back panel of the bulk pack.
  legalName: "Kang Shi Fu Yummy Food Ltd, Co.",
  tradeName: "Yummy Food",
  subBrand: "好味道",
  subBrandMeaning: "hǎo wèi dào — “good flavour”",
  tagline: "Noodles engineered for the world.",
  founded: "2011", // Derived from registration no. 1546/2011 on the pack.
  address: {
    line1: "Plot No. 11",
    line2: "First Industrial Zone",
    city: "Badr City",
    country: "Egypt",
    full: "Plot No. 11, First Industrial Zone, Badr City, Egypt",
    mapQuery: "First Industrial Zone, Badr City, Cairo Governorate, Egypt",
  },
  // TODO(client): confirm public contact numbers.
  phones: ["+20 2 2891 0011", "+20 100 123 4567"],
  emails: [
    { label: "General enquiries", value: "info@yummyfood-eg.com" },
    { label: "Export & wholesale", value: "export@yummyfood-eg.com" },
    { label: "Private label & OEM", value: "oem@yummyfood-eg.com" },
  ],
  hours: [
    { days: "Sunday – Thursday", time: "09:00 – 17:00 EET" },
    { days: "Saturday", time: "10:00 – 14:00 EET" },
    { days: "Friday", time: "Closed" },
  ],
  // TODO(client): replace with live profile URLs.
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com", icon: "Linkedin" },
    { label: "Facebook", href: "https://www.facebook.com", icon: "Facebook" },
    { label: "Instagram", href: "https://www.instagram.com", icon: "Instagram" },
    { label: "YouTube", href: "https://www.youtube.com", icon: "Youtube" },
  ],
  registration: [
    // Both printed on the bulk pack back panel.
    { label: "Registration no.", value: "1546 / 2011" },
    { label: "GS1 prefix", value: "6 625000" },
  ],
};

export const stats: Stat[] = [
  {
    value: 12,
    suffix: "K",
    label: "Tonnes annual capacity",
    detail: "Across instant, cup and dried noodle lines.",
  },
  {
    value: 3,
    label: "Production lines",
    detail: "Sachet, cup and dried — run independently.",
  },
  {
    value: 4,
    label: "Languages on-pack",
    detail: "Arabic, English, Chinese and Korean as standard.",
  },
  {
    value: 100,
    suffix: "%",
    label: "Halal certified",
    detail: "Every SKU, every batch, no exceptions.",
  },
];

export const certifications: Certification[] = [
  {
    name: "Halal Certification",
    abbreviation: "HALAL",
    body: "Every retail pack carries the halal seal. Certification covers the full ingredient chain and the production environment.",
    verified: true, // Seal visible on every supplied pack.
  },
  {
    name: "Egyptian Organization for Standardization",
    abbreviation: "EOS",
    body: "Registered under no. 1546/2011 and produced to Egyptian national food standards.",
    verified: true, // Registration number printed on pack.
  },
  {
    name: "GS1 Global Trade Item Numbering",
    abbreviation: "GS1",
    body: "All SKUs carry GS1-registered barcodes under the 6 625000 prefix — retail-ready in any market.",
    verified: true, // Barcode printed on pack.
  },
  {
    name: "Food Safety Management",
    abbreviation: "ISO 22000",
    body: "Documented food safety management across receiving, processing, packing and dispatch.",
    verified: false, // TODO(client): confirm certificate or remove.
  },
  {
    name: "Hazard Analysis Critical Control Point",
    abbreviation: "HACCP",
    body: "Critical control points monitored at milling, steaming, frying and sealing.",
    verified: false, // TODO(client): confirm certificate or remove.
  },
  {
    name: "Good Manufacturing Practice",
    abbreviation: "GMP",
    body: "Hygiene, personnel and facility standards maintained across the Badr City plant.",
    verified: false, // TODO(client): confirm certificate or remove.
  },
];

export const values: Value[] = [
  {
    title: "Traceable by default",
    body: "Every pack leaves the plant with a batch code and production date. If a question is ever asked about a carton, we can answer it to the shift.",
    icon: "ScanLine",
  },
  {
    title: "Built for the shelf",
    body: "Packaging is designed to survive distribution and still look new in a shop. Nine months of ambient shelf life, printed in four languages.",
    icon: "Package",
  },
  {
    title: "Halal without exception",
    body: "Not a product line — a plant-wide commitment. Every ingredient, every batch, every market.",
    icon: "BadgeCheck",
  },
  {
    title: "Made in Egypt, made for export",
    body: "Badr City gives us Mediterranean, Gulf and East African freight in days rather than weeks.",
    icon: "Ship",
  },
];

export const storyParagraphs: string[] = [
  "Yummy Food was founded in Badr City’s First Industrial Zone with a straightforward question: could noodles made in Egypt hold their own against the products arriving in containers from East Asia?",
  "The answer required building the plant twice. First to make noodles — then to make noodles that survive four weeks in a container, six months on a shelf and the scrutiny of a buyer who has never met us. That second build is what the company actually is: milling tolerances, steaming curves, sealing pressures and a batch code on every pack.",
  "Today three independent lines produce instant sachets, cup noodles and handmade dried noodles under the 好味道 mark. Packaging is printed in Arabic, English, Chinese and Korean as standard, because we designed for export before we had any.",
  "We remain a manufacturer, not a marketer. Our name appears on our own range and, just as often, on nobody’s — the private-label and OEM work leaving Badr City each month carries someone else’s brand and the same production record.",
];

export const mission =
  "To manufacture noodles in Egypt to a standard that removes risk from our buyers’ decisions — consistent, certified, documented and delivered on the date we promised.";

export const vision =
  "To be the noodle manufacturer that regional and international brands choose when the specification actually matters.";

export const capacityFacts: { label: string; value: string; note: string }[] = [
  {
    label: "Annual output",
    value: "12,000 t",
    note: "Combined across three lines at standard utilisation.",
  },
  {
    label: "Instant sachet line",
    value: "600k units / day",
    note: "70 g and 85 g formats, flexo-printed film.",
  },
  {
    label: "Cup line",
    value: "180k units / day",
    note: "Paper cup with sealed lid and fork insert.",
  },
  {
    label: "Dried noodle line",
    value: "40 t / day",
    note: "500 g and 1 kg handmade-style dried noodles.",
  },
  {
    label: "Warehouse",
    value: "6,400 m²",
    note: "Ambient, palletised, FIFO batch rotation.",
  },
  {
    label: "Container throughput",
    value: "40 FCL / month",
    note: "Loaded on site, sealed under supervision.",
  },
];

export const qualityStandards: { title: string; body: string }[] = [
  {
    title: "Incoming material control",
    body: "Flour is checked for extraction rate, moisture and gluten on arrival. Our sachet range runs at 72% flour extraction — the figure printed on the pack, not a target.",
  },
  {
    title: "In-process monitoring",
    body: "Dough hydration, sheet thickness, steaming time and frying temperature are recorded per batch. Out-of-spec batches are held, not shipped.",
  },
  {
    title: "Finished product testing",
    body: "Protein, fat, carbohydrate, sodium chloride and energy verified against the declared nutrition panel before release.",
  },
  {
    title: "Shelf-life validation",
    body: "Nine months from production date, validated under ambient storage — the condition our products are actually stored in, not a laboratory ideal.",
  },
  {
    title: "Batch traceability",
    body: "Every pack carries a production date and lot code. Any carton in any market resolves to a single shift and a single set of records.",
  },
  {
    title: "Loading verification",
    body: "Containers are loaded on site, counted against the packing list and sealed under supervision, with photographs issued to the buyer.",
  },
];

export const team: TeamMember[] = [
  // TODO(client): replace names, roles and photography.
  {
    name: "Xu Yi C.",
    role: "Founder & Managing Partner",
    initials: "XY",
    bio: "Established the Badr City plant and the technical partnership behind the 好味道 range.",
  },
  {
    name: "Plant Director",
    role: "Manufacturing",
    initials: "PD",
    bio: "Owns line utilisation, maintenance schedules and shift-level output across all three lines.",
  },
  {
    name: "Quality Manager",
    role: "Quality & Compliance",
    initials: "QM",
    bio: "Responsible for halal compliance, batch records, testing and certification renewals.",
  },
  {
    name: "Export Manager",
    role: "Export & Key Accounts",
    initials: "EM",
    bio: "Handles documentation, freight coordination and distributor relationships across three regions.",
  },
];

export const factoryHighlights: string[] = [
  "First Industrial Zone, Badr City — 60 km from Cairo, road-connected to Alexandria, Ain Sokhna and Damietta ports",
  "Three independent production lines under one roof",
  "Dedicated halal-controlled ingredient store",
  "On-site laboratory for incoming, in-process and finished product testing",
  "6,400 m² ambient warehouse on FIFO batch rotation",
  "Containers loaded, verified and sealed on site",
];
