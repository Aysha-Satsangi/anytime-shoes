"use server";

import { prisma } from "@/lib/prisma";

type ShippingInfo = {
  email: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
};

type CartItemInput = {
  variantId: string;
  quantity: number;
};

// No I, O, 0, 1 to avoid customer confusion when reading aloud
function generateOrderNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ANT-${code}`;
}

export async function createOrder({
  cartItems,
  shipping,
}: {
  cartItems: CartItemInput[];
  shipping: ShippingInfo;
}) {
  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const variantIds = cartItems.map((i) => i.variantId);

  const orderId = await prisma.$transaction(async (tx) => {
    // 1. Re-fetch variants inside the transaction
    const variants = await tx.productVariant.findMany({
      where: { id: { in: variantIds } },
      include: { product: true },
    });

    // 2. Validate stock and build order items
    let totalAmount = 0;
    const orderItemsData = cartItems.map((ci) => {
      const variant = variants.find((v) => v.id === ci.variantId);
      if (!variant) {
        throw new Error(`Variant ${ci.variantId} no longer exists`);
      }
      if (variant.stock < ci.quantity) {
        throw new Error(
          `Sorry, only ${variant.stock} pair(s) of size ${variant.size} (${variant.color}) are left in stock.`,
        );
      }

      const price = variant.priceOverride ?? variant.product.basePrice;
      totalAmount += price * ci.quantity;

      return {
        variantId: variant.id,
        quantity: ci.quantity,
        priceAtPurchase: price,
      };
    });

    // 3. Decrement stock atomically
    await Promise.all(
      cartItems.map((ci) =>
        tx.productVariant.update({
          where: { id: ci.variantId },
          data: { stock: { decrement: ci.quantity } },
        }),
      ),
    );

    // 4. Upsert user
    const user = await tx.user.upsert({
      where: { email: shipping.email },
      update: {},
      create: {
        email: shipping.email,
        name: shipping.fullName,
      },
    });

    // 5. Create order with friendly order number
    const order = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: user.id,
        totalAmount,
        currency: "INR",
        status: "PENDING",
        shippingAddress: shipping,
        items: {
          create: orderItemsData,
        },
      },
    });

    return order.id;
  });

  return orderId;
}
