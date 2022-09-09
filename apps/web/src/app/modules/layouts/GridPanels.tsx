import React from "react";
import { Link, NavLink } from "react-router-dom";
import { BoxedIcon } from "../../components/BoxedIcon";
import { FixedGridPanel, GridPanel } from "../../components/GridPanels";
import { MiddleHeader } from "../../components/header/MiddleHeader";
import { RightHeader } from "../../components/header/RightHeader";
import { Logo, SolidFriends, SolidHome } from "../../components/icons";
import { UserAvatar } from "../../components/UserAvatar";
import avatar from "../../../assets/avatar.jpg";

interface Props {
  children: React.ReactNode;
}

const HeaderWrapper: React.FC<Props> = ({ children }) => (
  <div className={`flex mb-7 h-6 items-center`}>{children}</div>
);

export const LeftPanel: React.FC = () => {
  return (
    <FixedGridPanel>
      <div className="flex justify-center items-center mb-7">
        <Logo />
      </div>
      <div className="flex flex-col items-center">
        <NavLink to="/" activeClassName="text-accent">
          <BoxedIcon>
            <SolidHome width={20} height={20} />
          </BoxedIcon>
        </NavLink>
        <Link to="/leaderboard">
          <BoxedIcon>
            <SolidFriends />
          </BoxedIcon>
        </Link>
        <div className="flex flex-col gap-2 border-t-2 border-t-primary-dark pt-2">
          {Array.from([1, 2, 3]).map(() => (
            <Link to="/u/us">
              <UserAvatar src={avatar} size="sm" />
            </Link>
          ))}
        </div>
      </div>
    </FixedGridPanel>
  );
};

export const MiddlePanel: React.FC<Props> = ({ children }) => {
  return (
    <GridPanel>
      <div className="flex pt-5 flex-col sticky top-0">
        <HeaderWrapper>
          <MiddleHeader />
          <RightHeader />
        </HeaderWrapper>
      </div>
      {children}
    </GridPanel>
  );
};