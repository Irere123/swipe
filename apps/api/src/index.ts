import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  app.use(cors({ origin: "*" }));
  app.use(express.json());

  app.get("/", (_, res) => {
    res.send("hello world");
  });

  app.listen(4000, () => {
    console.log("🚀🚀🚀 API Server running on port 4000");
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
