import { Component, JSX } from "solid-js";
import { FixedGridPanel, GridPanel } from "../../components/GridPanels";
import logo from "../../../assets/logo.png";
import { MiddleHeader } from "../../components/header/MiddleHeader";
import { RightHeader } from "../../components/header/RightHeader";

interface Props {
  children: JSX.Element;
}

const HeaderWrapper: Component<Props> = ({ children }) => (
  <div class={`flex mb-7 h-6 items-center`}>{children}</div>
);

export const LeftPanel: Component = () => {
  return (
    <FixedGridPanel>
      <HeaderWrapper>
        <div>
          <img src={logo} alt="Logo" />
        </div>
      </HeaderWrapper>
      <div>
        <p>Home</p>
      </div>
    </FixedGridPanel>
  );
};

export const MiddlePanel: Component<Props> = ({ children }) => {
  return (
    <GridPanel>
      <div class="pt-5">
        <HeaderWrapper>
          <MiddleHeader />
          <RightHeader />
        </HeaderWrapper>
      </div>
      {children}
    </GridPanel>
  );
};
