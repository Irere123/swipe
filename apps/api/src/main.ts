require("dotenv-safe").config();
import express from "express";
import cors from "cors";
import HTTP from "http";
import { PrismaClient } from "@prisma/client";
import { __prod__ } from "./lib/constants";
import { DevOnly } from "./routes";

export const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  app.use(
    cors({
      origin: "*",
      maxAge: __prod__ ? 86400 : undefined,
      exposedHeaders: [
        "access-token",
        "refresh-token",
        "content-type",
        "content-length",
      ],
    })
  );
  app.use(express.json());

  app.use((err: any, _: any, res: any, next: any) => {
    if (res.headersSent) {
      return next(err);
    }
    if (err.statusCode) {
      res.status(err.statusCode).send(err.message);
    } else {
      console.log(err);
      res.status(500).send("internal server error");
    }
  });

  app.get("/stats", async (_, res) => {
    const numUsers = await prisma.user.count();
    res.json({ numUsers });
  });

  app.get("/feed", async (_req, res) => {
    const profiles = await prisma.$queryRaw`
      select u.id, "username", "displayName", "birthday", bio, "avatarUrl"
      from users u
      order by
        random()
       
      limit 20;
  `;

    res.json({ profiles });
  });

  if (!__prod__) {
    app.use("/dev", DevOnly);
  }

  const http = HTTP.createServer(app);

  http.listen(4000, () => {
    console.log(`🚀🚀🚀 API Server running at http://localhost:4000}`);
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
