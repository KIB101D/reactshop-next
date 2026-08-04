export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  oldPrice?: number;
  isFeatured?: boolean;
  categoryId: string;
  description: string;
  tags: string[];
  rating: number;
};

export type FlashProduct = Product & {
  oldPrice: number;
};

export type Category = {
  id: string;
  name: string;
  image: string;
};

export type CartItem = Product & {
  quantity: number;
};
