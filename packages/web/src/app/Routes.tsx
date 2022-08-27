import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";

interface AppRoutesProps {}

export const AppRoutes: React.FC<AppRoutesProps> = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/">
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
};
