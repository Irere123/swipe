import React from "react";
import { useScreenType } from "../hooks/useScreenType";

interface DashboardGridProps {
  className?: string;
  children: React.ReactNode;
}

export const MainInnerGrid: React.FC<DashboardGridProps> = ({
  children,
  className = "",
}) => {
  const screenType = useScreenType();
  let gridTemplateColumns = "60px 600px";
  let myClassName = ``;

  if (screenType === "2-cols") {
    gridTemplateColumns = "60px 600px";
  } else if (screenType === "1-cols") {
    gridTemplateColumns = "60px 600px";
  } else if (screenType === "fullscreen") {
    myClassName = "w-full px-3";
    gridTemplateColumns = "1fr";
  }

  return (
    <div
      id="main"
      className={`${myClassName} ${className}`}
      style={{
        display: screenType === "fullscreen" ? "flex" : "grid",
        gridTemplateColumns,
        columnGap: 60,
      }}
    >
      {children}
    </div>
  );
};
