import { readFile } from "fs/promises";
import path from "path";
import type { Product } from "../../types";

export async function getProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "public/data/products.json");
  const file = await readFile(filePath, "utf-8");
  return JSON.parse(file);
}

export async function getFlashSaleProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.isFlashSale);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.rating >= 4.5).slice(0, 8);
}
