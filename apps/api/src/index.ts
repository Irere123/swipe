import express, { json } from "express";
import { PrismaClient } from "@prisma/client";
import { DevOnly } from "./routes";

const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  app.use(json());

  app.get("/", (_req, res) => {
    res.json({ error: "Not found" }).status(404);
  });

  app.use("/dev", DevOnly);

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
