import React from "react";
import { CenterLayout } from "../layouts/CenterLayout";
import { DesktopNavbar } from "../layouts/DesktopNavbar";

export const HomePage: React.FC = () => {
  return (
    <CenterLayout>
      <DesktopNavbar />
    </CenterLayout>
  );
};
