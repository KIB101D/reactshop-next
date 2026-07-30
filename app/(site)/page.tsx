// app/(site)/page.tsx
import { getCategories } from "../api/data";
import { CategoryGrid } from "../components/CategoryGrid";

export default async function Home() {
  const categories = await getCategories();
  return <CategoryGrid categories={categories} />;
}
