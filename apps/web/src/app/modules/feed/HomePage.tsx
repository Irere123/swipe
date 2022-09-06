import React from "react";
import { BoxedIcon } from "../../components/BoxedIcon";
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
          <div
            style={{
              gridTemplateColumns: "repeat(auto-fit, 90px)",
            }}
            className={`w-full grid gap-5 mb-24`}
          ></div>
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
