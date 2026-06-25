"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/lib/actions/admin";

type Status = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export default function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: Status;
}) {
  const [current, setCurrent] = useState<Status>(status);
  const [isSaving, setIsSaving] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as Status;
    setCurrent(newStatus);
    setIsSaving(true);
    await updateOrderStatus(orderId, newStatus);
    setIsSaving(false);
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      disabled={isSaving}
      className="border border-line px-3 py-2 font-mono text-xs uppercase tracking-widest focus:outline-none focus:border-cognac"
    >
      <option value="PENDING">Pending</option>
      <option value="PAID">Paid</option>
      <option value="SHIPPED">Shipped</option>
      <option value="DELIVERED">Delivered</option>
      <option value="CANCELLED">Cancelled</option>
    </select>
  );
}
