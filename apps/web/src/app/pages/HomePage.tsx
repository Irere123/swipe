import React, { useEffect, useState } from "react";
import { SolidCheck, SolidCross, SolidHeart } from "@swipe/ui/icons";
import { UserAvatar } from "../components/UserAvatar";
import { MainLayout } from "../modules/layouts/MainLayout";
import { Text } from "../components/Text";
import { BoxedIcon } from "../components/BoxedIcon";
import { apiBaseUrl } from "../constants";
import { BaseUser } from "../../types";

const HomePage: React.FC = () => {
  const [profiles, setProfiles] = useState<BaseUser[]>([]);
  useEffect(() => {
    fetch(`${apiBaseUrl}/feed`, {})
      .then((x) => x.json())
      .then((d) => {
        setProfiles(d.profiles);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <MainLayout>
      <div className="flex flex-1 flex-col gap-3 w-full h-full mb-5">
        {profiles.map((user) => (
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
                <Text>{user.displayName}</Text>
                <p className="w-300">{user.bio}</p>
              </div>
              <div className="flex gap-2">
                <img
                  className="bg-accent-disabled w-300 h-400 mt-3 rounded-lg"
                  src={user.avatarUrl}
                />
                <div className="flex flex-1 flex-col-reverse gap-3">
                  <BoxedIcon color="primary" circle>
                    <SolidCross />
                  </BoxedIcon>
                  <BoxedIcon color="primary" circle>
                    <SolidCheck />
                  </BoxedIcon>
                  <BoxedIcon color="primary" circle>
                    <SolidHeart />
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
