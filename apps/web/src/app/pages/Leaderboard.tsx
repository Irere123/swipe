import React from "react";
import { useLeaderboardQuery } from "../../generated/graphql";
import { BoardUserCard } from "../components/BoardUserCard";
import { MainLayout } from "../modules/layouts/MainLayout";

const LeaderBoard: React.FC = () => {
  const { data, loading } = useLeaderboardQuery();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-3">
        {data?.leaderboard?.map((user) => (
          <BoardUserCard user={user} key={user?.id} />
        ))}
      </div>
    </MainLayout>
  );
};

export default LeaderBoard;
