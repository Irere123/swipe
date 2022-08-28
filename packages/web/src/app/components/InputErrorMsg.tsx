import React, { PropsWithChildren } from "react";

export const InputErrorMsg: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={`text-red-600`}>{children}</div>;
};
