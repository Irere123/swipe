import React from "react";
import { useLeaderboardQuery } from "../../generated/graphql";
import { MainLayout } from "../modules/layouts/MainLayout";

const LeaderBoard: React.FC = () => {
  const { data, loading } = useLeaderboardQuery();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <MainLayout>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </MainLayout>
  );
};

export default LeaderBoard;
