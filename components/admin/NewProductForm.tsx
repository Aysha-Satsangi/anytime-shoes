"use client";

import { useState } from "react";
import { createProduct, createCategory } from "@/lib/actions/admin";

export default function NewProductForm({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    basePrice: "",
    categoryId: categories[0]?.id ?? "",
  });
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState(categories);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleAddCategory() {
    if (!newCategory.trim()) return;
    const category = await createCategory(newCategory.trim());
    setCategoryList((prev) => [...prev, category]);
    setForm((prev) => ({ ...prev, categoryId: category.id }));
    setNewCategory("");
    setShowNewCategory(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.basePrice || !form.categoryId) {
      setError("Name, price, and category are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createProduct({
        name: form.name,
        description: form.description,
        basePrice: parseFloat(form.basePrice),
        categoryId: form.categoryId,
      });
      // createProduct redirects on success
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
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
          required
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
          required
          placeholder="e.g. 4999"
          className="w-full border border-line px-3 py-3 text-sm focus:outline-none focus:border-cognac"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-stone-soft mb-1">
          Category
        </label>
        {!showNewCategory ? (
          <div className="flex gap-2">
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="flex-1 border border-line px-3 py-3 text-sm focus:outline-none focus:border-cognac"
            >
              {categoryList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewCategory(true)}
              className="border border-line px-4 font-mono text-xs uppercase tracking-widest hover:border-cognac transition-colors"
            >
              + New
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              className="flex-1 border border-line px-3 py-3 text-sm focus:outline-none focus:border-cognac"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-ink text-paper px-4 font-mono text-xs uppercase tracking-widest hover:bg-cognac transition-colors"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="font-mono text-xs uppercase tracking-widest text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-ink text-paper font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-cognac transition-colors disabled:bg-line disabled:text-stone-soft"
      >
        {isSubmitting ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
}
