import React, { PropsWithChildren } from "react";

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={`flex flex-1 w-full`}>{children}</div>;
};
