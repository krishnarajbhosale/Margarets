// Data-access layer for the marketplace.
//
// Everything the shop UI needs to read products goes through these async
// functions. Today they resolve local mock data; to plug in a real backend
// later, replace the bodies with fetch()/axios calls to your API — the return
// shapes and this file's exports are the contract, so no component changes.

import { PRODUCTS, CATEGORY_ORDER } from "../data/products.js";

// Simulate a tiny network latency so loading states are real and the swap to a
// real API doesn't change perceived behavior. Set to 0 to disable.
const MOCK_LATENCY_MS = 250;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** All products. Later: `return (await fetch('/api/products')).json()`. */
export async function getProducts() {
  await delay(MOCK_LATENCY_MS);
  return PRODUCTS;
}

/** One product by id, or null. Later: `GET /api/products/:id`. */
export async function getProductById(id) {
  await delay(MOCK_LATENCY_MS);
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

/**
 * Distinct categories in display order, prefixed with "All". Derived from the
 * data so the filter bar never hardcodes categories. Later this could be its
 * own `GET /api/categories` endpoint.
 */
export async function getCategories() {
  await delay(MOCK_LATENCY_MS);
  const present = new Set(PRODUCTS.map((p) => p.category));
  const ordered = CATEGORY_ORDER.filter((c) => present.has(c));
  // Include any category not covered by CATEGORY_ORDER, just in case.
  for (const c of present) if (!ordered.includes(c)) ordered.push(c);
  return ["All", ...ordered];
}
