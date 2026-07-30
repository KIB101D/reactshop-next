import type { Product } from "../types";

export function sortProductsByPrice(
  products: Product[],
  orderBy: "asc" | "desc",
) {
  const sorted = [...products];

  if (orderBy === "asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else {
    sorted.sort((a, b) => b.price - a.price);
  }

  return sorted;
}
