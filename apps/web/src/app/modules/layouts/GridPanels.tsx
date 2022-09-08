import { Link, NavLink } from "@solidjs/router";
import { Component, JSX } from "solid-js";
import { BoxedIcon } from "../../components/BoxedIcon";
import { FixedGridPanel, GridPanel } from "../../components/GridPanels";
import { MiddleHeader } from "../../components/header/MiddleHeader";
import { RightHeader } from "../../components/header/RightHeader";
import { Logo, SolidFriends, SolidHome } from "../../components/icons";
import { UserAvatar } from "../../components/UserAvatar";
import avatar from "../../../assets/avatar.jpg";

interface Props {
  children: JSX.Element;
}

const HeaderWrapper: Component<Props> = ({ children }) => (
  <div class={`flex mb-7 h-6 items-center`}>{children}</div>
);

export const LeftPanel: Component = () => {
  return (
    <FixedGridPanel>
      <div class="flex justify-center items-center mb-7">
        <Logo />
      </div>
      <div class="flex flex-col items-center">
        <NavLink href="/" activeClass="text-accent">
          <BoxedIcon>
            <SolidHome width={20} height={20} />
          </BoxedIcon>
        </NavLink>
        <NavLink href="/leaderboard" activeClass="text-accent">
          <BoxedIcon>
            <SolidFriends />
          </BoxedIcon>
        </NavLink>
        <div class="flex flex-col gap-2 border-t-2 border-t-primary-dark pt-2">
          {Array.from([1, 2, 3]).map(() => (
            <Link href="/u/us">
              <UserAvatar src={avatar} size="sm" />
            </Link>
          ))}
        </div>
      </div>
    </FixedGridPanel>
  );
};

export const MiddlePanel: Component<Props> = ({ children }) => {
  return (
    <GridPanel>
      <FixedGridPanel>
        <div>
          <HeaderWrapper>
            <MiddleHeader />
            <RightHeader />
          </HeaderWrapper>
        </div>
      </FixedGridPanel>
      {children}
    </GridPanel>
  );
};
