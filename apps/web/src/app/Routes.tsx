import { Route, Routes as SolidRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import HomePage from "./pages/HomePage";
import LeaderPage from "./pages/LeaderboardPage";

export const Routes: Component = () => {
  return (
    <SolidRoutes>
      <Route path={`/`} element={<HomePage />} />
      <Route path={`/leaderboard`} element={<LeaderPage />} />
    </SolidRoutes>
  );
};
