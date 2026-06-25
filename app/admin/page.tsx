import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPriceINR } from "@/lib/format";

export default async function AdminDashboardPage() {
  const [productCount, orderCount, pendingOrders, lowStockVariants, revenue] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.productVariant.findMany({
        where: { stock: { lte: 5, gt: 0 } },
        include: { product: true },
        take: 5,
      }),
      prisma.order.aggregate({
        where: { status: { not: "CANCELLED" } },
        _sum: { totalAmount: true },
      }),
    ]);

  return (
    <div>
      <h1 className="font-display font-bold text-3xl tracking-tight text-ink mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard label="Products" value={productCount.toString()} />
        <StatCard label="Total Orders" value={orderCount.toString()} />
        <StatCard label="Pending Orders" value={pendingOrders.toString()} />
        <StatCard
          label="Revenue"
          value={formatPriceINR(revenue._sum.totalAmount ?? 0)}
        />
      </div>

      {lowStockVariants.length > 0 && (
        <div className="border border-line p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-3">
            Low Stock Alert
          </p>
          <div className="space-y-2">
            {lowStockVariants.map((v) => (
              <div key={v.id} className="flex justify-between text-sm">
                <span className="text-ink">
                  {v.product.name} ({v.color}, {v.size})
                </span>
                <span className="font-mono text-cognac">{v.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <Link
          href="/admin/products/new"
          className="bg-ink text-paper font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-cognac transition-colors"
        >
          + Add Product
        </Link>
        <Link
          href="/admin/orders"
          className="border border-line text-ink font-mono text-xs uppercase tracking-widest px-6 py-3 hover:border-cognac transition-colors"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-stone-soft mb-2">
        {label}
      </p>
      <p className="font-display font-bold text-2xl text-ink">{value}</p>
    </div>
  );
}