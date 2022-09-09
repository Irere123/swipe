import React, { useState } from "react";
import { BoxedIcon } from "../BoxedIcon";
import { Button } from "../Button";
import { SolidMoreVert } from "../icons";
import { Modal } from "../Modal";

export const RightHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2">
      {open && (
        <Modal isOpen={open} onRequestClose={() => setOpen(!open)}>
          <div>
            <p>Modal</p>
          </div>
        </Modal>
      )}
      <Button onClick={() => setOpen(!open)}>Login</Button>
      <BoxedIcon>
        <SolidMoreVert width={24} height={27} />
      </BoxedIcon>
    </div>
  );
};
