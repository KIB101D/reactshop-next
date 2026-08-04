import { readFile } from "fs/promises";
import path from "path";
import type { FlashProduct, Product } from "../../types";

export async function getProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "public/data/products.json");
  const file = await readFile(filePath, "utf-8");
  return JSON.parse(file);
}

export async function getFlashSaleProducts(): Promise<FlashProduct[]> {
  const products = await getProducts();
  const flashSaleIds = [1, 2, 19, 23];

  return products
    .filter((p) => flashSaleIds.includes(p.id))
    .map((p) => ({
      ...p,
      oldPrice: Math.round(p.price * 1.25),
    }));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.rating >= 4.5).slice(0, 8);
}
