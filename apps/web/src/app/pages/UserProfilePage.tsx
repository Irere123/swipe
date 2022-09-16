import { SolidHeart } from "@swipe/ui";
import React, { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { useTokenStore } from "../../global-stores/useTokenStore";
import { BaseUser, Params } from "../../types";
import { Button } from "../components/Button";
import { modalConfirm } from "../components/ComfirmModal";
import { UserAvatar } from "../components/UserAvatar";
import { MainLayout } from "../modules/layouts/MainLayout";
import { MeContext } from "../utils/UserProvider";

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<Params>();
  const { push } = useHistory();
  const { me } = useContext(MeContext);
  const { data, isLoading } = useQuery<{ user: BaseUser }>(
    `/u/profile/${userId}`
  );
  const queryClient = useQueryClient();

  if (isLoading) {
    return null;
  }
  const { user } = data!;

  return (
    <MainLayout>
      <div className="flex gap-3 w-full justify-center ">
        <div>
          <UserAvatar
            src={user.avatarUrl!}
            username={user.username}
            isOnline={user.online}
          />
        </div>
        <div>
          <pre>{user.displayName}</pre>
          <p>@{user.username}</p>
          <p>{user.bio}</p>
          <div className="flex gap-3">
            {me?.id === user.id && (
              <>
                <Button
                  color="secondary"
                  onClick={() =>
                    modalConfirm("Are you sure want to logout", () => {
                      useTokenStore
                        .getState()
                        .setTokens({ accessToken: "", refreshToken: "" });
                      queryClient.setQueryData<
                        | { user: BaseUser | null; leaderboard: BaseUser[] }
                        | null
                        | undefined
                      >("/me", (x) =>
                        !x
                          ? x
                          : {
                              ...x,
                              user: null,
                            }
                      );
                      push("/");
                      push("/logout");
                    })
                  }
                >
                  Logout
                </Button>
                <Button onClick={() => push("/account-setup")}>
                  Edit profile
                </Button>
              </>
            )}
            <Button icon={<SolidHeart />}>{user.numLikes} Likes</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfilePage;
