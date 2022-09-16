import React, { useContext } from "react";
import { SolidCross, SolidHeart } from "@swipe/ui/icons";
import { UserAvatar } from "../components/UserAvatar";
import { MainLayout } from "../modules/layouts/MainLayout";
import { Text } from "../components/Text";
import { BoxedIcon } from "../components/BoxedIcon";
import { BaseUser } from "../../types";
import { MeContext } from "../utils/UserProvider";
import { useHistory } from "react-router-dom";
import { useTokenStore } from "../../global-stores/useTokenStore";
import { useModalStore } from "../../global-stores/useModalStore";
import { useQuery, useQueryClient } from "react-query";
import { mutation } from "../utils/mutation";

const HomePage: React.FC = () => {
  const queryClient = useQueryClient();
  const { me } = useContext(MeContext);
  const { setOpenLoginModal, openLoginModal } = useModalStore();
  const { push } = useHistory();
  const hasTokens = useTokenStore((v) => !!v.accessToken && !!v.accessToken);
  const { data } = useQuery<{ profiles: BaseUser[] }>("/feed");

  if (me && !me.hasLoggedIn) {
    push("/account-setup");
    return null;
  }

  const view = async (liked: boolean, userId: string) => {
    if (!hasTokens) {
      setOpenLoginModal(!openLoginModal);
      return;
    }
    await mutation("/api/view", { liked, userId }, { method: "POST" });

    queryClient.setQueryData<{ profiles: BaseUser[] } | undefined>(
      "/feed",
      (x) =>
        !x
          ? x
          : {
              ...x.profiles,
              profiles: x.profiles.filter((x) => x.id !== userId),
            }
    );
  };
  return (
    <MainLayout>
      <div className="flex flex-1 flex-col gap-3 w-full h-full mb-5">
        {data?.profiles.map((user) => (
          <div
            className="flex gap-2 border-b-2 border-b-primary-dark pb-4"
            key={user.id}
          >
            <div className="flex gap-1">
              <div>
                <UserAvatar
                  src={user.avatarUrl}
                  username={user.username}
                  size="md"
                />
              </div>
            </div>
            <div>
              <div>
                <Text
                  variant="username"
                  className="cursor-pointer"
                  onClick={() => push(`/u/${user.id}`)}
                >
                  {user.displayName}
                </Text>
                <p className="w-300">{user.bio}</p>
              </div>
              <div className="flex gap-2">
                <img
                  className="bg-accent-disabled w-300 h-400 mt-3 rounded-lg"
                  src={user.avatarUrl}
                />

                <div className="flex flex-1 flex-col-reverse gap-3">
                  <BoxedIcon
                    onClick={() => view(false, user.id)}
                    color="primary"
                    circle
                  >
                    <SolidCross fill="var(--color-secondary)" />
                  </BoxedIcon>
                  <BoxedIcon
                    onClick={() => view(true, user.id)}
                    color="primary"
                    circle
                  >
                    <SolidHeart fill="var(--color-accent)" />
                  </BoxedIcon>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default HomePage;
