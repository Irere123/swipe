import React from "react";
import { BodyWrapper } from "../layouts/BodyWrapper";
import { CenterLayout } from "../layouts/CenterLayout";
import { Wrapper } from "../layouts/Wrapper";

export const LoginPage: React.FC = () => {
  return (
    <CenterLayout>
      <Wrapper>
        <BodyWrapper>
          <div className={`my-3`}>
            <h3 className="text-accent text-4xl font-extrabold">Swipe</h3>
          </div>
          <div
            className={`text-4xl text-center text-primary-200 mb-4 tracking-tight font-extrabold`}
          >
            BeReal Love.
          </div>
          <div className={`m-auto w-300`}>
            <div style={{ backgroundColor: "#333" }} onClick={() => {}}>
              <span className={`inline-flex items-center`}>
                <p className={`ml-3`}>H</p>
              </span>
            </div>
          </div>
        </BodyWrapper>
      </Wrapper>
    </CenterLayout>
  );
};
