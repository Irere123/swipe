import { Component } from "solid-js";
import { FixedGridPanel } from "../GridPanels";
import { LeftHeader } from "./LeftHeader";
import { MiddleHeader } from "./MiddleHeader";
import { RightHeader } from "./RightHeader";

export const Header: Component = () => {
  return (
    <FixedGridPanel>
      <LeftHeader />
      <MiddleHeader />
      <RightHeader />
    </FixedGridPanel>
  );
};
