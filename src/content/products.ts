import type { Product } from "./types";

/**
 * Product catalogue.
 *
 * Names, on-pack translations, weights, nutrition and shelf life are taken from
 * the supplied packaging photography. Carton quantities and pallet configurations
 * are typical for each format and marked TODO(client) for confirmation.
 *
 * Deliberately absent: price, stock, currency, cart. This is a specification
 * catalogue for buyers, not a storefront.
 */

/** Nutrition panel printed on the bulk pack back panel, per 100 g. */
const friedNoodleNutrition = {
  energy: "367.2 kcal",
  protein: "12.1 %",
  fat: "0.084 %",
  carbohydrates: "78.4 g",
  sodiumChloride: "0.56 %",
};

const friedNoodleIngredients =
  "Wheat flour (72% extraction), palm oil, starch, salt, water, guar gum, xanthan gum, sodium bicarbonate, carboxymethyl cellulose, sodium benzoate, permitted food colour.";

export const products: Product[] = [
  /* ---------------------------------------------------------------
     INSTANT NOODLES — sachet, Classic Range
     --------------------------------------------------------------- */
  {
    slug: "spicy-beef-noodles",
    name: "Spicy Beef Noodles",
    nameZh: "香辣牛肉面",
    nameAr: "طعم لحم حار",
    category: "instant-noodles",
    tier: "Classic Range",
    tagline: "Our highest-volume flavour, and the one buyers reorder.",
    excerpt:
      "Chilli-forward beef broth with a clean finish. The Classic Range best-seller.",
    description: [
      "The flavour that built the range. A chilli-forward beef broth, balanced so the heat arrives after the savoury note rather than in front of it — the profile that performs in both Egyptian domestic retail and Gulf export markets.",
      "Flow-wrapped in printed film with a separate seasoning pouch, cartoned for distribution and coded for traceability. Nine months of ambient shelf life from the production date printed on every pack.",
    ],
    image: "/products/spicy-beef-noodles.png",
    gallery: ["/products/spicy-beef-noodles.png", "/products/noodles-1kg.png"],
    features: [
      "Halal certified across the full ingredient chain",
      "Four-language packaging: Arabic, English, Chinese, Korean",
      "Separate seasoning pouch for controlled dosing",
      "Nine-month ambient shelf life, no refrigeration",
      "Batch-coded on every pack for full traceability",
      "GS1-registered barcode, retail-ready in any market",
    ],
    specs: {
      netWeight: "70 g",
      shelfLife: "9 months from production date",
      packaging: "Flow-wrapped printed film sachet with seasoning pouch",
      cartonQuantity: "30 sachets per carton", // TODO(client): confirm.
      flavour: "Spicy beef",
      storage: "Store in a cool, dry place away from direct sunlight",
      origin: "Made in Egypt — Badr City, First Industrial Zone",
      ingredients: friedNoodleIngredients,
      nutrition: friedNoodleNutrition,
      barcode: "GS1 prefix 6 625000",
    },
    related: ["chicken-noodles", "spicy-beef-cup-noodles", "vegetable-noodles"],
    featured: true,
    order: 1,
  },
  {
    slug: "chicken-noodles",
    name: "Chicken Noodles",
    nameZh: "营养鸡汤面",
    nameAr: "طعم الفراخ",
    category: "instant-noodles",
    tier: "Classic Range",
    tagline: "The mild entry point. Broadest household appeal in the range.",
    excerpt:
      "A light, nourishing chicken broth. Mild enough for every household.",
    description: [
      "Marketed on-pack as 营养鸡汤面 — “nourishing chicken soup noodles”. A light, clear chicken broth with no chilli, which makes it the widest-appeal product in the range and the one that moves fastest in family-oriented retail.",
      "Same line, same film specification and same nine-month shelf life as the rest of the Classic Range. Where a distributor takes a single flavour to open a market, this is usually the one.",
    ],
    image: "/products/chicken-noodles.png",
    gallery: [
      "/products/chicken-noodles.png",
      "/products/chicken-noodles-cup.png",
    ],
    features: [
      "Halal certified across the full ingredient chain",
      "No added chilli — suitable for all age groups",
      "Four-language packaging as standard",
      "Nine-month ambient shelf life",
      "Batch-coded for full traceability",
      "Available in sachet and cup formats",
    ],
    specs: {
      netWeight: "70 g",
      shelfLife: "9 months from production date",
      packaging: "Flow-wrapped printed film sachet with seasoning pouch",
      cartonQuantity: "30 sachets per carton", // TODO(client): confirm.
      flavour: "Chicken",
      storage: "Store in a cool, dry place away from direct sunlight",
      origin: "Made in Egypt — Badr City, First Industrial Zone",
      ingredients: friedNoodleIngredients,
      nutrition: friedNoodleNutrition,
      barcode: "GS1 prefix 6 625000",
    },
    related: [
      "spicy-beef-noodles",
      "chicken-cup-noodles",
      "vegetable-noodles",
    ],
    featured: true,
    order: 2,
  },
  {
    slug: "vegetable-noodles",
    name: "Vegetables Noodles",
    nameZh: "风味蔬菜面",
    nameAr: "طعم الخضار",
    category: "instant-noodles",
    tier: "Classic Range",
    tagline: "No meat derivatives. Opens channels the others cannot.",
    excerpt:
      "A vegetable-seasoned broth with no meat derivatives in the sachet.",
    description: [
      "A vegetable-seasoned broth built without meat derivatives, which lets distributors place the range in vegetarian, institutional and school channels that a beef or chicken sachet cannot enter.",
      "The seasoning carries tomato and mixed vegetable notes rather than trying to imitate a meat broth — a decision that has held up better in repeat orders than the alternative.",
    ],
    image: "/products/vegetable-noodles.png",
    gallery: ["/products/vegetable-noodles.png", "/products/noodles-1kg.png"],
    features: [
      "No meat derivatives in the seasoning",
      "Halal certified across the full ingredient chain",
      "Suited to institutional and school catering channels",
      "Four-language packaging as standard",
      "Nine-month ambient shelf life",
      "Batch-coded for full traceability",
    ],
    specs: {
      netWeight: "70 g",
      shelfLife: "9 months from production date",
      packaging: "Flow-wrapped printed film sachet with seasoning pouch",
      cartonQuantity: "30 sachets per carton", // TODO(client): confirm.
      flavour: "Mixed vegetables",
      storage: "Store in a cool, dry place away from direct sunlight",
      origin: "Made in Egypt — Badr City, First Industrial Zone",
      ingredients: friedNoodleIngredients,
      nutrition: friedNoodleNutrition,
      barcode: "GS1 prefix 6 625000",
    },
    related: ["spicy-beef-noodles", "chicken-noodles", "egg-noodles"],
    order: 3,
  },

  /* ---------------------------------------------------------------
     CUP NOODLES
     --------------------------------------------------------------- */
  {
    slug: "braised-beef-cup-noodles",
    name: "Braised Beef Cup Noodles",
    nameZh: "红烧牛肉面",
    nameAr: "طعم اللحم",
    category: "cup-noodles",
    tier: "Cup Range",
    tagline: "The deepest broth we make. Three minutes, no bowl.",
    excerpt:
      "A rich braised beef broth in a sealed paper cup. Ready in three minutes.",
    description: [
      "红烧牛肉面 — braised beef — is the deepest, darkest broth in the range: soy-forward and slow-cooked in character rather than sharp. It is the flavour that convinces a first-time buyer the cup range is not an afterthought.",
      "Supplied in a sealed paper cup with a foil lid, seasoning sachet and fork insert. Requires only hot water, which is what makes it work in convenience retail, transport hubs and worksite catering.",
    ],
    image: "/products/braised-beef-noodles-cup.png",
    gallery: [
      "/products/braised-beef-noodles-cup.png",
      "/products/spicy-beef-noodles-cup.png",
    ],
    features: [
      "Ready in three minutes with hot water only",
      "Sealed foil lid with fork insert included",
      "Halal certified across the full ingredient chain",
      "Four-language packaging as standard",
      "Nine-month ambient shelf life",
      "Stackable cup geometry for efficient shelf and carton use",
    ],
    specs: {
      netWeight: "65 g",
      shelfLife: "9 months from production date",
      packaging: "Printed paper cup, sealed foil lid, seasoning sachet, fork",
      cartonQuantity: "12 cups per carton", // TODO(client): confirm.
      flavour: "Braised beef",
      storage: "Store in a cool, dry place away from direct sunlight",
      origin: "Made in Egypt — Badr City, First Industrial Zone",
      ingredients: friedNoodleIngredients,
      nutrition: friedNoodleNutrition,
      barcode: "GS1 prefix 6 625000",
    },
    related: [
      "spicy-beef-cup-noodles",
      "chicken-cup-noodles",
      "spicy-beef-noodles",
    ],
    featured: true,
    order: 4,
  },
  {
    slug: "spicy-beef-cup-noodles",
    name: "Spicy Beef Cup Noodles",
    nameZh: "香辣牛肉面",
    nameAr: "طعم لحم حار",
    category: "cup-noodles",
    tier: "Cup Range",
    tagline: "The sachet best-seller, in the format people eat at their desk.",
    excerpt: "Our best-selling spicy beef profile in a single-serve cup.",
    description: [
      "The same chilli-forward beef seasoning as our best-selling sachet, reformulated for the shorter hydration time a cup allows. Same flavour memory, no bowl required.",
      "Sold alongside the braised beef cup as a two-SKU beef proposition — one deep and savoury, one hot and bright. Distributors typically list both rather than choosing.",
    ],
    image: "/products/spicy-beef-noodles-cup.png",
    gallery: [
      "/products/spicy-beef-noodles-cup.png",
      "/products/spicy-beef-noodles.png",
    ],
    features: [
      "Ready in three minutes with hot water only",
      "Seasoning reformulated for cup hydration times",
      "Sealed foil lid with fork insert included",
      "Halal certified across the full ingredient chain",
      "Four-language packaging as standard",
      "Nine-month ambient shelf life",
    ],
    specs: {
      netWeight: "65 g",
      shelfLife: "9 months from production date",
      packaging: "Printed paper cup, sealed foil lid, seasoning sachet, fork",
      cartonQuantity: "12 cups per carton", // TODO(client): confirm.
      flavour: "Spicy beef",
      storage: "Store in a cool, dry place away from direct sunlight",
      origin: "Made in Egypt — Badr City, First Industrial Zone",
      ingredients: friedNoodleIngredients,
      nutrition: friedNoodleNutrition,
      barcode: "GS1 prefix 6 625000",
    },
    related: [
      "braised-beef-cup-noodles",
      "chicken-cup-noodles",
      "spicy-beef-noodles",
    ],
    order: 5,
  },
  {
    slug: "chicken-cup-noodles",
    name: "Chicken Cup Noodles",
    nameZh: "营养鸡汤面",
    nameAr: "طعم الفراخ",
    category: "cup-noodles",
    tier: "Cup Range",
    tagline: "The mild cup. Where the range meets institutional catering.",
    excerpt: "A light chicken broth in a single-serve sealed cup.",
    description: [
      "The mild option in the cup range: a light chicken broth with no chilli. This is the SKU that opens hospital, school and staff-catering channels where heat levels have to be predictable.",
      "Identical cup, lid and fork specification to the rest of the range, so a mixed pallet loads and stacks without adjustment.",
    ],
    image: "/products/chicken-noodles-cup.png",
    gallery: [
      "/products/chicken-noodles-cup.png",
      "/products/chicken-noodles.png",
    ],
    features: [
      "Ready in three minutes with hot water only",
      "No added chilli — predictable for institutional catering",
      "Sealed foil lid with fork insert included",
      "Halal certified across the full ingredient chain",
      "Four-language packaging as standard",
      "Mixed pallets load without adjustment",
    ],
    specs: {
      netWeight: "65 g",
      shelfLife: "9 months from production date",
      packaging: "Printed paper cup, sealed foil lid, seasoning sachet, fork",
      cartonQuantity: "12 cups per carton", // TODO(client): confirm.
      flavour: "Chicken",
      storage: "Store in a cool, dry place away from direct sunlight",
      origin: "Made in Egypt — Badr City, First Industrial Zone",
      ingredients: friedNoodleIngredients,
      nutrition: friedNoodleNutrition,
      barcode: "GS1 prefix 6 625000",
    },
    related: [
      "braised-beef-cup-noodles",
      "spicy-beef-cup-noodles",
      "chicken-noodles",
    ],
    order: 6,
  },

  /* ---------------------------------------------------------------
     DRIED NOODLES — handmade style
     --------------------------------------------------------------- */
  {
    slug: "wenzhou-noodles-yellow",
    name: "WenZhou Chinese Noodles",
    nameZh: "温州挂面",
    category: "dried-noodles",
    tier: "Handmade",
    tagline: "Three ingredients. Air-dried, never fried.",
    excerpt:
      "Air-dried handmade-style noodles in the WenZhou tradition. 500 g.",
    description: [
      "挂面 — literally “hung noodles” — are extruded, cut and hung to air-dry rather than steamed and fried. No oil enters the process, which is why the ingredient list is three items long and the finished noodle keeps a firm bite in soup.",
      "Sold as a 500 g retail pack with no seasoning, to cooks who are building their own broth. This is the range’s quiet credibility product: it is the one chefs buy twice.",
    ],
    image: "/products/wenzhou-noodles-yellow.png",
    gallery: [
      "/products/wenzhou-noodles-yellow.png",
      "/products/wenzhou-noodles-red.png",
    ],
    features: [
      "Air-dried, never fried — no oil in the process",
      "Three ingredients: wheat flour, water, salt",
      "Holds a firm bite in soup and stir-fry",
      "Unseasoned — for cooks building their own broth",
      "500 g retail pack",
      "Halal certified",
    ],
    specs: {
      netWeight: "500 g",
      shelfLife: "12 months from production date", // TODO(client): confirm.
      packaging: "Printed film retail pack",
      cartonQuantity: "20 packs per carton", // TODO(client): confirm.
      flavour: "Unseasoned",
      storage: "Store in a cool, dry place away from direct sunlight",
      origin: "Made in Egypt — Badr City, First Industrial Zone",
      ingredients: "Wheat flour, water, salt.",
      barcode: "GS1 prefix 6 625000",
    },
    related: ["wenzhou-noodles-red", "egg-noodles", "yummy-noodles-bulk"],
    featured: true,
    order: 7,
  },
  {
    slug: "wenzhou-noodles-red",
    name: "WenZhou Chinese Noodles — Red Pack",
    nameZh: "温州挂面",
    category: "dried-noodles",
    tier: "Handmade",
    tagline: "Same noodle, festive livery. Built for gifting season.",
    excerpt:
      "The WenZhou dried noodle in red festive packaging. 500 g.",
    description: [
      "The same air-dried WenZhou noodle in a red livery. Red is the colour of celebration across our Chinese and East Asian channels, and the pack is designed for gifting and festival-season display.",
      "Identical product specification to the yellow pack — the difference is purely artwork, which means a distributor can run seasonal display without a second product listing.",
    ],
    image: "/products/wenzhou-noodles-red.png",
    gallery: [
      "/products/wenzhou-noodles-red.png",
      "/products/wenzhou-noodles-yellow.png",
    ],
    features: [
      "Identical specification to the yellow pack",
      "Festive red livery for gifting and seasonal display",
      "Air-dried, never fried",
      "Three ingredients: wheat flour, water, salt",
      "500 g retail pack",
      "Halal certified",
    ],
    specs: {
      netWeight: "500 g",
      shelfLife: "12 months from production date", // TODO(client): confirm.
      packaging: "Printed film retail pack, festive livery",
      cartonQuantity: "20 packs per carton", // TODO(client): confirm.
      flavour: "Unseasoned",
      storage: "Store in a cool, dry place away from direct sunlight",
      origin: "Made in Egypt — Badr City, First Industrial Zone",
      ingredients: "Wheat flour, water, salt.",
      barcode: "GS1 prefix 6 625000",
    },
    related: ["wenzhou-noodles-yellow", "egg-noodles", "yummy-noodles-bulk"],
    order: 8,
  },
  {
    slug: "egg-noodles",
    name: "Egg Noodles Handmade",
    nameZh: "鸡蛋面",
    category: "dried-noodles",
    tier: "Handmade",
    tagline: "Egg in the dough. Richer colour, softer bite.",
    excerpt:
      "Handmade-style dried egg noodles with a richer colour and softer bite. 500 g.",
    description: [
      "鸡蛋面 — egg noodles. Egg is worked into the dough rather than added as a wash, which gives the finished noodle a deeper colour, a softer bite and a shorter cooking time than the plain WenZhou line.",
      "The same air-drying process and the same 500 g retail format. Where WenZhou goes into soup, this is the pack that goes into stir-fry and cold noodle dishes.",
    ],
    image: "/products/egg-noodles.png",
    gallery: [
      "/products/egg-noodles.png",
      "/products/wenzhou-noodles-yellow.png",
    ],
    features: [
      "Egg worked into the dough, not applied as a wash",
      "Softer bite and shorter cooking time",
      "Air-dried, never fried",
      "Suited to stir-fry and cold noodle dishes",
      "500 g retail pack",
      "Halal certified",
    ],
    specs: {
      netWeight: "500 g",
      shelfLife: "12 months from production date", // TODO(client): confirm.
      packaging: "Printed film retail pack",
      cartonQuantity: "20 packs per carton", // TODO(client): confirm.
      flavour: "Unseasoned, egg-enriched dough",
      storage: "Store in a cool, dry place away from direct sunlight",
      origin: "Made in Egypt — Badr City, First Industrial Zone",
      ingredients: "Wheat flour, egg, water, salt.",
      barcode: "GS1 prefix 6 625000",
    },
    related: [
      "wenzhou-noodles-yellow",
      "wenzhou-noodles-red",
      "yummy-noodles-bulk",
    ],
    featured: true,
    order: 9,
  },

  /* ---------------------------------------------------------------
     BULK / FOOD SERVICE
     --------------------------------------------------------------- */
  {
    slug: "yummy-noodles-bulk",
    name: "Yummy Noodles — Bulk Multi-Pack",
    nameZh: "好味道拉面",
    nameAr: "مكرونة شعرية",
    category: "instant-noodles",
    tier: "Food Service",
    tagline: "Noodle blocks without seasoning, for kitchens that season their own.",
    excerpt:
      "Unseasoned instant noodle blocks in a bulk multi-pack for food service.",
    description: [
      "A multi-pack of instant noodle blocks supplied without seasoning, for kitchens and manufacturers that add their own. This is the format behind much of our food-service and private-label volume.",
      "The back panel carries the full declaration our retail range is built on — 72% flour extraction, 12.1% protein, 367.2 kcal per 100 g, nine months of shelf life and a batch code. It is the same noodle; only the seasoning decision moves to the buyer.",
    ],
    image: "/products/noodles-1kg.png",
    gallery: ["/products/noodles-1kg.png", "/products/spicy-beef-noodles.png"],
    features: [
      "Supplied unseasoned — season to your own specification",
      "Full nutrition declaration printed on pack",
      "72% flour extraction, 12.1% protein",
      "Nine-month ambient shelf life",
      "Basis for most private-label and OEM programmes",
      "Halal certified across the full ingredient chain",
    ],
    specs: {
      netWeight: "Multi-pack — 5 × 70 g blocks", // TODO(client): confirm.
      shelfLife: "9 months from production date",
      packaging: "Printed film multi-pack, resealable after opening",
      cartonQuantity: "12 multi-packs per carton", // TODO(client): confirm.
      flavour: "Unseasoned noodle block",
      storage:
        "Store in a cool, dry place. Once opened, reseal the pack.",
      origin: "Made in Egypt — Badr City, First Industrial Zone",
      ingredients: friedNoodleIngredients,
      nutrition: friedNoodleNutrition,
      barcode: "6 625000 435018",
    },
    related: [
      "spicy-beef-noodles",
      "chicken-noodles",
      "wenzhou-noodles-yellow",
    ],
    order: 10,
  },
];
