import { Component, JSX } from "solid-js";
import { Header } from "../../components/header/Header";
import { RightHeader } from "../../components/header/RightHeader";
import { MainInnerGrid } from "../../components/MainGrid";
import { LeftPanel, MiddlePanel } from "./GridPanels";

interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout: Component<MainLayoutProps> = ({ children }) => {
  return (
    <div class="flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700 ">
      <MainInnerGrid>
        <LeftPanel />
        <MiddlePanel>{children}</MiddlePanel>
      </MainInnerGrid>
    </div>
  );
};
