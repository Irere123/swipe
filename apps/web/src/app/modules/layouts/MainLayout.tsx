import React from "react";
import { MainInnerGrid } from "../../components/MainGrid";
import { LeftPanel, MiddlePanel } from "./GridPanels";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700 ">
      <MainInnerGrid>
        <LeftPanel />
        <MiddlePanel>{children}</MiddlePanel>
      </MainInnerGrid>
    </div>
  );
};
