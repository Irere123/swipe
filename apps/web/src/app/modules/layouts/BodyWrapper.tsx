import React, { PropsWithChildren } from "react";

export const BodyWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={`w-full sm:px-7 px-2`}>{children}</div>;
};
