import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTokenStore } from "../global-store/useTokenStore";
import { PromptModal } from "./components/PromptModal";
import { CenterLayout } from "./modules/layouts/CenterLayout";
import { PageWrapper } from "./modules/layouts/PageWrapper";
import HomePage from "./pages/feed";
import LoginPage from "./pages/login";

const App: React.FC = () => {
  const hasTokens = useTokenStore((s) => !!s.accessToken && !!s.refreshToken);

  return (
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
  );
};

export default App;
