import React, { useLayoutEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { createWebSocket } from "../createWebSocket";
import { CenterLayout } from "./components/CenterLayout";
import { PageWrapper } from "./components/PageWrapper";
import { useSocketStatus } from "./global-stores/useSocketStatus";
import { useTokenStore } from "./modules/auth/useTokenStore";
import { AppRoutes } from "./Routes";

interface AppsProps {}

export const App: React.FC<AppsProps> = () => {
  const hasTokens = useTokenStore((s) => !!s.accessToken && !!s.refreshToken);
  const wsKilledByServer = useSocketStatus(
    (s) => s.status === "closed-by-server"
  );

  useState(() => (hasTokens ? createWebSocket() : null));
  useLayoutEffect(() => {
    if (hasTokens) {
      createWebSocket();
    }
  }, [hasTokens]);

  if (wsKilledByServer) {
    return (
      <div>
        <h3>Connection taken</h3>
        <button
          onClick={() => {
            window.location.pathname = "/";
          }}
        >
          reconnect
        </button>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <PageWrapper>
        <CenterLayout>
          <AppRoutes />
        </CenterLayout>
      </PageWrapper>
    </BrowserRouter>
  );
};
