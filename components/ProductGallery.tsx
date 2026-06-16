"use client";

import { useState } from "react";
import Image from "next/image";

type GalleryImage = {
  url: string;
  altText: string | null;
};

export default function ProductGallery({
  images,
  productName,
}: {
  images: GalleryImage[];
  productName: string;
}) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return <div className="aspect-square bg-paper border border-line" />;
  }

  const activeImage = images[selected];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-3 order-2 sm:order-1 overflow-x-auto sm:overflow-visible">
          {images.map((image, index) => (
            <button
              key={image.url + index}
              type="button"
              onClick={() => setSelected(index)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border overflow-hidden transition-colors ${
                selected === index
                  ? "border-ink"
                  : "border-line hover:border-cognac"
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText ?? `${productName} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                unoptimized
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 aspect-square bg-paper border border-line overflow-hidden order-1 sm:order-2">
        <Image
          src={activeImage.url}
          alt={activeImage.altText ?? productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}