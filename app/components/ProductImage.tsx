"use client";

import { useState } from "react";
import Image from "next/image";

type ProductImageProps = {
  src: string;
  alt: string;
  sizes?: string;
};

function ProductImage({
  src,
  alt,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100">
        <span className="text-xs text-gray-400">No image</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      onError={() => setImageError(true)}
      className="object-cover transition duration-300 hover:scale-105"
    />
  );
}

export default ProductImage;
