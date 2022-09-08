import { Component, JSX } from "solid-js";
import { FixedGridPanel, GridPanel } from "../../components/GridPanels";
import { LeftHeader } from "../../components/header/LeftHeader";
import { MiddleHeader } from "../../components/header/MiddleHeader";
import { RightHeader } from "../../components/header/RightHeader";

interface Props {
  children: JSX.Element;
}

const HeaderWrapper: Component<Props> = ({ children }) => (
  <div class={`flex mb-7 h-6 items-center`}>{children}</div>
);

export const LeftPanel: Component<Props> = ({ children }) => {
  return (
    <FixedGridPanel>
      <HeaderWrapper>
        <LeftHeader />
      </HeaderWrapper>
      {children}
    </FixedGridPanel>
  );
};

export const MiddlePanel: Component<Props> = ({ children }) => {
  return (
    <GridPanel>
      <div>
        <HeaderWrapper>
          <MiddleHeader />
          <RightHeader />
        </HeaderWrapper>
      </div>
      {children}
    </GridPanel>
  );
};
