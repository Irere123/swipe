import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { BaseUser } from "../../types";

type User = BaseUser | null;

export const MeContext = React.createContext<{
  me: User;
  leaderboard: BaseUser[];
  setMe: (me: BaseUser | null) => void;
}>({
  leaderboard: [],
  me: null,
  setMe: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const client = useQueryClient();
  const { data, isLoading } = useQuery<{
    user: BaseUser;
    leaderboard: BaseUser[];
  }>("/me", {});
  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <MeContext.Provider
      value={{
        me: data?.user!,
        leaderboard: data?.leaderboard!,
        setMe(me) {
          client.setQueryData<
            { user: BaseUser; leaderboard: BaseUser[] } | null | undefined
          >("/me", (x) =>
            !x
              ? x
              : {
                  ...x,
                  user: {
                    ...x.user,
                    me,
                  },
                }
          );
        },
      }}
    >
      {children}
    </MeContext.Provider>
  );
};
