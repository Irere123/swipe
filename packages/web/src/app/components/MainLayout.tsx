import React from "react";
import { BodyWrapper } from "./BodyWrapper";
import { UserAvatar } from "./UserAvatar";

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <BodyWrapper>
      <div className="flex items-center w-full mt-2">
        <h3 className="flex flex-1 text-primary-100">Swipe</h3>
        <div className="flex gap-3">
          <UserAvatar src="https://placekitten.com/200/200" size="md" />
        </div>
      </div>
      {children}
    </BodyWrapper>
  );
};
