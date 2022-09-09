import React from "react";
import { UserAvatar } from "../../components/UserAvatar";

interface MessagesControllerProps {
  user: any;
  matchId: string;
}

export const MessagesController: React.FC<MessagesControllerProps> = ({
  matchId,
  user,
}) => {
  const messagesList = [];

  while (messagesList.length < 5) {
    messagesList.push(1);
  }

  return (
    <div className="flex flex-col px-5 flex-1 mt-3">
      {Array.from(messagesList).map(() => (
        <div>
          <div></div>
          <p></p>
        </div>
      ))}
    </div>
  );
};
