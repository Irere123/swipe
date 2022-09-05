import React, { PropsWithChildren } from "react";

export const BodyWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={`px-5`}>{children}</div>;
};
