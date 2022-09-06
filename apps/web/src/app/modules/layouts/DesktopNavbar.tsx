import React from "react";
import { Link } from "react-router-dom";
import { BoxedIcon } from "../../components/BoxedIcon";
import { UserAvatar } from "../../components/UserAvatar";
import {
  SvgSolidCompass,
  SvgSolidNotification,
  SvgSolidZap,
} from "../../icons";
import { useMeQuery } from "../../shared/useMeQuery";

export const DesktopNavbar: React.FC = () => {
  const { me } = useMeQuery();
  return (
    <div className="flex items-center mt-3 px-2">
      <h3 className="flex flex-1 text-accent font-bold">Swipe</h3>

      <div className="flex gap-2">
        <Link to={`/`}>
          <BoxedIcon circle>
            <SvgSolidCompass />
          </BoxedIcon>
        </Link>
        <Link to={`/messages`}>
          <BoxedIcon circle>
            <SvgSolidZap />
          </BoxedIcon>
        </Link>
        <Link to={`/notifications`}>
          <BoxedIcon circle>
            <SvgSolidNotification />
          </BoxedIcon>
        </Link>
        <UserAvatar src={me?.avatarUrl!} username={me?.username} size="sm" />
      </div>
    </div>
  );
};
