import React from "react";
import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../../../global-store/useTokenStore";
import { Button } from "../../components/Button";
import { modalPrompt } from "../../components/PromptModal";
import { apiBaseUrl, __prod__ } from "../../lib/constants";
import { BodyWrapper } from "../layouts/BodyWrapper";
import { CenterLayout } from "../layouts/CenterLayout";
import { Wrapper } from "../layouts/Wrapper";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

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
              {!__prod__ && (
                <Button
                  onClick={() =>
                    modalPrompt("Username", async (username) => {
                      if (!username) {
                        return;
                      }
                      const r = await fetch(
                        `${apiBaseUrl}/dev/test-info?username=` + username
                      );
                      const d = await r.json();
                      useTokenStore.getState().setTokens({
                        accessToken: d.accessToken,
                        refreshToken: d.refreshToken,
                      });

                      navigate("/");
                    })
                  }
                >
                  Create test user
                </Button>
              )}
            </div>
          </div>
        </BodyWrapper>
      </Wrapper>
    </CenterLayout>
  );
};
