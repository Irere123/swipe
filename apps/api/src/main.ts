import express from "express";
import cors from "cors";
import http from "http";
import { PrismaClient } from "@prisma/client";
import Server from "./lib/Server";
import { __prod__ } from "./lib/constants";
import { DevOnly } from "./routes";

export const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  app.use(cors({ origin: "*" }));
  app.use(express.json());

  if (!__prod__) {
    app.use("/dev", DevOnly);
  }

  const httpServer = http.createServer(app);
  const server = Server({ httpServer });

  server.onConnection((conn) => {
    conn.onOperator("ping", (e) => {
      console.log(e.data);
    });
    conn.sendOp("auth", { hello: "How are you doing" });
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
    console.log(e);
    await prisma.$disconnect();
  });
