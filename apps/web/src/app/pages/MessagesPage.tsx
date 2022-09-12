import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { MatchesResponse } from "../../types";
import { MessageUserCard } from "../components/MessageElements/MessageUserCard";
import { Text } from "../components/Text";
import { MainLayout } from "../modules/layouts/MainLayout";
import { wsend } from "../utils/socket";
import { MeContext } from "../utils/UserProvider";

const MessagesPage: React.FC = () => {
  const { replace } = useHistory();
  const { me } = useContext(MeContext);
  const { data, isLoading } = useQuery<MatchesResponse>("/api/matches/0");

  wsend({ type: "message-open", userId: me?.id! });

  if (isLoading) {
    return null;
  }

  if (!data?.matches.length) {
    return (
      <MainLayout>
        <div className="flex flex-col gap-3">
          <h4 className="font-bold">Messages</h4>
          <Text>You haven't matched with anyone yet!</Text>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-3">
        <h4 className="font-bold">Messages</h4>
        {data.matches.map((u) => (
          <MessageUserCard
            key={u.userId}
            avatarUrl={u.avatarUrl}
            lastMsg={u.message}
            isOnline={u.online}
            username={u.displayName}
            onClick={() => {
              replace(`/messages/${u.userId}`);
            }}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default MessagesPage;
