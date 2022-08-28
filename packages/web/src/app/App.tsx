import React, { useLayoutEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { CenterLayout } from "./components/CenterLayout";
import { PageWrapper } from "./components/PageWrapper";
import { useSocketStatus } from "./global-stores/useSocketStatus";
import { useTokenStore } from "./modules/auth/useTokenStore";
import { AppRoutes } from "./Routes";

interface AppsProps {}

export const App: React.FC<AppsProps> = () => {
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
