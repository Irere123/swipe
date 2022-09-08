import { Router } from "@solidjs/router";
import { Component } from "solid-js";
import { Routes } from "./Routes";

export const App: Component = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};
