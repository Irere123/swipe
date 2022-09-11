import React from "react";
import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import App from "./app/App";
import "./index.css";
import { Providers } from "./Providers";

ReactModal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
