import { Component } from "solid-js";
import { BoxedIcon } from "../BoxedIcon";
import { Button } from "../Button";
import { SolidMoreVert } from "../icons";

export const RightHeader: Component = () => {
  return (
    <div class="flex gap-2">
      <Button>Login</Button>
      <BoxedIcon>
        <SolidMoreVert width={24} height={27} />
      </BoxedIcon>
    </div>
  );
};
