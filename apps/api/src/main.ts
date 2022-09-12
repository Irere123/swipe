import "dotenv-safe/config";
import express from "express";
import cors from "cors";
import url from "url";
import HTTP from "http";
import { Server, WebSocket } from "ws";
import { PrismaClient } from "@prisma/client";
import { __prod__ } from "./lib/constants";
import { DevOnly, MainRoutes, UserOnly } from "./routes";
import { isAuth } from "./lib/isAuth";
import { verify } from "jsonwebtoken";

export const prisma = new PrismaClient();
export const wsUsers: Record<
  string,
  { ws: WebSocket; openChatUserId: string | null }
> = {};
export const wsSend = (key: string, v: any) => {
  if (key in wsUsers) {
    wsUsers[key].ws.send(JSON.stringify(v));
  }
};

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
  app.use("/u", isAuth(false), UserOnly);
  app.use("/api", isAuth(), MainRoutes);
  if (!__prod__) {
    app.use("/dev", DevOnly);
  }

  app.get("/me", isAuth(false), async (req, res) => {
    const leaderboard = await prisma.$queryRaw`
      select u.id, "avatarUrl", "username", "bio", "displayName" 
      from users u order by u."numLikes" DESC limit 3
    `;

    if (!req.userId) {
      res.json({
        user: null,
        leaderboard,
      });
      return;
    }

    res.json({
      user: await prisma.user.findFirst({ where: { id: req.userId } }),
      leaderboard,
    });
  });

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

  const http = HTTP.createServer(app);
  const wss = new Server({ noServer: true });

  wss.on("connection", (ws: WebSocket, userId: string) => {
    if (!userId) {
      ws.terminate();
      return;
    }

    // console.log("ws open: ", userId);
    wsUsers[userId] = { openChatUserId: null, ws };

    ws.on("message", async (e: any) => {
      const {
        type,
        userId: openChatUserId,
      }: { type: "message-open"; userId: string } = JSON.parse(e);
      if (type === "message-open") {
        if (userId in wsUsers) {
          await prisma.user.update({
            data: { online: true },
            where: { id: userId },
          });
          wsUsers[userId].openChatUserId = openChatUserId;
        }
      }
    });

    ws.on("close", async () => {
      if (!__prod__) {
        console.log("ws close: ", userId);
      }
      await prisma.user.update({
        data: { online: false },
        where: { id: userId },
      });
      delete wsUsers[userId];
    });
  });

  http.on("upgrade", async function upgrade(request, socket, head) {
    const good = (userId: string) => {
      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit("connection", ws, userId);
      });
    };
    const bad = () => {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
    };
    try {
      const {
        query: { accessToken, refreshToken },
      } = url.parse(request.url!, true);
      if (
        !accessToken ||
        !refreshToken ||
        typeof accessToken !== "string" ||
        typeof refreshToken !== "string"
      ) {
        return bad();
      }
      try {
        const data = verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET
        ) as any;
        return good(data.userId);
      } catch {}

      try {
        const data = verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        ) as any;
        const user = await prisma.user.findFirst({
          where: { id: data.userId },
        });
        // token has been invalidated or user deleted
        if (!user || user.tokenVersion !== data.tokenVersion) {
          return bad();
        }
        return good(data.userId);
      } catch {}
    } catch {}

    return bad();
  });

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
