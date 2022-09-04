import express from "express";
import { PrismaClient } from "@prisma/client";
import { createServer, renderGraphiQL } from "@graphql-yoga/node";
import { schema } from "./schema";

const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  const graphQLServer = createServer({
    renderGraphiQL,
    schema,
  });

  // Bind GraphQL Yoga to `/graphql` endpoint
  app.use("/graphql", graphQLServer);

  app.listen(4000, () => {
    console.log(
      "🚀🚀🚀 Running a GraphQL API server at http://localhost:4000/graphql"
    );
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
