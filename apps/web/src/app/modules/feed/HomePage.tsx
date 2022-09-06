import React from "react";
import { BoxedIcon } from "../../components/BoxedIcon";
import { UserAvatar } from "../../components/UserAvatar";
import { SvgSolidCheck, SvgSolidCross, SvgSolidHeart } from "../../icons";
import { useMeQuery } from "../../shared/useMeQuery";
import { BodyWrapper } from "../layouts/BodyWrapper";
import { DesktopNavbar } from "../layouts/DesktopNavbar";
import { Wrapper } from "../layouts/Wrapper";

export const HomePage: React.FC = () => {
  const { me } = useMeQuery();

  return (
    <div className="flex flex-col flex-1">
      <DesktopNavbar />
      <Wrapper>
        <BodyWrapper>
          <div className="flex flex-1 m-auto sm:w-24 py-3 h-full">
            <div className="flex flex-col rounded-lg w-full h-full bg-primary-800">
              <img
                className="flex flex-1 w-full rounded-t-lg"
                src={me?.avatarUrl}
                alt={me?.username}
              />
              <div className="px-3 h-[100px]">
                <h4 className="text-primary-200">Mira, 25</h4>
                <p className="text-primary-300">{me?.bio}</p>
              </div>
            </div>
          </div>
        </BodyWrapper>
      </Wrapper>
      <div className={`flex justify-center gap-2 sticky bottom-0 w-full h-7`}>
        <BoxedIcon>
          <SvgSolidCross />
        </BoxedIcon>
        <BoxedIcon circle>
          <SvgSolidHeart fill={"var(--color-accent)"} />
        </BoxedIcon>
        <BoxedIcon>
          <SvgSolidCheck />
        </BoxedIcon>
      </div>
    </div>
  );
};
