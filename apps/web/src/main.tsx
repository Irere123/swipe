import React from "react";
import ReactDOM from "react-dom/client";
import "nprogress/nprogress.css";
import App from "./app/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
