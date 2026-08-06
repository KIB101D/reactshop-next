import { Suspense } from "react";
import Hero from "@/app/components/Hero";
import { CategoryGrid } from "@/app/components/CategoryGrid";
import { FlashSale } from "@/app/components/FlashSale";
import { FeaturedProducts } from "@/app/components/FeaturedProducts";
import HomeSkeleton from "@/app/components/HomeSkeleton";
import { getCategories } from "@/app/lib/data/categories";
import {
  getFeaturedProducts,
  getFlashSaleProducts,
} from "@/app/lib/data/products";

async function HomeContent() {
  const [categories, flashProducts, featuredProducts] = await Promise.all([
    getCategories(),
    getFlashSaleProducts(),
    getFeaturedProducts(),
  ]);

  return (
    <div className="space-y-10 sm:space-y-16">
      <Hero />
      <CategoryGrid categories={categories} />
      <FlashSale products={flashProducts} />
      <FeaturedProducts products={featuredProducts} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
