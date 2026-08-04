import { readFile } from "fs/promises";
import path from "path";
import type { Category } from "../../types";

export async function getCategories(): Promise<Category[]> {
  const filePath = path.join(process.cwd(), "public/data/categories.json");
  const file = await readFile(filePath, "utf-8");
  return JSON.parse(file);
}
