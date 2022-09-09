import React from "react";
import { BoxedIcon } from "../BoxedIcon";
import { Button } from "../Button";
import { SolidMoreVert } from "../icons";

export const RightHeader: React.FC = () => {
  return (
    <div className="flex gap-2">
      <Button>Login</Button>
      <BoxedIcon>
        <SolidMoreVert width={24} height={27} />
      </BoxedIcon>
    </div>
  );
};
