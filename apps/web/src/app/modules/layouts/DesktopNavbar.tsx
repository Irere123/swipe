import React from "react";
import { BoxedIcon } from "../../components/BoxedIcon";
import {
  SvgSolidCompass,
  SvgSolidNotification,
  SvgSolidZap,
} from "../../icons";

export const DesktopNavbar: React.FC = () => {
  return (
    <div className="flex items-center mt-3">
      <h3 className="flex flex-1 text-accent font-bold">Swipe</h3>
      <div className="flex gap-2">
        <BoxedIcon circle>
          <SvgSolidCompass />
        </BoxedIcon>
        <BoxedIcon circle>
          <SvgSolidZap />
        </BoxedIcon>
        <BoxedIcon circle>
          <SvgSolidNotification />
        </BoxedIcon>
      </div>
    </div>
  );
};
