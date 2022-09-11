import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ReactModal from "react-modal";
import App from "./app/App";
import "./index.css";
import { apiBaseUrl } from "./app/constants";

const client = new ApolloClient({
  uri: `${apiBaseUrl}/graphql`,
  cache: new InMemoryCache(),
});

ReactModal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
