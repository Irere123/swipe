import React from "react";

interface TagProps {
  glow?: boolean;
  children?: any;
}

// @todo the tag doesn't really glow like in figma right now
export const Tag: React.FC<TagProps> = ({ children, glow }) => {
  return (
    <div
      className={`flex cursor-pointer bg-accent hover:bg-accent-hover text-xs px-2 font-bold text-button justify-center items-center rounded ${
        glow ? `border` : ``
      }`}
      style={{
        height: "22px",
        boxShadow: glow ? "0px 0px 7px var(--color-accent-glow)" : "",
        border: glow ? ".5px solid var(--color-accent)" : "",
      }}
    >
      {children}
    </div>
  );
};
