import React, { useCallback } from "react";
import { BodyWrapper } from "../components/BodyWrapper";
import { Button } from "../components/Button";
import { CenterLayout } from "../components/CenterLayout";
import { Footer } from "../components/Footer";
import { Wrapper } from "../components/Wrapper";

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
    <button
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
    </button>
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

          <div className="flex m-auto flex-col p-6 gap-5 sm:rounded-lg z-10 sm:w-400 w-full">
            <Button>login with twitter</Button>
            <button className="bg-accent text-button py-3 hover:bg-accent-hover rounded">
              Login with Facebook
            </button>
            <button className="bg-accent text-button py-3 hover:bg-accent-hover rounded">
              Login with Twitter
            </button>
          </div>
        </BodyWrapper>
      </Wrapper>
      <div className={`mb-6 px-5`}>
        <Footer isLogin />
      </div>
    </CenterLayout>
  );
};
