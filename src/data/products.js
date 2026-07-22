// Mock marketplace catalog for the USA salon shop (English only).
//
// This is the ONLY place product data is defined. Components never import it
// directly — they go through src/services/productService.js, so swapping to a
// real API later means editing that one service, not this file or the UI.
//
// Product shape: { id, name, category, price, description, image, badge?,
//                  inStock, featured? }. Prices are USD.

import serumAmber from "../assets/images/shop/serum-amber.webp";
import serumHand from "../assets/images/shop/serum-hand.webp";
import oilTrio from "../assets/images/shop/oil-trio.webp";
import hairOil from "../assets/images/shop/hair-oil.webp";
import soapDuo from "../assets/images/shop/soap-duo.webp";
import makeupFlatlay from "../assets/images/shop/makeup-flatlay.webp";
import brushSet from "../assets/images/shop/brush-set.webp";
import nailPolish from "../assets/images/shop/nail-polish.webp";
import ringDuo from "../assets/images/shop/ring-duo.webp";
import candle from "../assets/images/shop/candle.webp";
import turban from "../assets/images/shop/turban.webp";
import giftcard from "../assets/images/shop/giftcard.webp";

// Category order the filter bar follows (after the implicit "All").
export const CATEGORY_ORDER = [
  "Hair Care",
  "Skin & Body",
  "Makeup",
  "Tools",
  "Gifts & Sets",
];

export const PRODUCTS = [
  {
    id: "radiance-facial-serum",
    name: "Radiance Facial Serum",
    category: "Skin & Body",
    price: 68,
    description:
      "A weightless amber-glass elixir of botanical actives that drenches skin in moisture and leaves a lit-from-within glow. A few drops each evening is all it takes.",
    image: serumAmber,
    badge: "Best Seller",
    inStock: true,
    featured: true,
  },
  {
    id: "rosehip-glow-oil",
    name: "Rosehip Glow Oil",
    category: "Skin & Body",
    price: 54,
    description:
      "Cold-pressed rosehip and squalane melt in instantly to soften, brighten, and restore a healthy, dewy finish — never greasy.",
    image: serumHand,
    inStock: true,
  },
  {
    id: "nourishing-body-oil-trio",
    name: "Nourishing Body Oil Trio",
    category: "Skin & Body",
    price: 96,
    description:
      "Three of our most-loved body oils in a keepsake set — warm amber, soft neroli, and fresh green fig — for silky, fragranced skin head to toe.",
    image: oilTrio,
    badge: "Gift Set",
    inStock: true,
  },
  {
    id: "botanical-soap-duo",
    name: "Botanical Soap Duo",
    category: "Skin & Body",
    price: 28,
    description:
      "A pair of small-batch, cold-process bars — rose clay and green matcha — hand-cut and cured for a gentle, richly lathering cleanse.",
    image: soapDuo,
    inStock: true,
  },
  {
    id: "botanical-hair-elixir",
    name: "Botanical Hair Elixir",
    category: "Hair Care",
    price: 46,
    description:
      "A featherlight eucalyptus-and-argan treatment oil that tames frizz, adds mirror shine, and protects lengths from heat and humidity.",
    image: hairOil,
    inStock: true,
  },
  {
    id: "silk-wrap-turban",
    name: "Silk Wrap Turban",
    category: "Hair Care",
    price: 38,
    description:
      "A pure mulberry-silk wrap that dries hair gently and preserves your blowout overnight, reducing breakage and frizz while you sleep.",
    image: turban,
    inStock: true,
  },
  {
    id: "everyday-edit-makeup-set",
    name: "Everyday Edit Makeup Set",
    category: "Makeup",
    price: 120,
    description:
      "The curated capsule of warm neutrals we reach for daily — a soft-focus complexion, a wash of shimmer, and a your-lips-but-better finish.",
    image: makeupFlatlay,
    badge: "New",
    inStock: true,
  },
  {
    id: "gel-nail-lacquer",
    name: "Gel-Effect Nail Lacquer",
    category: "Makeup",
    price: 18,
    description:
      "A salon-grade, high-shine lacquer with a plush gel finish and chip-resistant wear — the same shades we use at the bar.",
    image: nailPolish,
    inStock: false,
  },
  {
    id: "artist-brush-collection",
    name: "Artist Brush Collection",
    category: "Tools",
    price: 88,
    description:
      "A weighted, vegan-fiber brush set that blends like a dream — everything you need for a flawless face, rolled in a soft travel wrap.",
    image: brushSet,
    inStock: true,
  },
  {
    id: "amber-neroli-candle",
    name: "Amber & Neroli Candle",
    category: "Gifts & Sets",
    price: 42,
    description:
      "Our signature scent poured into a hand-finished vessel — warm amber, white neroli, and a whisper of gold — for up to 55 hours of glow.",
    image: candle,
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: "gilded-stone-ring-set",
    name: "Gilded Stone Ring Set",
    category: "Gifts & Sets",
    price: 64,
    description:
      "Three stackable rings in gold-tone finish with natural stone accents — a delicate, everyday little luxury or a thoughtful gift.",
    image: ringDuo,
    inStock: true,
  },
  {
    id: "gift-card",
    name: "Digital Gift Card",
    category: "Gifts & Sets",
    price: 100,
    description:
      "Give the gift of a little indulgence. Redeemable across services and the marketplace — delivered by email with a personal note.",
    image: giftcard,
    inStock: true,
  },
];
