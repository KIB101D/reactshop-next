import type { Metadata } from "next";
import { getProducts } from "@/app/utils/data";
import ProductDetailsClient from "./ProductDetailsClient";

type PageProps = {
  params: Promise<{
    categoryId: string;
    productId: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { productId } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.title} — ReactShop`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { categoryId, productId } = await params;
  const products = await getProducts();

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return (
      <div className="p-20 text-3xl font-semibold flex items-center justify-center min-h-[50vh] font-heading">
        Product not found
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .filter((p) => p.tags?.some((tag) => product.tags?.includes(tag)))
    .slice(0, 3);

  return (
    <ProductDetailsClient
      product={product}
      relatedProducts={relatedProducts}
      categoryId={categoryId}
    />
  );
}
