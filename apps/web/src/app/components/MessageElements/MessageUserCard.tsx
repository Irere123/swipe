import React, { PropsWithChildren } from "react";
import { UserAvatar } from "../UserAvatar";
import { useScreenType } from "@swipe/ui";
import { Text } from "../Text";

export interface MessageUserCardProps extends PropsWithChildren {
  username: string;
  avatarUrl: string;
  lastMsg: string | null;
  isOnline?: boolean;
  onClick: () => void;
}

export const MessageUserCard: React.FC<MessageUserCardProps> = ({
  avatarUrl,
  lastMsg,
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
            <Text variant="username">{username}</Text>
          </div>
          <p className="select-none text-sm">{lastMsg ? lastMsg : "Say Hi"}</p>
        </div>
      </div>
    </div>
  );
};
