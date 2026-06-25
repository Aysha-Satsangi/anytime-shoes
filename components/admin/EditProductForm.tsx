"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct, deleteProduct } from "@/lib/actions/admin";

type Product = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  categoryId: string;
  isActive: boolean;
};

export default function EditProductForm({
  product,
  categories,
}: {
  product: Product;
  categories: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    basePrice: (product.basePrice / 100).toString(),
    categoryId: product.categoryId,
    isActive: product.isActive,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    await updateProduct(product.id, {
      name: form.name,
      description: form.description,
      basePrice: parseFloat(form.basePrice),
      categoryId: form.categoryId,
      isActive: form.isActive,
    });
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  async function handleDelete() {
    if (
      !confirm(
        `Delete "${product.name}" permanently? This cannot be undone.`
      )
    ) {
      return;
    }
    await deleteProduct(product.id);
    router.push("/admin/products");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-stone-soft mb-1">
          Product Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-line px-3 py-3 text-sm focus:outline-none focus:border-cognac"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-stone-soft mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-line px-3 py-3 text-sm focus:outline-none focus:border-cognac"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-stone-soft mb-1">
          Base Price (&#8377;)
        </label>
        <input
          name="basePrice"
          type="number"
          step="0.01"
          min="0"
          value={form.basePrice}
          onChange={handleChange}
          className="w-full border border-line px-3 py-3 text-sm focus:outline-none focus:border-cognac"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-stone-soft mb-1">
          Category
        </label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border border-line px-3 py-3 text-sm focus:outline-none focus:border-cognac"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-soft">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        Visible on store
      </label>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSaving}
          className="bg-ink text-paper font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-cognac transition-colors disabled:bg-line"
        >
          {isSaving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="font-mono text-xs uppercase tracking-widest text-red-600 hover:underline"
        >
          Delete Product
        </button>
      </div>
    </form>
  );
}
