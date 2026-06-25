import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/admin/EditProductForm";
import VariantManager from "@/components/admin/VariantManager";
import ImageManager from "@/components/admin/ImageManager";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { variants: true, images: true, category: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display font-bold text-3xl tracking-tight text-ink mb-8">
          {product.name}
        </h1>
        <EditProductForm product={product} categories={categories} />
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-4">
          Images
        </p>
        <ImageManager productId={product.id} images={product.images} />
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-4">
          Variants (Size / Color / Stock)
        </p>
        <VariantManager productId={product.id} variants={product.variants} />
      </div>
    </div>
  );
}
