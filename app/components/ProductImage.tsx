import { useState } from "react";

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100">
        <span className="text-xs text-gray-400">No image</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImageError(true)}
      className="object-cover w-full h-full transition duration-300 hover:scale-105"
    />
  );
}

export default ProductImage;
