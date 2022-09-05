import React, { PropsWithChildren } from "react";

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={`mb-auto`}>{children}</div>;
};
