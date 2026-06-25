import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPriceINR } from "@/lib/format";
import VariantSelector from "@/components/VariantSelector";
import StitchDivider from "@/components/StitchDivider";
import ProductGallery from "@/components/ProductGallery";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: { images: true, category: true },
  });

  if (!product) {
    return { title: "Product Not Found" };
  }

  const price = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.basePrice / 100);

  const image = product.images[0]?.url ?? "/og-image.jpg";

  return {
    title: product.name,
    description: `${product.description.slice(0, 150)}${product.description.length > 150 ? "…" : ""}`,
    openGraph: {
      title: `${product.name} | Anytime`,
      description: `${product.category.name} — starting at ${price}. ${product.description.slice(0, 120)}…`,
      url: `https://anytime-shoes.com/products/${slug}`,
      images: [
        {
          url: image,
          width: 600,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Anytime`,
      description: `${product.category.name} — starting at ${price}.`,
      images: [image],
    },
  };
}

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
          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-ink leading-tight">
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