import React from "react";
import { Button } from "../../components/Button";
import { modalPrompt } from "../../components/PromptModal";
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
            <div className="flex flex-col gap-2 w-full">
              <Button color="secondary">Login with Instagram</Button>
              <Button color="secondary">Login with Facebook</Button>
              <Button onClick={() => modalPrompt("Username", () => {})}>
                Create test user
              </Button>
            </div>
          </div>
        </BodyWrapper>
      </Wrapper>
    </CenterLayout>
  );
};
