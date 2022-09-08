import { Component, JSX } from "solid-js";

interface DashboardGridProps {
  className?: string;
  children: JSX.Element;
}

export const MainInnerGrid: Component<DashboardGridProps> = ({
  children,
  className = "",
}) => {
  let gridTemplateColumns = "60px 600px";
  let myClassName = ``;

  return (
    <div
      id="main"
      class={`relative ${myClassName} ${className}`}
      style={{
        display: "grid",
        "grid-template-columns": gridTemplateColumns,
        "column-gap": "60px",
      }}
    >
      {children}
    </div>
  );
};
