import { ApolloClient, InMemoryCache } from "@apollo/client";
import { apiBaseUrl } from "../constants";

export const client = new ApolloClient({
  uri: `${apiBaseUrl}/graphql`,
  cache: new InMemoryCache(),
});
