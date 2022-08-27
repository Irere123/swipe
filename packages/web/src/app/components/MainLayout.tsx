import React from "react";
import { Link } from "react-router-dom";
import { Codicon, HomeIcon, MessageIcon } from "../icons";
import { BodyWrapper } from "./BodyWrapper";
import { BoxedIcon } from "./BoxedIcon";
import { UserAvatar } from "./UserAvatar";

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <BodyWrapper>
      <div className="flex items-center w-full mt-2">
        <h3 className="flex flex-1 text-primary-100">Swipe</h3>
        <div className="flex gap-3">
          <Link to={"/"}>
            <BoxedIcon>
              <HomeIcon />
            </BoxedIcon>
          </Link>
          <Link to={"/notifications"}>
            <BoxedIcon>
              <Codicon name="notifications" />
            </BoxedIcon>
          </Link>
          <Link to={"/messanger"}>
            <BoxedIcon>
              <MessageIcon />
            </BoxedIcon>
          </Link>
          <UserAvatar src="https://placekitten.com/200/200" size="sm" />
        </div>
      </div>
      {children}
    </BodyWrapper>
  );
};
