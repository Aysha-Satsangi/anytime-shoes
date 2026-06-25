import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!session.user.isAdmin) {
    redirect("/");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10">
      <aside>
        <p className="font-mono text-xs uppercase tracking-widest text-cognac mb-4">
          Admin
        </p>
        <nav className="flex flex-col gap-3 font-mono text-sm">
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink hover:text-cognac transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div>{children}</div>
    </div>
  );
}