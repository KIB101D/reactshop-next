import { Suspense } from "react";
import { getCategories } from "@/app/utils/data";
import { CategoryGrid } from "@/app/components/CategoryGrid";
import HomeSkeleton from "../components/HomeSkeleton";

async function HomeContent() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const categories = await getCategories();

  return (
    <div>
      <CategoryGrid categories={categories} />
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
