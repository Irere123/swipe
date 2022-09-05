import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.get("/", (_req, res) => {
    res.send("Hello world");
  });
  app.listen(4000, () => {
    console.log("🚀🚀🚀 Running API server at http://localhost:4000");
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
