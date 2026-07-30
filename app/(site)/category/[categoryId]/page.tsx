import { getProducts } from "@/app/api/data";
import CategoryClient from "./CategoryClient";

type PageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params;
  const products = await getProducts();

  return <CategoryClient products={products} categoryId={categoryId} />;
}
