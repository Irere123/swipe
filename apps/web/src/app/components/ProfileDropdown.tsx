import React, { ReactNode, useState } from "react";
import { useHistory } from "react-router-dom";
import { BaseOverlay } from "./BaseOverlay";

export const ProfileDropdown: React.FC<{
  user: any;
  onCloseDropdown: () => void;
  onActionButtonClicked: () => void;
}> = ({ user, onCloseDropdown, onActionButtonClicked }) => {
  const [currentOverlay, setCurrentOverlay] = useState<ReactNode>(null);

  const { push } = useHistory();

  return (
    <div
      className="flex whitespace-nowrap overflow-ellipsis"
      style={{ width: 200 }}
    >
      <BaseOverlay
        onActionButtonClicked={onActionButtonClicked}
        actionButton={"Logout"}
        overlay={currentOverlay}
      >
        <div className="flex flex-col">
          <div>
            <p>Profile</p>
          </div>
        </div>
      </BaseOverlay>
    </div>
  );
};
