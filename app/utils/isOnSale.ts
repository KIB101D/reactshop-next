import type { Product } from "@/app/types";

type Priced = Pick<Product, "price" | "oldPrice">;

/**
 * Single source of truth for "is this product discounted".
 * Type guard: inside `if (isOnSale(p))` TypeScript knows `p.oldPrice` is a number.
 */
export const isOnSale = <T extends Priced>(
  product: T,
): product is T & { oldPrice: number } =>
  product.oldPrice !== undefined && product.oldPrice > product.price;
