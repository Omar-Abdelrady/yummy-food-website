import type { Service } from "./types";

/**
 * Services.
 *
 * Each detail page follows the same narrative order — what is it, how does it
 * work, what do I get, how do I start — because that is the sequence a B2B
 * reader actually asks in. The order is not interchangeable.
 */
export const services: Service[] = [
  {
    slug: "food-manufacturing",
    title: "Food Manufacturing",
    icon: "Factory",
    tagline: "Three lines. One production record.",
    excerpt:
      "Instant sachet, cup and dried noodle manufacturing on independent lines, with a batch record behind every carton.",
    heroHeadline: "Manufacturing that leaves a paper trail",
    heroSubline:
      "Three independent noodle lines in Badr City, producing to specification and documenting every batch.",
    description: [
      "Our core business is making noodles to a written specification and proving we did. Three independent lines — instant sachet, cup and air-dried — run under one roof, which means a mixed order does not queue behind itself.",
      "The part that matters to a buyer is not the machinery, it is the record. Flour extraction, dough hydration, sheet thickness, steaming time, frying temperature and seal integrity are recorded per batch. Any carton in any market resolves back to a single shift.",
    ],
    capabilities: [
      "Fried instant noodle blocks, 70 g and 85 g formats",
      "Sealed paper cup filling with lid, seasoning and fork insert",
      "Air-dried handmade-style noodles, 500 g and 1 kg",
      "Seasoning blending and sachet dosing",
      "Flexo-printed film and paper cup artwork production",
      "Carton packing, palletising and container loading",
    ],
    process: [
      {
        step: "01",
        title: "Specification",
        body: "We agree the noodle in writing: weight, thickness, cooking time, protein, seasoning profile and packaging format. Nothing proceeds on a verbal brief.",
      },
      {
        step: "02",
        title: "Sampling",
        body: "A production sample is made on the line the order will actually run on — not a laboratory bench — and shipped for approval.",
      },
      {
        step: "03",
        title: "Line trial",
        body: "A short run validates film tracking, seal integrity, dosing accuracy and carton fit before we commit to volume.",
      },
      {
        step: "04",
        title: "Production",
        body: "The approved specification runs with in-process checks recorded per batch. Out-of-spec batches are held, not shipped.",
      },
      {
        step: "05",
        title: "Release & dispatch",
        body: "Finished product is tested against the declared panel, batch-coded, palletised and loaded under supervision.",
      },
    ],
    benefits: [
      {
        title: "One supplier, three formats",
        body: "Sachet, cup and dried noodles from a single plant, on a single set of documents, with one point of contact.",
      },
      {
        title: "Specification held in writing",
        body: "What we agree is what runs. Any change is re-approved rather than absorbed silently into the next batch.",
      },
      {
        title: "Batch-level traceability",
        body: "Every pack carries a production date and lot code that resolves to a shift and a set of records.",
      },
      {
        title: "Halal-controlled throughout",
        body: "A single halal standard across the plant — not a certified line inside an uncertified factory.",
      },
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "private-label",
    title: "Private Label",
    icon: "Tags",
    tagline: "Your brand on the shelf. Our name on the batch record.",
    excerpt:
      "We manufacture, you brand. From artwork to a retail-ready pallet under your own label.",
    heroHeadline: "Your brand, manufactured properly",
    heroSubline:
      "A retail-ready noodle range under your own label, from an existing recipe or a new one.",
    description: [
      "Private label is the fastest route to a noodle range of your own: start from a recipe we already run, put your artwork on it, and ship. No line investment, no recruitment, no learning curve on a product category you do not manufacture.",
      "You control the brand, the pack design, the flavour direction and the market. We control the production record, the certification and the delivery date. Our name appears nowhere on the finished pack — only in the file behind it.",
    ],
    capabilities: [
      "Start from an existing Yummy recipe or develop a new profile",
      "Artwork adaptation, pre-press and print management",
      "Your own barcode, or issued under our GS1 prefix",
      "Sachet, cup and dried noodle formats",
      "Multi-language packaging as standard",
      "Carton and pallet configuration to your retail requirement",
    ],
    process: [
      {
        step: "01",
        title: "Brief",
        body: "Format, flavour direction, target market, volume and launch date. We tell you at this stage if the timeline is real.",
      },
      {
        step: "02",
        title: "Recipe selection",
        body: "Adopt an existing Classic Range profile for speed, or develop a new seasoning against your brief.",
      },
      {
        step: "03",
        title: "Artwork & pre-press",
        body: "Your design adapted to our film and cup dies, with legally required declarations placed for the destination market.",
      },
      {
        step: "04",
        title: "Sample approval",
        body: "A finished pack — your artwork, your recipe, produced on the line — for sign-off before volume.",
      },
      {
        step: "05",
        title: "Production & delivery",
        body: "Batch-coded, palletised and loaded to your incoterms, with a production record issued per batch.",
      },
    ],
    benefits: [
      {
        title: "Launch without a factory",
        body: "A retail-ready range in a category you do not manufacture, without a line, a plant or a food safety programme of your own.",
      },
      {
        title: "Proven recipes as a starting point",
        body: "Begin from products already selling in domestic and export markets rather than from an untested formulation.",
      },
      {
        title: "Certification comes with the product",
        body: "Halal certification, EOS registration and a documented production record apply to your pack from the first batch.",
      },
      {
        title: "Our name stays off your pack",
        body: "Complete brand ownership. We are your manufacturer, not your co-brand.",
      },
    ],
    featured: true,
    order: 2,
  },
  {
    slug: "oem",
    title: "OEM Manufacturing",
    icon: "Settings2",
    tagline: "Your specification, run on our lines.",
    excerpt:
      "Contract manufacturing to your own formulation, process parameters and quality plan.",
    heroHeadline: "Contract manufacturing to your specification",
    heroSubline:
      "You bring the formulation and the quality plan. We bring the lines, the record and the capacity.",
    description: [
      "OEM differs from private label in who owns the specification. Here it is yours: your formulation, your process parameters, your quality plan, your testing regime. We provide validated capacity and the discipline to run your document without improvising.",
      "This is the right route for brands that already manufacture elsewhere and need additional capacity, a second source, or a production base closer to Mediterranean, Gulf and East African freight.",
    ],
    capabilities: [
      "Production to a client-owned formulation and process sheet",
      "Client quality plan executed and documented as written",
      "Client-supplied packaging materials accepted and reconciled",
      "Third-party and client audits hosted on site",
      "Retained samples held per batch for your shelf-life programme",
      "Capacity blocked in advance against a forecast",
    ],
    process: [
      {
        step: "01",
        title: "Technical review",
        body: "We assess your specification against our lines and tell you plainly what we can hold and what we cannot.",
      },
      {
        step: "02",
        title: "Agreement & quality plan",
        body: "Specification, tolerances, testing, retained samples, release criteria and non-conformance handling, all in writing.",
      },
      {
        step: "03",
        title: "Validation run",
        body: "A documented trial batch measured against every parameter in your plan, with full records issued for review.",
      },
      {
        step: "04",
        title: "Scheduled production",
        body: "Capacity blocked against your forecast so volume is available on the date you need it, not the date we are free.",
      },
      {
        step: "05",
        title: "Release & reporting",
        body: "Batch release against your criteria, with certificates of analysis and production records per batch.",
      },
    ],
    benefits: [
      {
        title: "Capacity without capital",
        body: "Add volume without building a line, hiring a shift or extending a plant.",
      },
      {
        title: "A credible second source",
        body: "Supply continuity if your primary plant goes down, validated in advance rather than in a crisis.",
      },
      {
        title: "Closer to three regions",
        body: "Badr City reaches Mediterranean, Gulf and East African markets in days rather than weeks.",
      },
      {
        title: "Your document, executed as written",
        body: "We run your specification, not our interpretation of it. Deviations are raised, never absorbed.",
      },
    ],
    featured: true,
    order: 3,
  },
  {
    slug: "export",
    title: "Export",
    icon: "Ship",
    tagline: "Packaged in four languages before we had a single container.",
    excerpt:
      "Export documentation, multi-language packaging and container loading from Badr City.",
    heroHeadline: "Built for export from the first pack",
    heroSubline:
      "Four languages on every pack, documentation handled in house, containers sealed on site.",
    description: [
      "Every retail pack we make carries Arabic, English, Chinese and Korean. That was true before we shipped our first container — we designed for export rather than adapting to it, which is why entering a new market is a documentation exercise rather than a packaging project.",
      "Badr City sits inside road reach of Alexandria, Ain Sokhna and Damietta, giving practical access to Mediterranean, Gulf and East African destinations. Containers are loaded, counted and sealed on site, with photographs issued to the buyer.",
    ],
    capabilities: [
      "Four-language packaging as standard on retail SKUs",
      "Certificate of origin, halal certificate and health certificate",
      "Commercial invoice, packing list and bill of lading preparation",
      "Destination-market label compliance review",
      "FCL and LCL consolidation",
      "Loading photographs and seal numbers issued per container",
    ],
    process: [
      {
        step: "01",
        title: "Market & compliance check",
        body: "We review your destination’s labelling, certification and import requirements before quoting, not after.",
      },
      {
        step: "02",
        title: "Order confirmation",
        body: "SKU mix, carton configuration, pallet plan, incoterms and delivery window agreed in writing.",
      },
      {
        step: "03",
        title: "Production & documentation",
        body: "Production scheduled while certificates and shipping documents are prepared in parallel.",
      },
      {
        step: "04",
        title: "Loading & sealing",
        body: "Loaded on site against the packing list, sealed under supervision, photographs and seal number issued.",
      },
      {
        step: "05",
        title: "Freight & tracking",
        body: "Booking coordinated to your incoterms, with documents released and shipment tracked to arrival.",
      },
    ],
    benefits: [
      {
        title: "No repackaging to enter a market",
        body: "Four languages are already on the pack. Most destinations need documentation, not a print run.",
      },
      {
        title: "Documentation handled in house",
        body: "Origin, halal and health certificates prepared alongside production rather than chased afterwards.",
      },
      {
        title: "Three regions in road reach",
        body: "Alexandria, Ain Sokhna and Damietta ports all reachable by road from Badr City.",
      },
      {
        title: "Verified loading",
        body: "Photographs and seal numbers per container, so what left the plant is not a matter of trust.",
      },
    ],
    featured: true,
    order: 4,
  },
  {
    slug: "distribution",
    title: "Distribution",
    icon: "Truck",
    tagline: "Territory partnerships, supported properly.",
    excerpt:
      "Domestic and regional distribution partnerships with agreed territories and reliable resupply.",
    heroHeadline: "Distribution partnerships that hold",
    heroSubline:
      "Defined territories, predictable resupply and trade support that does not evaporate after launch.",
    description: [
      "We work through distributors rather than around them. A partnership means a defined territory, agreed channel focus and a resupply rhythm you can plan a route around — not opportunistic dumping that undercuts the partner who built the market.",
      "Support continues after launch: point-of-sale material, shelf-ready cartons, seasonal artwork on the dried range, and enough forward visibility on production to keep a route stocked.",
    ],
    capabilities: [
      "Territory-based distribution agreements",
      "Domestic Egyptian retail and wholesale coverage",
      "Regional distributor appointment across MENA and East Africa",
      "Food-service and institutional catering supply",
      "Shelf-ready carton configurations",
      "Point-of-sale material and seasonal artwork support",
    ],
    process: [
      {
        step: "01",
        title: "Territory discussion",
        body: "Your market, channels, existing portfolio and coverage. We are looking for fit, not just an order.",
      },
      {
        step: "02",
        title: "Range selection",
        body: "The SKU mix that suits your channel — a focused launch list beats a full catalogue nobody lists.",
      },
      {
        step: "03",
        title: "Agreement",
        body: "Territory, volumes, support commitments and resupply lead times documented on both sides.",
      },
      {
        step: "04",
        title: "Launch",
        body: "Opening order, point-of-sale material and product training for your sales team.",
      },
      {
        step: "05",
        title: "Resupply & review",
        body: "Rolling forecast against production capacity, reviewed quarterly against actual offtake.",
      },
    ],
    benefits: [
      {
        title: "Territory you can invest behind",
        body: "Defined and respected, so the market you build is the market you keep.",
      },
      {
        title: "Predictable resupply",
        body: "Capacity reserved against your forecast, so a route is not lost to a stock-out.",
      },
      {
        title: "A range, not a single SKU",
        body: "Ten products across three formats to build a shelf presence rather than occupy one facing.",
      },
      {
        title: "Support after the launch order",
        body: "Point-of-sale material, seasonal artwork and a contact who answers within one business day.",
      },
    ],
    order: 5,
  },
];
