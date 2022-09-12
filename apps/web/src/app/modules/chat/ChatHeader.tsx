import React from "react";
import { SolidFriends } from "@swipe/ui/icons";
import { Link, useHistory } from "react-router-dom";
import { modalConfirm } from "../../components/ComfirmModal";
import { UserAvatar } from "../../components/UserAvatar";
import { Text } from "../../components/Text";
import { BoxedIcon } from "../../components/BoxedIcon";
import { Button } from "../../components/Button";
import { useQuery, useQueryClient } from "react-query";
import { Match, MatchesResponse } from "../../../types";
import { mutation } from "../../utils/mutation";

interface ChatHeaderProps {
  matchId: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ matchId }) => {
  const queryClient = useQueryClient();
  const { push } = useHistory();
  const { data, isLoading } = useQuery<Match>(`/api/match/${matchId}`);

  if (isLoading) {
    return null;
  }

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
                modalConfirm("Are you sure you want to unmatch", async () => {
                  const resp: { ok: boolean } = await mutation(
                    "/api/unmatch",
                    {
                      userId: matchId,
                    },
                    { method: "POST" }
                  );

                  if (resp.ok) {
                    queryClient.setQueryData<MatchesResponse | undefined>(
                      "/api/matches/0",
                      (x) =>
                        !x
                          ? x
                          : {
                              ...x,
                              matches: x.matches.filter(
                                (x) => x.userId !== matchId
                              ),
                            }
                    );
                    push("/messages");
                  }
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
