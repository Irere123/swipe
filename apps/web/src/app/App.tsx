import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CenterLayout } from "./modules/layouts/CenterLayout";
import { PageWrapper } from "./modules/layouts/PageWrapper";
import LoginPage from "./pages/login";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PageWrapper>
        <CenterLayout>
          <Routes>
            <Route index element={<LoginPage />} />
          </Routes>
        </CenterLayout>
      </PageWrapper>
    </BrowserRouter>
  );
};

export default App;
