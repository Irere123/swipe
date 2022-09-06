import React from "react";
import { UserAvatar } from "../../components/UserAvatar";
import { useMeQuery } from "../../shared/useMeQuery";
import { BodyWrapper } from "../layouts/BodyWrapper";
import { DesktopNavbar } from "../layouts/DesktopNavbar";
import { Wrapper } from "../layouts/Wrapper";

export const MessagesPage: React.FC = () => {
  const { me } = useMeQuery();
  return (
    <div>
      <DesktopNavbar />
      <Wrapper>
        <BodyWrapper>
          <div className="flex flex-col justify-center gap-3 w-full mt-4">
            <p className="text-primary-200 font-bold text-2xl">Matches</p>
            {Array.from([1, 2, 3]).map(() => (
              <div className="flex gap-3">
                <div>
                  <UserAvatar
                    src={me?.avatarUrl!}
                    size="md"
                    username=""
                    isOnline={true}
                  />
                </div>
                <div className="text-primary-300">
                  <p className="text-primary-200 font-semibold capitalize">
                    {me?.username}
                  </p>
                  <p>Lorem ipsum dolor sit amet consectetur</p>
                </div>
              </div>
            ))}
          </div>
        </BodyWrapper>
      </Wrapper>
    </div>
  );
};
