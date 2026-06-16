import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatPriceINR } from "@/lib/format";

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
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900 mb-1">My Account</h1>
      <p className="text-stone-600 mb-8">{session.user.email}</p>

      <h2 className="font-semibold text-stone-900 mb-4">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-stone-500">
          You haven&apos;t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-stone-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-center text-sm text-stone-500 mb-2 gap-4">
                <span className="font-mono truncate">{order.id}</span>
                <span className="flex-shrink-0 bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  {order.status}
                </span>
              </div>
              <div className="space-y-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-stone-700">
                      {item.variant.product.name} ({item.variant.color},{" "}
                      {item.variant.size}) x{item.quantity}
                    </span>
                    <span className="text-stone-900">
                      {formatPriceINR(item.priceAtPurchase * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-200 mt-2 pt-2 flex justify-between font-medium text-sm">
                <span>Total</span>
                <span>{formatPriceINR(order.totalAmount)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
