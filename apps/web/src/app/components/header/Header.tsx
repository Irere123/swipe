import { Component } from "solid-js";
import { FixedGridPanel } from "../GridPanels";
import { MiddleHeader } from "./MiddleHeader";
import { RightHeader } from "./RightHeader";

export const Header: Component = () => {
  return (
    <FixedGridPanel>
      <MiddleHeader />
      <RightHeader />
    </FixedGridPanel>
  );
};
