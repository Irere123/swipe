import React, { PropsWithChildren } from "react";

export const CenterLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex max-w-screen-sm mx-auto w-full h-full flex-col relative">
      {children}
    </div>
  );
};
