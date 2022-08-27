import React from "react";
import { Route, Routes } from "react-router-dom";
import { useTokenStore } from "./modules/auth/useTokenStore";
import { FeedPage } from "./pages/FeedPage";
import { Login } from "./pages/Login";

interface AppRoutesProps {}

export const AppRoutes: React.FC<AppRoutesProps> = () => {
  const hasTokens = useTokenStore((s) => !!s.accessToken && !!s.refreshToken);

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      {/* PRIVATE ROUTES - login required */}
      <Route path="/">
        {!hasTokens ? (
          <Route index element={<Login />} />
        ) : (
          <React.Fragment>
            <Route path="/" element={<FeedPage />} />
          </React.Fragment>
        )}
      </Route>
    </Routes>
  );
};
