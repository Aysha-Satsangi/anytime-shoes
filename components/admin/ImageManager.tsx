"use client";

import { useState } from "react";
import Image from "next/image";
import { addProductImage, deleteProductImage } from "@/lib/actions/admin";

type ProductImage = {
  id: string;
  url: string;
  altText: string | null;
};

export default function ImageManager({
  productId,
  images,
}: {
  productId: string;
  images: ProductImage[];
}) {
  const [newImage, setNewImage] = useState({ url: "", altText: "" });
  const [isAdding, setIsAdding] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newImage.url) return;

    setIsAdding(true);
    await addProductImage(
      productId,
      newImage.url,
      newImage.altText || "Product image"
    );
    setNewImage({ url: "", altText: "" });
    setIsAdding(false);
  }

  async function handleDelete(imageId: string) {
    if (!confirm("Remove this image?")) return;
    await deleteProductImage(imageId);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <div className="relative w-24 h-24 border border-line overflow-hidden">
              <Image
                src={image.url}
                alt={image.altText ?? "Product image"}
                fill
                sizes="96px"
                unoptimized
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => handleDelete(image.id)}
              className="absolute -top-2 -right-2 bg-ink text-paper w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleAdd} className="flex flex-wrap gap-2 max-w-xl">
        <input
          placeholder="Image URL (e.g. from Cloudinary)"
          value={newImage.url}
          onChange={(e) =>
            setNewImage((prev) => ({ ...prev, url: e.target.value }))
          }
          className="flex-1 min-w-[200px] border border-line px-3 py-2 text-sm focus:outline-none focus:border-cognac"
        />
        <input
          placeholder="Alt text (optional)"
          value={newImage.altText}
          onChange={(e) =>
            setNewImage((prev) => ({ ...prev, altText: e.target.value }))
          }
          className="flex-1 min-w-[150px] border border-line px-3 py-2 text-sm focus:outline-none focus:border-cognac"
        />
        <button
          type="submit"
          disabled={isAdding}
          className="bg-ink text-paper font-mono text-xs uppercase tracking-widest px-5 py-2 hover:bg-cognac transition-colors disabled:bg-line"
        >
          + Add
        </button>
      </form>
      <p className="font-mono text-[10px] text-stone-soft mt-2">
        Paste a direct image URL for now &mdash; direct upload via Cloudinary
        is coming soon.
      </p>
    </div>
  );
}
