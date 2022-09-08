import { Route, Routes as SolidRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import HomePage from "./pages/HomePage";

export const Routes: Component = () => {
  return (
    <SolidRoutes>
      <Route path={`/`} element={<HomePage />} />
    </SolidRoutes>
  );
};
