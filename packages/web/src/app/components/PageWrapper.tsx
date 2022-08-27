import React from "react";

interface PageWrapperProps {
  children?: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div
      className={`bg-primary-700 mx-auto max-w-3xl w-full h-full flex relative`}
    >
      {children}
    </div>
  );
};
