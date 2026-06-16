import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPriceINR } from "@/lib/format";
import StitchDivider from "@/components/StitchDivider";
import Reveal from "@/components/Reveal";
import HeroIntro from "@/components/HeroIntro";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { images: true, category: true },
    orderBy: { createdAt: "desc" },
  });

  const featured = products[0];

  return (
    <main>
      {/* Hero */}
      <HeroIntro featured={featured} />

      <div className="max-w-6xl mx-auto px-4">
        <StitchDivider />
      </div>

      {/* Collection */}
      <section id="collection" className="max-w-6xl mx-auto px-4 py-16">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-3xl sm:text-4xl tracking-wide text-ink">
              OUR COLLECTION
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-stone-soft">
              {products.length} {products.length === 1 ? "Style" : "Styles"}
            </p>
          </div>
        </Reveal>

        {products.length === 0 ? (
          <p className="text-stone-soft">No products available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index * 0.08, 0.3)}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-square bg-paper border border-line overflow-hidden">
                    {product.images[0] && (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].altText ?? product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-stone-soft mb-1">
                      {product.category.name}
                    </p>
                    <h3 className="text-lg text-ink inline-block group-hover:stitch-underline pb-1 transition-all duration-300">
                      {product.name}
                    </h3>
                    <p className="font-mono text-sm text-cognac mt-1">
                      {formatPriceINR(product.basePrice)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
