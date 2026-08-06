import { getProducts } from "@/app/lib/data/products";
import filterProducts from "@/app/utils/filterProducts";
import SearchClient from "./SearchClient";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q || "";

  const products = await getProducts();
  const filtered = filterProducts(products, query);

  return <SearchClient filtered={filtered} query={query} />;
}
