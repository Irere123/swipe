import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typesArray = loadFilesSync(path.join(__dirname, "schemas/**/*"), {
  extensions: ["js"],
});
const resolversArray = loadFilesSync(`${__dirname}/resolvers/**/*`, {
  extensions: ["js"],
});

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
