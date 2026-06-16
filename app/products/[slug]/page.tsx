import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPriceINR } from "@/lib/format";
import VariantSelector from "@/components/VariantSelector";
import StitchDivider from "@/components/StitchDivider";
import ProductGallery from "@/components/ProductGallery";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: {
      images: true,
      variants: true,
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Details */}
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-3">
            {product.category.name}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl tracking-wide text-ink leading-tight">
            {product.name}
          </h1>
          <p className="font-mono text-xl text-cognac mt-4">
            {formatPriceINR(product.basePrice)}
          </p>
          <p className="mt-6 text-stone-soft leading-relaxed">
            {product.description}
          </p>

          <div className="my-8">
            <StitchDivider />
          </div>

          <VariantSelector
            variants={product.variants}
            basePrice={product.basePrice}
            productSlug={product.slug}
            productName={product.name}
            image={product.images[0]?.url ?? null}
          />
        </div>
      </div>
    </main>
  );
}
