import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPriceINR } from "@/lib/format";
import StitchDivider from "@/components/StitchDivider";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          variant: {
            include: { product: true },
          },
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  const shipping = order.shippingAddress as {
    fullName: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-3">
          Order Confirmed
        </p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-ink">
          Thank You
        </h1>
        <p className="font-mono text-xs text-stone-soft mt-4">
          ORDER: {order.orderNumber}
        </p>
        <p className="inline-block mt-4 border border-line font-mono text-xs uppercase tracking-widest text-cognac px-3 py-2">
          Status: {order.status} &mdash; Payment integration coming soon
        </p>
      </div>

      <p className="font-mono text-xs uppercase tracking-widest text-stone-soft mb-3">
        Items
      </p>
      <div className="space-y-2">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm gap-2">
            <span className="text-stone-soft">
              {item.variant.product.name}
              <span className="block font-mono text-xs uppercase tracking-widest mt-0.5">
                {item.variant.color}, {item.variant.size} &times;{" "}
                {item.quantity}
              </span>
            </span>
            <span className="font-mono text-ink whitespace-nowrap">
              {formatPriceINR(item.priceAtPurchase * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="my-4">
        <StitchDivider />
      </div>

      <div className="flex justify-between items-center mb-10">
        <span className="font-display font-bold text-xl tracking-tight text-ink">
          Total
        </span>
        <span className="font-mono text-lg text-cognac">
          {formatPriceINR(order.totalAmount)}
        </span>
      </div>

      <p className="font-mono text-xs uppercase tracking-widest text-stone-soft mb-3">
        Shipping To
      </p>
      <div className="text-sm text-stone-soft leading-relaxed">
        <p className="text-ink">{shipping.fullName}</p>
        <p>{shipping.line1}</p>
        {shipping.line2 && <p>{shipping.line2}</p>}
        <p>
          {shipping.city}, {shipping.state} {shipping.postalCode}
        </p>
        <p>{shipping.country}</p>
        <p>{shipping.phone}</p>
      </div>

      <Link
        href="/"
        className="inline-block mt-10 bg-ink text-paper font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-cognac transition-colors"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
