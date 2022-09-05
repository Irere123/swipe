import React from "react";
import { useMeQuery } from "../../shared/useMeQuery";
import { CenterLayout } from "../layouts/CenterLayout";
import { DesktopNavbar } from "../layouts/DesktopNavbar";

export const HomePage: React.FC = () => {
  const { me } = useMeQuery();

  return (
    <CenterLayout>
      <DesktopNavbar />
      <div>
        <pre>{me?.bio}</pre>
      </div>
    </CenterLayout>
  );
};
