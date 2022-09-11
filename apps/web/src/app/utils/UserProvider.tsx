import React from "react";
import { useQuery } from "react-query";
import { BaseUser } from "../../types";

export const MeContext = React.createContext<{
  me: BaseUser | null;
  leaderboard: BaseUser[];
}>({
  leaderboard: [],
  me: null,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, isLoading } = useQuery<{
    user: BaseUser;
    leaderboard: BaseUser[];
  }>("/me", {});

  return (
    <MeContext.Provider
      value={{
        me: !isLoading ? data?.user! : null,
        leaderboard: !isLoading ? data?.leaderboard! : [],
      }}
    >
      {children}
    </MeContext.Provider>
  );
};
