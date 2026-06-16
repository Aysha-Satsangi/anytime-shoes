import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ---------------------------
  // Categories
  // ---------------------------
  const formal = await prisma.category.upsert({
    where: { slug: "formal-shoes" },
    update: {},
    create: { name: "Formal Shoes", slug: "formal-shoes" },
  });

  const loafers = await prisma.category.upsert({
    where: { slug: "loafers" },
    update: {},
    create: { name: "Loafers", slug: "loafers" },
  });

  const sneakers = await prisma.category.upsert({
    where: { slug: "casual-sneakers" },
    update: {},
    create: { name: "Casual Sneakers", slug: "casual-sneakers" },
  });

  // ---------------------------
  // Product 1: Oxford Leather Shoe
  // ---------------------------
  const oxford = await prisma.product.upsert({
    where: { slug: "oxford-leather-shoe" },
    update: {},
    create: {
      name: "Oxford Leather Shoe",
      slug: "oxford-leather-shoe",
      description:
        "Handcrafted premium leather oxford shoe, perfect for formal occasions. Made from full-grain leather with a durable sole.",
      basePrice: 499900, // ₹4,999.00
      categoryId: formal.id,
      isActive: true,
      images: {
        create: [
          {
            url: "https://placehold.co/600x600.png?text=Oxford+Front",
            altText: "Oxford Leather Shoe - front view",
          },
          {
            url: "https://placehold.co/600x600.png?text=Oxford+Side",
            altText: "Oxford Leather Shoe - side view",
          },
          {
            url: "https://placehold.co/600x600.png?text=Oxford+Sole",
            altText: "Oxford Leather Shoe - sole view",
          },
        ],
      },
      variants: {
        create: [
          { size: "8", color: "Brown", sku: "ANY-OXF-BRN-8", stock: 10 },
          { size: "9", color: "Brown", sku: "ANY-OXF-BRN-9", stock: 15 },
          { size: "9", color: "Black", sku: "ANY-OXF-BLK-9", stock: 8 },
          { size: "10", color: "Black", sku: "ANY-OXF-BLK-10", stock: 5 },
        ],
      },
    },
  });

  // ---------------------------
  // Product 2: Classic Penny Loafer
  // ---------------------------
  const loafer = await prisma.product.upsert({
    where: { slug: "classic-penny-loafer" },
    update: {},
    create: {
      name: "Classic Penny Loafer",
      slug: "classic-penny-loafer",
      description:
        "Slip-on penny loafers crafted from soft genuine leather. A versatile staple for both casual and semi-formal wear.",
      basePrice: 399900, // ₹3,999.00
      categoryId: loafers.id,
      isActive: true,
      images: {
        create: [
          {
            url: "https://placehold.co/600x600.png?text=Loafer+Front",
            altText: "Classic Penny Loafer - front view",
          },
          {
            url: "https://placehold.co/600x600.png?text=Loafer+Side",
            altText: "Classic Penny Loafer - side view",
          },
          {
            url: "https://placehold.co/600x600.png?text=Loafer+Sole",
            altText: "Classic Penny Loafer - sole view",
          },
        ],
      },
      variants: {
        create: [
          { size: "8", color: "Tan", sku: "ANY-LOA-TAN-8", stock: 12 },
          { size: "9", color: "Tan", sku: "ANY-LOA-TAN-9", stock: 10 },
          { size: "9", color: "Dark Brown", sku: "ANY-LOA-DBR-9", stock: 6 },
        ],
      },
    },
  });

  // ---------------------------
  // Product 3: Leather Sneaker
  // ---------------------------
  const sneaker = await prisma.product.upsert({
    where: { slug: "leather-low-top-sneaker" },
    update: {},
    create: {
      name: "Leather Low-Top Sneaker",
      slug: "leather-low-top-sneaker",
      description:
        "Minimalist low-top sneakers made from premium leather with a cushioned insole for all-day comfort.",
      basePrice: 349900, // ₹3,499.00
      categoryId: sneakers.id,
      isActive: true,
      images: {
        create: [
          {
            url: "https://placehold.co/600x600.png?text=Sneaker+Front",
            altText: "Leather Low-Top Sneaker - front view",
          },
          {
            url: "https://placehold.co/600x600.png?text=Sneaker+Side",
            altText: "Leather Low-Top Sneaker - side view",
          },
          {
            url: "https://placehold.co/600x600.png?text=Sneaker+Sole",
            altText: "Leather Low-Top Sneaker - sole view",
          },
        ],
      },
      variants: {
        create: [
          { size: "8", color: "White", sku: "ANY-SNK-WHT-8", stock: 20 },
          { size: "9", color: "White", sku: "ANY-SNK-WHT-9", stock: 18 },
          { size: "10", color: "Grey", sku: "ANY-SNK-GRY-10", stock: 7 },
        ],
      },
    },
  });

  console.log("Seeding finished.");
  console.log({ formal, loafers, sneakers, oxford, loafer, sneaker });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
