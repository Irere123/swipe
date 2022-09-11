import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { BoxedIcon } from "../../components/BoxedIcon";
import { SolidFire, SolidHome } from "@swipe/ui/icons";
import { FixedGridPanel, GridPanel } from "../../components/GridPanels";
import { MiddleHeader } from "../../components/header/MiddleHeader";
import { RightHeader } from "../../components/header/RightHeader";
import Logo from "../../components/Logo";
import { UserAvatar } from "../../components/UserAvatar";
import { MeContext } from "../../utils/UserProvider";

interface Props {
  children: React.ReactNode;
}

const HeaderWrapper: React.FC<Props> = ({ children }) => (
  <div className={`flex mb-7 h-6 items-center`}>{children}</div>
);

export const LeftPanel: React.FC = () => {
  const { leaderboard } = useContext(MeContext);

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
            <SolidFire />
          </BoxedIcon>
        </Link>
        <div className="flex flex-col gap-2 border-t-2 border-t-primary-dark pt-2">
          {leaderboard.map((user) => (
            <Link to={`/u/${user.id}`}>
              <UserAvatar
                src={user.avatarUrl}
                username={user.username}
                size="sm"
              />
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
      <div className="flex pt-5 px-3 flex-col sticky top-0">
        <HeaderWrapper>
          <MiddleHeader />
          <RightHeader />
        </HeaderWrapper>
      </div>
      {children}
    </GridPanel>
  );
};
