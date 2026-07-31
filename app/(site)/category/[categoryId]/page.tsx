import type { Metadata } from "next";
import { getProducts } from "@/app/utils/data";
import CategoryClient from "./CategoryClient";

type PageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { categoryId } = await params;

  return {
    title: `${categoryId} — ReactShop`,
    description: `Shop the best ${categoryId} at ReactShop.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params;
  const products = await getProducts();

  return <CategoryClient products={products} categoryId={categoryId} />;
}
