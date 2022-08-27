import React, { useCallback } from "react";
import { BodyWrapper } from "../components/BodyWrapper";
import { Button } from "../components/Button";
import { CenterLayout } from "../components/CenterLayout";
import { Footer } from "../components/Footer";
import { Wrapper } from "../components/Wrapper";
import { Codicon, FacebookIcon, InstagramIcon, TwitterIcon } from "../icons";
import { __prod__ } from "../lib/constants";

interface LoginProps {}

interface LoginButtonProps {
  children: [React.ReactNode, React.ReactNode];
  dev?: true;
  onClick?: () => void;
  oauthUrl?: string; // React.FC didn't like & ({ onClick: () => void } | { oauthUrl: string }) so yeah
}

const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  dev,
  oauthUrl,
  onClick,
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
        className="grid gap-4"
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

export const Login: React.FC<LoginProps> = () => {
  return (
    <CenterLayout>
      <Wrapper>
        <BodyWrapper>
          <div className={`my-8`}>
            <h3 className="text-primary-100">Swipe</h3>
          </div>
          <div className="flex m-auto  z-10 sm:w-400 w-full">
            <div className="flex p-6 flex-col m-auto sm:rounded-lg sm:w-1/2">
              <LoginButton>
                <InstagramIcon width={20} height={20} />
                Login with Instagram
              </LoginButton>
              <LoginButton>
                <FacebookIcon width={20} height={20} />
                Login with Facebook
              </LoginButton>
              <LoginButton>
                <TwitterIcon width={20} height={20} />
                Login with Twitter
              </LoginButton>
              {!__prod__ && (
                <LoginButton dev onClick={() => {}}>
                  <Codicon name="bug" width={20} height={20} />
                  Create test a user
                </LoginButton>
              )}
            </div>
          </div>
        </BodyWrapper>
      </Wrapper>
      <div className={`mb-6 px-5`}>
        <Footer isLogin />
      </div>
    </CenterLayout>
  );
};
