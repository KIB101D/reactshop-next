import type { Product } from "../types";

function filterProducts(products: Product[], query: string) {
  const normalizedQuery = query.toLowerCase();

  const filtered = products.filter(
    (product) =>
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.tags.some((tag) => tag.includes(normalizedQuery)) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.categoryId.toLowerCase().includes(normalizedQuery) ||
      String(product.id) === query,
  );

  return filtered;
}

export default filterProducts;
