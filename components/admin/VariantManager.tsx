"use client";

import { useState } from "react";
import { addVariant, updateVariantStock, deleteVariant } from "@/lib/actions/admin";

type Variant = {
  id: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
};

export default function VariantManager({
  productId,
  variants,
}: {
  productId: string;
  variants: Variant[];
}) {
  const [newVariant, setNewVariant] = useState({
    size: "",
    color: "",
    sku: "",
    stock: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!newVariant.size || !newVariant.color || !newVariant.sku) {
      setError("Size, color, and SKU are required.");
      return;
    }

    setIsAdding(true);
    try {
      await addVariant(productId, {
        size: newVariant.size,
        color: newVariant.color,
        sku: newVariant.sku,
        stock: parseInt(newVariant.stock || "0", 10),
      });
      setNewVariant({ size: "", color: "", sku: "", stock: "" });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not add variant (SKU may already exist)."
      );
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div>
      <div className="border border-line">
        <div className="grid grid-cols-[1fr_1fr_1fr_100px_80px] gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-stone-soft border-b border-line">
          <span>Size</span>
          <span>Color</span>
          <span>SKU</span>
          <span>Stock</span>
          <span></span>
        </div>

        {variants.map((variant) => (
          <VariantRow key={variant.id} variant={variant} />
        ))}

        <form
          onSubmit={handleAdd}
          className="grid grid-cols-[1fr_1fr_1fr_100px_80px] gap-2 px-4 py-3 items-center"
        >
          <input
            placeholder="9"
            value={newVariant.size}
            onChange={(e) =>
              setNewVariant((prev) => ({ ...prev, size: e.target.value }))
            }
            className="border border-line px-2 py-2 text-sm focus:outline-none focus:border-cognac"
          />
          <input
            placeholder="Brown"
            value={newVariant.color}
            onChange={(e) =>
              setNewVariant((prev) => ({ ...prev, color: e.target.value }))
            }
            className="border border-line px-2 py-2 text-sm focus:outline-none focus:border-cognac"
          />
          <input
            placeholder="ANY-XXX-9"
            value={newVariant.sku}
            onChange={(e) =>
              setNewVariant((prev) => ({ ...prev, sku: e.target.value }))
            }
            className="border border-line px-2 py-2 text-sm font-mono focus:outline-none focus:border-cognac"
          />
          <input
            type="number"
            min="0"
            placeholder="0"
            value={newVariant.stock}
            onChange={(e) =>
              setNewVariant((prev) => ({ ...prev, stock: e.target.value }))
            }
            className="border border-line px-2 py-2 text-sm focus:outline-none focus:border-cognac"
          />
          <button
            type="submit"
            disabled={isAdding}
            className="bg-ink text-paper font-mono text-[10px] uppercase tracking-widest py-2 hover:bg-cognac transition-colors disabled:bg-line"
          >
            {isAdding ? "..." : "+ Add"}
          </button>
        </form>
      </div>

      {error && (
        <p className="font-mono text-xs uppercase tracking-widest text-red-600 mt-2">
          {error}
        </p>
      )}
    </div>
  );
}

function VariantRow({ variant }: { variant: Variant }) {
  const [stock, setStock] = useState(variant.stock.toString());
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleStockBlur() {
    const parsed = parseInt(stock, 10);
    if (!isNaN(parsed) && parsed !== variant.stock) {
      await updateVariantStock(variant.id, parsed);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete variant ${variant.color} / ${variant.size}?`)) return;
    setIsDeleting(true);
    await deleteVariant(variant.id);
  }

  return (
    <div
      className={`grid grid-cols-[1fr_1fr_1fr_100px_80px] gap-2 px-4 py-3 items-center border-b border-line text-sm ${
        isDeleting ? "opacity-40" : ""
      }`}
    >
      <span className="text-ink">{variant.size}</span>
      <span className="text-ink">{variant.color}</span>
      <span className="font-mono text-xs text-stone-soft">{variant.sku}</span>
      <input
        type="number"
        min="0"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        onBlur={handleStockBlur}
        className={`border px-2 py-1 text-sm w-20 focus:outline-none focus:border-cognac ${
          variant.stock <= 5 ? "border-cognac" : "border-line"
        }`}
      />
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="font-mono text-[10px] uppercase tracking-widest text-red-600 hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
