import { PrismaClient } from "@prisma/client";
import express, { json } from "express";
import { userRoutes } from "./routes/v1";

const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  app.use(json());

  app.use("/api/v1/user", userRoutes);
  app.listen(4000, () => {
    console.log("🚀🚀 Server listening on http://localhost:4000");
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
