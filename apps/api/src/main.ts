require("dotenv-safe").config();
import express from "express";
import cors from "cors";
import http from "http";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
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
  const server = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String!
      }
    `,
    resolvers: {
      Query: {
        hello() {
          return "Hello world";
        },
      },
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(
    `🚀🚀🚀 API Server running at http://localhost:4000${server.graphqlPath}`
  );
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
