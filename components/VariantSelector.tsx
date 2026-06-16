"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

type Variant = {
  id: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
  priceOverride: number | null;
};

export default function VariantSelector({
  variants,
  basePrice,
  productSlug,
  productName,
  image,
}: {
  variants: Variant[];
  basePrice: number;
  productSlug: string;
  productName: string;
  image: string | null;
}) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const colors = useMemo(
    () => Array.from(new Set(variants.map((v) => v.color))),
    [variants],
  );

  const [selectedColor, setSelectedColor] = useState<string>(colors[0] ?? "");

  const sizesForColor = useMemo(
    () => variants.filter((v) => v.color === selectedColor),
    [variants, selectedColor],
  );

  const [selectedSize, setSelectedSize] = useState<string>(
    sizesForColor[0]?.size ?? "",
  );

  const selectedVariant = useMemo(
    () =>
      variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize,
      ),
    [variants, selectedColor, selectedSize],
  );

  function handleColorChange(color: string) {
    setSelectedColor(color);
    const firstAvailable = variants.find((v) => v.color === color);
    setSelectedSize(firstAvailable?.size ?? "");
  }

  function handleAddToCart() {
    if (!selectedVariant) return;
    addToCart({
      variantId: selectedVariant.id,
      productSlug,
      productName,
      image,
      color: selectedColor,
      size: selectedSize,
      price: selectedVariant.priceOverride ?? basePrice,
      sku: selectedVariant.sku,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  const isOutOfStock = selectedVariant ? selectedVariant.stock === 0 : true;

  return (
    <div>
      {/* Color picker */}
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-stone-soft mb-3">
          Color
        </p>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorChange(color)}
              className={`px-4 py-2 border font-mono text-xs uppercase tracking-widest transition-colors ${
                selectedColor === color
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink hover:border-cognac"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Size picker */}
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-stone-soft mb-3">
          Size (UK)
        </p>
        <div className="flex gap-2 flex-wrap">
          {sizesForColor.map((variant) => (
            <button
              key={variant.id}
              type="button"
              disabled={variant.stock === 0}
              onClick={() => setSelectedSize(variant.size)}
              className={`w-12 h-12 border font-mono text-sm transition-colors ${
                selectedSize === variant.size
                  ? "border-ink bg-ink text-paper"
                  : variant.stock === 0
                    ? "border-line text-stone-soft/40 cursor-not-allowed line-through"
                    : "border-line text-ink hover:border-cognac"
              }`}
            >
              {variant.size}
            </button>
          ))}
        </div>
      </div>

      {/* Stock status */}
      <p className="font-mono text-xs uppercase tracking-widest mb-6">
        {isOutOfStock ? (
          <span className="text-red-600">Out of Stock</span>
        ) : selectedVariant && selectedVariant.stock <= 5 ? (
          <span className="text-cognac">
            Only {selectedVariant.stock} Left In Stock
          </span>
        ) : (
          <span className="text-stone-soft">In Stock</span>
        )}
      </p>

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className="btn-press w-full bg-ink text-paper font-mono text-xs uppercase tracking-widest py-4 hover:bg-cognac transition-colors disabled:bg-line disabled:text-stone-soft disabled:cursor-not-allowed overflow-hidden relative h-[52px]"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isOutOfStock ? "out" : justAdded ? "added" : "add"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isOutOfStock
              ? "Out of Stock"
              : justAdded
                ? "Added to Cart"
                : "Add to Cart"}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
