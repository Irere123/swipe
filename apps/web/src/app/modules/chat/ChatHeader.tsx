import React from "react";
import { Link } from "react-router-dom";
import { BoxedIcon } from "../../components/BoxedIcon";
import { Button } from "../../components/Button";
import { SolidFriends } from "../../components/icons";
import { UserAvatar } from "../../components/UserAvatar";

interface ChatHeaderProps {
  user: any;
  matchId: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ matchId, user }) => {
  return (
    <div className="flex z-50 gap-3 sticky top-0 bg-primary p-3 border-b-2 border-b-primary-dark-2">
      <div>
        <UserAvatar
          src={user.avatarUrl}
          username={user.username}
          isOnline={user.isOnline}
          size="md"
        />
      </div>
      <div>
        <p className="font-bold select-none">{user.username}</p>
        <p className="text-sm select-none">
          {user.isOnline ? <>Online</> : <>last online</>}
        </p>
      </div>
      <div className="flex flex-1 justify-end">
        <div className="flex gap-3">
          <Link to={`/messages`}>
            <BoxedIcon color="primary">
              <SolidFriends />
            </BoxedIcon>
          </Link>
          <div>
            <Button>Unmatch</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
