import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatPriceINR } from "@/lib/format";
import StitchDivider from "@/components/StitchDivider";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { variant: { include: { product: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <h1 className="font-display font-bold text-4xl tracking-tight text-ink mb-1">
        My Account
      </h1>
      <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-2">
        {session.user.email}
      </p>

      <div className="my-8">
        <StitchDivider />
      </div>

      <p className="font-mono text-xs uppercase tracking-widest text-stone-soft mb-6">
        Order History
      </p>

      {orders.length === 0 ? (
        <p className="text-stone-soft leading-relaxed">
          You haven&apos;t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-line p-5">
              {/* Order meta */}
              <div className="flex justify-between items-start gap-4 mb-4">
                <span className="font-mono text-xs text-stone-soft truncate">
                  {order.orderNumber}
                </span>
                <StatusBadge status={order.status} />
              </div>

              {/* Items */}
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-ink">
                      {item.variant.product.name}
                      <span className="font-mono text-xs text-stone-soft ml-2 uppercase tracking-widest">
                        {item.variant.color}, {item.variant.size} ×{" "}
                        {item.quantity}
                      </span>
                    </span>
                    <span className="font-mono text-sm text-ink whitespace-nowrap ml-4">
                      {formatPriceINR(item.priceAtPurchase * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-4">
                <StitchDivider />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-mono text-xs uppercase tracking-widest text-stone-soft">
                  Total
                </span>
                <span className="font-mono text-cognac">
                  {formatPriceINR(order.totalAmount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING:   "text-amber-600  bg-amber-50  border-amber-200",
    PAID:      "text-green-600  bg-green-50  border-green-200",
    SHIPPED:   "text-blue-600   bg-blue-50   border-blue-200",
    DELIVERED: "text-ink        bg-cream      border-line",
    CANCELLED: "text-red-600    bg-red-50    border-red-200",
  };

  return (
    <span
      className={`font-mono text-xs uppercase tracking-widest px-2 py-1 border flex-shrink-0 ${
        styles[status] ?? "text-stone-soft bg-cream border-line"
      }`}
    >
      {status}
    </span>
  );
}