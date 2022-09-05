import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const seed = async () => {};

seed()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
