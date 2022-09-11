require("dotenv-safe").config();
import express from "express";
import cors from "cors";
import HTTP from "http";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { makeSchema } from "nexus";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { __prod__ } from "./lib/constants";
import * as schemaTypes from "./schema";
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

  const schema = makeSchema({ types: schemaTypes });

  const http = HTTP.createServer(app);
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: http }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  // Modified server startup
  await new Promise<void>((resolve) => http.listen({ port: 4000 }, resolve));
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
