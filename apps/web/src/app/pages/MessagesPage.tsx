import React from "react";
import { useHistory } from "react-router-dom";
import avatar from "../../assets/avatar.jpg";
import { MessageUserCard } from "../components/MessageElements/MessageUserCard";
import { MainLayout } from "../modules/layouts/MainLayout";

const users = [
  { avatarUrl: avatar, username: "Alicia Mary", isOnline: true },
  { avatarUrl: avatar, username: "Kent Hooli", isOnline: false },
  { avatarUrl: avatar, username: "Musixcal", isOnline: true },
];

const MessagesPage: React.FC = () => {
  const { replace } = useHistory();
  return (
    <MainLayout>
      <div className="flex flex-col gap-3">
        <h4 className="font-bold">Messages</h4>
        {Array.from(users).map((u, idx) => (
          <MessageUserCard
            key={idx}
            avatarUrl={u.avatarUrl}
            isOnline={u.isOnline}
            username={u.username}
            onClick={() => {
              replace(`/messages/${3208923237}`);
            }}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default MessagesPage;
