import { prisma } from "@/lib/prisma";
import { formatPriceINR } from "@/lib/format";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: { include: { variant: { include: { product: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display font-bold text-3xl tracking-tight text-ink mb-8">
        Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-stone-soft">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-line p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div>
                  <p className="font-mono text-xs text-stone-soft">
                    {order.id}
                  </p>
                  <p className="text-sm text-ink mt-1">
                    {order.user.name ?? order.user.email}
                  </p>
                </div>
                <OrderStatusSelect orderId={order.id} status={order.status} />
              </div>

              <div className="space-y-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-stone-soft">
                      {item.variant.product.name} ({item.variant.color},{" "}
                      {item.variant.size}) &times; {item.quantity}
                    </span>
                    <span className="font-mono text-ink">
                      {formatPriceINR(item.priceAtPurchase * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-medium text-sm mt-3 pt-3 border-t border-line">
                <span>Total</span>
                <span className="font-mono text-cognac">
                  {formatPriceINR(order.totalAmount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
