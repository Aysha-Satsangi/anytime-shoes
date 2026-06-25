import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPriceINR } from "@/lib/format";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true, variants: true, images: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-3xl tracking-tight text-ink">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="bg-ink text-paper font-mono text-xs uppercase tracking-widest px-5 py-3 hover:bg-cognac transition-colors"
        >
          + Add Product
        </Link>
      </div>

      <div className="divide-y divide-line border-y border-line">
        {products.map((product) => {
          const totalStock = product.variants.reduce(
            (sum, v) => sum + v.stock,
            0
          );
          return (
            <Link
              key={product.id}
              href={`/admin/products/${product.id}`}
              className="flex items-center justify-between py-4 hover:bg-cream transition-colors -mx-2 px-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-paper border border-line flex-shrink-0" />
                <div>
                  <p className="text-ink">{product.name}</p>
                  <p className="font-mono text-xs text-stone-soft">
                    {product.category.name} &middot; {product.variants.length}{" "}
                    variants &middot; {totalStock} in stock
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-cognac">
                  {formatPriceINR(product.basePrice)}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 ${
                    product.isActive
                      ? "bg-cream text-ink"
                      : "bg-line text-stone-soft"
                  }`}
                >
                  {product.isActive ? "Active" : "Hidden"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
