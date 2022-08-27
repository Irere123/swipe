import React from "react";
import { RegularAnchor } from "./RegularAnchor";

interface FooterProps {
  isLogin?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isLogin }) => {
  return (
    <div className="flex items-center">
      {isLogin ? (
        <div className="flex gap-2">
          <RegularAnchor
            target={"_blank"}
            rel="noreferrer"
            href="https://github.com/irere123/swipe"
          >
            Report a bug
          </RegularAnchor>
          <RegularAnchor
            target={"_blank"}
            rel="noreferrer"
            href="/terms-of-use.html"
          >
            Terms of use
          </RegularAnchor>
        </div>
      ) : null}
    </div>
  );
};
