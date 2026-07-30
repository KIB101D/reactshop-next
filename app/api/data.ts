import { readFile } from "fs/promises";
import path from "path";
import type { Product, Category } from "../types";

export async function getCategories(): Promise<Category[]> {
  const filePath = path.join(process.cwd(), "public/data/categories.json");
  const file = await readFile(filePath, "utf-8");
  return JSON.parse(file);
}

export async function getProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "public/data/products.json");
  const file = await readFile(filePath, "utf-8");
  return JSON.parse(file);
}
