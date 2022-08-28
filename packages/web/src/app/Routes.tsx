import React from "react";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { auth_query, wsAuthFetch } from "../createWebSocket";
import { useSocketStatus } from "./global-stores/useSocketStatus";
import { useTokenStore } from "./modules/auth/useTokenStore";
import { FeedPage } from "./pages/FeedPage";
import { Login } from "./pages/Login";
import { useWsMainHandler } from "./useWsMainHandler";

interface AppRoutesProps {}

export const AppRoutes: React.FC<AppRoutesProps> = () => {
  const authIsGood = useSocketStatus((s) => s.status === "auth-good");
  const hasTokens = useTokenStore((s) => !!s.accessToken && !!s.refreshToken);
  useWsMainHandler();

  const { isLoading } = useQuery<any>(
    auth_query,
    () => {
      const { accessToken, refreshToken } = useTokenStore.getState();
      return wsAuthFetch({
        op: auth_query,
        d: {
          accessToken,
          refreshToken,
        },
      });
    },
    {
      enabled: hasTokens && authIsGood,
      staleTime: Infinity,
    }
  );

  if (isLoading) {
    return null;
  }

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
