import React from "react";
import { Link } from "react-router-dom";
import { Codicon, HomeIcon, Logo, MessageIcon } from "../icons";
import { useConn } from "../shared-hooks/useConn";
import { BodyWrapper } from "./BodyWrapper";
import { BoxedIcon } from "./BoxedIcon";
import { UserAvatar } from "./UserAvatar";
import { Wrapper } from "./Wrapper";

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useConn();
  return (
    <Wrapper>
      <BodyWrapper>
        <div className="flex items-center w-full mt-2">
          <div className="flex flex-1">
            <Logo />
          </div>
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
            <Link to={`/user/${user.username}`}>
              <UserAvatar
                src={user.avatarUrl}
                size="sm"
                username={user.username}
              />
            </Link>
          </div>
        </div>
        {children}
      </BodyWrapper>
    </Wrapper>
  );
};
