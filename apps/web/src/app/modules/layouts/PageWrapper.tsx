import React, { PropsWithChildren } from "react";

export const PageWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={`mx-auto max-w-5xl w-full h-full flex relative`}>
      {children}
    </div>
  );
};
