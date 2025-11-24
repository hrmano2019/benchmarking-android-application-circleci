import { PrismaClient } from "@prisma/client";
import { v4 as UUID } from "uuid";
import bcrypt from "bcryptjs";
import { seedVehicles } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { id: "admin", name: "Administrator" },
      { id: "user", name: "User" },
    ],
  });

  const paulPlay = await prisma.user.create({
    data: {
      id: "001-002-PAUL",
      name: "Paul Play",
      email: "paul@gmail.com",
      password: bcrypt.hashSync("password"),
      roleId: "admin",
    },
  });

  const peterParker = await prisma.user.create({
    data: {
      id: "001-002-PETER",
      name: "Peter Parker",
      email: "peter@gmail.com",
      password: bcrypt.hashSync("password"),
      roleId: "user",
    },
  });

  for (const p of seedVehicles) {
    const product = await prisma.product.create({
      data: {
        id: UUID(),
        name: p.name,
        description: p.description,
        price: p.price,
        brand: p.brand,
        slug: p.slug,
        stock: p.stock,
        tags: p.tags.join(","),
        type: p.type,
        userId: paulPlay.id,
      },
    });

    await prisma.productImage.createMany({
      data: p.images.map((img) => ({
        id: UUID(),
        image: img,
        productId: product.id,
      })),
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
