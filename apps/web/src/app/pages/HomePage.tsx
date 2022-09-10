import React from "react";
import { SolidCheck, SolidCross, SolidHeart } from "@swipe/ui/icons";
import { Text, BoxedIcon } from "@swipe/ui";
import avatar from "../../assets/avatar.jpg";
import { UserAvatar } from "../components/UserAvatar";
import { MainLayout } from "../modules/layouts/MainLayout";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-1 flex-col gap-3 w-full h-full mb-5">
        {Array.from([1, 2, 3, 45, 6]).map((_, idx) => (
          <div
            className="flex gap-2 border-b-2 border-b-primary-dark pb-4"
            key={idx}
          >
            <div className="flex gap-1">
              <div>
                <UserAvatar src={avatar} username="" size="md" />
              </div>
            </div>
            <div>
              <div>
                <Text variant="username">Bradly{idx + 1}</Text>
                <Text>Hy this my cool bio are you interested in me</Text>
              </div>
              <div className="flex gap-2">
                <div className="bg-accent-disabled w-300 h-400 mt-3 rounded-lg"></div>
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
