import React, { useCallback, useState } from "react";
import { BoxedIcon } from "../BoxedIcon";
import { Button } from "../Button";
import {
  SolidBug,
  SolidGoogle,
  SolidMoreVert,
  SolidPlus,
  SolidTwitter,
} from "../icons";
import { Modal } from "../Modal";

interface LoginButtonProps {
  children: [React.ReactNode, React.ReactNode];
  dev?: true;
  onClick?: () => void;
  oauthUrl?: string; // React.FC didn't like & ({ onClick: () => void } | { oauthUrl: string }) so yeah
}

const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  onClick,
  oauthUrl,
  dev,
}) => {
  const clickHandler = useCallback(() => {
    window.location.href = oauthUrl as string;
  }, [oauthUrl]);

  return (
    <Button
      className="justify-center text-base py-3"
      color={!dev ? "primary" : "secondary"}
      onClick={oauthUrl ? clickHandler : onClick}
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

export const RightHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2">
      {open && (
        <Modal isOpen={open} onRequestClose={() => setOpen(!open)}>
          <h4 className="font-bold text-center mb-4">Login in to Swipe</h4>
          <div className="flex gap-3 flex-col w-full">
            <LoginButton>
              <SolidGoogle />
              Continue with Google
            </LoginButton>
            <LoginButton>
              <SolidTwitter width={18} height={18} />
              Continue with Twitter
            </LoginButton>
            <LoginButton>
              <SolidPlus />
              Continue with Facebook
            </LoginButton>
            <LoginButton dev>
              <SolidBug />
              Create a test user
            </LoginButton>
          </div>
        </Modal>
      )}
      <Button onClick={() => setOpen(!open)}>Login</Button>
      <BoxedIcon>
        <SolidMoreVert width={24} height={27} />
      </BoxedIcon>
    </div>
  );
};
