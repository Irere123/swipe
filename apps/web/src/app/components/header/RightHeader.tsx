import React, { useCallback, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTokenStore } from "../../../global-stores/useTokenStore";
import { apiBaseUrl } from "../../constants";
import {
  SolidBug,
  SolidFacebook,
  SolidFriends,
  SolidGoogle,
  SolidMoreVert,
  SolidTwitter,
} from "@swipe/ui";
import { Modal } from "../Modal";
import { UserAvatar } from "../UserAvatar";
import { Button } from "../Button";
import { BoxedIcon } from "../BoxedIcon";
import { MeContext } from "../../utils/UserProvider";
import { useModalStore } from "../../../global-stores/useModalStore";

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
  const hasTokens = useTokenStore((v) => !!v.accessToken && !!v.refreshToken);
  const { push } = useHistory();
  const { me } = useContext(MeContext);
  const { openLoginModal, setOpenLoginModal } = useModalStore();

  return (
    <div className="flex gap-2">
      {openLoginModal && (
        <Modal
          isOpen={openLoginModal}
          onRequestClose={() => setOpenLoginModal(!openLoginModal)}
        >
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
              <SolidFacebook width={20} height={20} />
              Continue with Facebook
            </LoginButton>
            <LoginButton
              dev
              onClick={async () => {
                const name = window.prompt("Username");
                if (!name) {
                  return;
                }
                const r = await fetch(
                  `${apiBaseUrl}/dev/test-info?username=` + name
                );
                const d = await r.json();
                useTokenStore.getState().setTokens({
                  accessToken: d.accessToken,
                  refreshToken: d.refreshToken,
                });
                setOpenLoginModal(!openLoginModal);
                push("/");
              }}
            >
              <SolidBug />
              Create a test user
            </LoginButton>
          </div>
        </Modal>
      )}
      {!hasTokens && !me ? (
        <>
          <Button onClick={() => setOpenLoginModal(!openLoginModal)}>
            Login
          </Button>
          <BoxedIcon>
            <SolidMoreVert width={24} height={27} />
          </BoxedIcon>
        </>
      ) : (
        <div className="flex gap-3">
          <Link to={`/messages`}>
            <BoxedIcon>
              <SolidFriends />
            </BoxedIcon>
          </Link>
          <div>
            <Link to={`/u/${me?.id}`}>
              <UserAvatar src={me?.avatarUrl!} size="sm" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
