import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./app/lib/apolloClient";

interface ProvidersProps {
  children?: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
