require("dotenv-safe").config();
import express from "express";
import cors from "cors";
import http from "http";
import { server } from "websocket";
import { PrismaClient } from "@prisma/client";
import { __prod__ } from "./lib/constants";
import { DevOnly } from "./routes";

export const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  app.use(cors({ origin: "*" }));
  app.use(express.json());

  app.get("/stats", async (_, res) => {
    const numUsers = await prisma.user.count();
    res.json({ numUsers });
  });

  if (!__prod__) {
    app.use("/dev", DevOnly);
  }

  const httpServer = http.createServer(app);
  const socket = new server({ httpServer });

  socket.on("request", (request) => {
    request.accept(null, request.origin);
  });

  httpServer.listen(4000, () => {
    console.log("🚀🚀🚀 API Server running on port 4000");
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
