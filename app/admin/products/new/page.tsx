import { prisma } from "@/lib/prisma";
import NewProductForm from "@/components/admin/NewProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="font-display font-bold text-3xl tracking-tight text-ink mb-8">
        Add Product
      </h1>
      <NewProductForm categories={categories} />
    </div>
  );
}
