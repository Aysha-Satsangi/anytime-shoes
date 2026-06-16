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

  // Re-fetch variants from the database so prices/stock can't be tampered
  // with on the client - this is the "source of truth"
  const variantIds = cartItems.map((i) => i.variantId);
  const variants = await prisma.productVariant.findMany({
    where: { id: { in: variantIds } },
    include: { product: true },
  });

  let totalAmount = 0;
  const orderItemsData = cartItems.map((ci) => {
    const variant = variants.find((v) => v.id === ci.variantId);
    if (!variant) {
      throw new Error(`Variant ${ci.variantId} no longer exists`);
    }
    if (variant.stock < ci.quantity) {
      throw new Error(`Not enough stock for SKU ${variant.sku}`);
    }

    const price = variant.priceOverride ?? variant.product.basePrice;
    totalAmount += price * ci.quantity;

    return {
      variantId: variant.id,
      quantity: ci.quantity,
      priceAtPurchase: price,
    };
  });

  // Find an existing user by email, or create a guest user record.
  // (Once login is added later, this same email will link to their account.)
  const user = await prisma.user.upsert({
    where: { email: shipping.email },
    update: {},
    create: {
      email: shipping.email,
      name: shipping.fullName,
    },
  });

  const order = await prisma.order.create({
    data: {
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
}