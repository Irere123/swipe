import React from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTokenStore } from "../global-store/useTokenStore";
import { PromptModal } from "./components/PromptModal";
import { queryClient } from "./lib/queryClient";
import { CenterLayout } from "./modules/layouts/CenterLayout";
import { PageWrapper } from "./modules/layouts/PageWrapper";
import HomePage from "./pages/feed";
import LoginPage from "./pages/login";

const App: React.FC = () => {
  const hasTokens = useTokenStore((s) => !!s.accessToken && !!s.refreshToken);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PageWrapper>
          <CenterLayout>
            <Routes>
              <Route path="/">
                {!hasTokens ? (
                  <Route index element={<LoginPage />} />
                ) : (
                  <React.Fragment>
                    <Route path="/" element={<HomePage />} />
                  </React.Fragment>
                )}
              </Route>
            </Routes>
          </CenterLayout>
          <PromptModal />
        </PageWrapper>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
