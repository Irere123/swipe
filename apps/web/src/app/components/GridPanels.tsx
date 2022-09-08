import { Component, JSX } from "solid-js";

interface Props {
  children: JSX.Element;
}

export const GridPanel: Component<Props> = ({ children }) => {
  return <div class={`flex flex-col flex-1 w-full`}>{children}</div>;
};

export const FixedGridPanel: Component<Props> = ({ children }) => {
  return (
    <div class={`flex pt-5 flex-col flex-1 sticky top-0 h-screen`}>
      {children}
    </div>
  );
};
