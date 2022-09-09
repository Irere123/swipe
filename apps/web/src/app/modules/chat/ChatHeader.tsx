import React from "react";
import { Link, useHistory } from "react-router-dom";
import { BoxedIcon } from "../../components/BoxedIcon";
import { Button } from "../../components/Button";
import { modalConfirm } from "../../components/ComfirmModal";
import { SolidFriends } from "../../components/icons";
import { Text } from "../../components/Text";
import { UserAvatar } from "../../components/UserAvatar";

interface ChatHeaderProps {
  user: any;
  matchId: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ matchId, user }) => {
  const { push } = useHistory();
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
        <Text variant="username">{user.username}</Text>
        <Text variant="info">
          {user.isOnline ? <>Online</> : <>last online</>}
        </Text>
      </div>
      <div className="flex flex-1 justify-end">
        <div className="flex gap-3">
          <Link to={`/messages`}>
            <BoxedIcon color="primary">
              <SolidFriends />
            </BoxedIcon>
          </Link>
          <div>
            <Button
              onClick={() =>
                modalConfirm("Are you sure you want to unmatch", () => {
                  console.log("unmatched");
                  push("/");
                })
              }
            >
              Unmatch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
