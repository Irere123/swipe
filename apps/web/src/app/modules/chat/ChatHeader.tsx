import React from "react";
import { SolidFriends } from "@swipe/ui/icons";
import { Link, useHistory } from "react-router-dom";
import { modalConfirm } from "../../components/ComfirmModal";
import { UserAvatar } from "../../components/UserAvatar";
import { Text } from "../../components/Text";
import { BoxedIcon } from "../../components/BoxedIcon";
import { Button } from "../../components/Button";
import { useQuery } from "react-query";
import { Match, MatchesResponse } from "../../../types";

interface ChatHeaderProps {
  matchId: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ matchId }) => {
  const { push } = useHistory();
  const { data, isLoading } = useQuery<Match>(`/api/match/${matchId}`);

  if (isLoading) {
    return null;
  }

  console.log(data);

  return (
    <div className="flex z-50 gap-3 sticky top-0 bg-primary p-3 border-b-2 border-b-primary-dark-2">
      <div>
        <UserAvatar
          src={data?.avatarUrl!}
          username={data?.displayName}
          isOnline={data?.online}
          size="md"
        />
      </div>
      <div>
        <Text variant="username">{data?.displayName}</Text>
        <Text variant="info">
          {data?.online ? <>Online</> : <>last online</>}
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
