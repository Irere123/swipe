import React, { PropsWithChildren } from "react";
import { format } from "date-fns";
import { Tag } from "../Tag";
import { UserAvatar } from "../UserAvatar";
import { useScreenType } from "../../hooks/useScreenType";

export interface MessageUserCardProps extends PropsWithChildren {
  username: string;
  avatarUrl: string;
  lastMsg?: string;
  isOnline?: boolean;
  onClick: () => void;
}

export const MessageUserCard: React.FC<MessageUserCardProps> = ({
  avatarUrl,
  lastMsg = "Say Hi",
  username,
  isOnline,
  onClick,
}) => {
  const screenType = useScreenType();

  return (
    <div
      className={`flex ${
        screenType !== "fullscreen" ? "w-400" : "w-full"
      } gap-3 cursor-pointer`}
      onClick={onClick}
    >
      <div>
        <UserAvatar
          src={avatarUrl}
          username={username}
          isOnline={isOnline}
          size="md"
        />
      </div>
      <div className="flex flex-1 w-full">
        <div className="flex  flex-1 w-full flex-col">
          <div className="flex flex-1">
            <p className="font-bold select-none">{username}</p>
          </div>
          <p className="select-none text-sm">{lastMsg}</p>
        </div>
      </div>
    </div>
  );
};
