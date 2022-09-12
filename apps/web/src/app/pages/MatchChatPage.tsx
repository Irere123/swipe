import React from "react";
import { useParams } from "react-router-dom";
import avatar from "../../assets/avatar.jpg";
import { Params } from "../../types";
import { GridPanel } from "../components/GridPanels";
import { MainInnerGrid } from "../components/MainGrid";
import { ChatHeader } from "../modules/chat/ChatHeader";
import { ChatInput } from "../modules/chat/ChatInput";
import { MessagesController } from "../modules/chat/MessagesController";
import { LeftPanel } from "../modules/layouts/GridPanels";

const MatchChatPage: React.FC = () => {
  const { matchId } = useParams<Params>();

  return (
    <div className="flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700 ">
      <MainInnerGrid>
        <LeftPanel />
        <GridPanel>
          <ChatHeader matchId={matchId} />
          <div className="flex flex-1 w-full flex-col">
            <MessagesController
              matchId={matchId}
              user={{ avatarUrl: avatar, username: "Jenny", isOnline: true }}
            />
            <ChatInput />
          </div>
        </GridPanel>
      </MainInnerGrid>
    </div>
  );
};

export default MatchChatPage;
