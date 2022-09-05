import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../../../global-store/useTokenStore";
import { Button } from "../../components/Button";
import { modalPrompt } from "../../components/PromptModal";
import { SvgSolidFacebook, SvgSolidTwitter } from "../../icons";
import { apiBaseUrl, __prod__ } from "../../lib/constants";
import { BodyWrapper } from "../layouts/BodyWrapper";
import { CenterLayout } from "../layouts/CenterLayout";
import { Wrapper } from "../layouts/Wrapper";

interface LoginButtonProps {
  children: [React.ReactNode, React.ReactNode];
  dev?: true;
  onClick?: () => void;
  oauthUrl?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  onClick,
  oauthUrl,
  dev,
  ...props
}) => {
  const clickHandler = useCallback(() => {
    window.location.href = oauthUrl as string;
  }, [oauthUrl]);

  return (
    <Button
      className="justify-center text-base py-3 mt-2"
      color={dev ? "primary" : "secondary"}
      onClick={oauthUrl ? clickHandler : onClick}
      {...props}
    >
      <div
        className="grid gap-4 items-center"
        style={{
          gridTemplateColumns: "1fr auto 1fr",
        }}
      >
        {children[0]}
        {children[1]}
        <div />
      </div>
    </Button>
  );
};

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
              <LoginButton>
                <SvgSolidFacebook />
                Login with Facebook
              </LoginButton>
              <LoginButton>
                <SvgSolidTwitter width={20} height={20} />
                Login with Twitter
              </LoginButton>
              {!__prod__ && (
                <LoginButton
                  dev={true}
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
                  <SvgSolidFacebook />
                  Create test user
                </LoginButton>
              )}
            </div>
          </div>
        </BodyWrapper>
      </Wrapper>
    </CenterLayout>
  );
};
