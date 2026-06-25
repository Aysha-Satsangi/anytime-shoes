"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error("Not authorized");
  }
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createProduct(formData: {
  name: string;
  description: string;
  basePrice: number; // in rupees, converted to paise here
  categoryId: string;
}) {
  await requireAdmin();

  const product = await prisma.product.create({
    data: {
      name: formData.name,
      slug: slugify(formData.name),
      description: formData.description,
      basePrice: Math.round(formData.basePrice * 100),
      categoryId: formData.categoryId,
      isActive: true,
    },
  });

  revalidatePath("/admin/products");
  redirect(`/admin/products/${product.id}`);
}

export async function updateProduct(
  productId: string,
  formData: {
    name: string;
    description: string;
    basePrice: number;
    categoryId: string;
    isActive: boolean;
  }
) {
  await requireAdmin();

  await prisma.product.update({
    where: { id: productId },
    data: {
      name: formData.name,
      description: formData.description,
      basePrice: Math.round(formData.basePrice * 100),
      categoryId: formData.categoryId,
      isActive: formData.isActive,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
}

export async function deleteProduct(productId: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/admin/products");
}

export async function addVariant(
  productId: string,
  data: { size: string; color: string; sku: string; stock: number }
) {
  await requireAdmin();

  await prisma.productVariant.create({
    data: {
      productId,
      size: data.size,
      color: data.color,
      sku: data.sku,
      stock: data.stock,
    },
  });

  revalidatePath(`/admin/products/${productId}`);
}

export async function updateVariantStock(variantId: string, stock: number) {
  await requireAdmin();

  const variant = await prisma.productVariant.update({
    where: { id: variantId },
    data: { stock },
  });

  revalidatePath(`/admin/products/${variant.productId}`);
}

export async function deleteVariant(variantId: string) {
  await requireAdmin();

  const variant = await prisma.productVariant.delete({
    where: { id: variantId },
  });

  revalidatePath(`/admin/products/${variant.productId}`);
}

export async function addProductImage(productId: string, url: string, altText: string) {
  await requireAdmin();

  await prisma.productImage.create({
    data: { productId, url, altText },
  });

  revalidatePath(`/admin/products/${productId}`);
}

export async function deleteProductImage(imageId: string) {
  await requireAdmin();

  const image = await prisma.productImage.delete({
    where: { id: imageId },
  });

  revalidatePath(`/admin/products/${image.productId}`);
}

export async function updateOrderStatus(
  orderId: string,
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED"
) {
  await requireAdmin();

  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  revalidatePath("/admin/orders");
}

export async function createCategory(name: string) {
  await requireAdmin();

  const category = await prisma.category.create({
    data: { name, slug: slugify(name) },
  });

  revalidatePath("/admin/products");
  return category;
}