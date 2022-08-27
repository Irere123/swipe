import React from "react";
import { Link } from "react-router-dom";
import { Codicon, HomeIcon, MessageIcon } from "../icons";
import { BodyWrapper } from "./BodyWrapper";
import { BoxedIcon } from "./BoxedIcon";
import { UserAvatar } from "./UserAvatar";
import { Wrapper } from "./Wrapper";

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Wrapper>
      <BodyWrapper>
        <div className="flex items-center w-full mt-2">
          <h3 className="flex flex-1 text-primary-100">Swipe</h3>
          <div className="flex gap-3">
            <Link to={"/"}>
              <BoxedIcon circle>
                <HomeIcon />
              </BoxedIcon>
            </Link>
            <Link to={"/messanger"}>
              <BoxedIcon circle>
                <MessageIcon />
              </BoxedIcon>
            </Link>
            <Link to={"/notifications"}>
              <BoxedIcon circle>
                <Codicon name="notifications" />
              </BoxedIcon>
            </Link>
            <UserAvatar src="https://placekitten.com/200/200" size="sm" />
          </div>
        </div>
        {children}
      </BodyWrapper>
    </Wrapper>
  );
};
