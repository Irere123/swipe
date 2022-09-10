import React from "react";
import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import App from "./app/App";
import "./index.css";

ReactModal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
