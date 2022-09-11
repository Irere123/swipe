import React, { useCallback, useState } from "react";
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
import avatar from "../../../assets/avatar.jpg";
import { UserAvatar } from "../UserAvatar";
import { Button } from "../Button";
import { BoxedIcon } from "../BoxedIcon";

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
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const hasTokens = useTokenStore((v) => !!v.accessToken && !!v.refreshToken);
  const { push } = useHistory();

  return (
    <div className="flex gap-2">
      {openLogin && (
        <Modal
          isOpen={openLogin}
          onRequestClose={() => setOpenLogin(!openLogin)}
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
                setOpenLogin(!openLogin);
                push("/");
              }}
            >
              <SolidBug />
              Create a test user
            </LoginButton>
          </div>
        </Modal>
      )}
      {!hasTokens ? (
        <>
          <Button onClick={() => setOpenLogin(!openLogin)}>Login</Button>
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
            {/* <DropdownController
              zIndex={1000}
              className="top-9 right-3 md:right-0 fixed"
              innerClassName="fixed  transform -translate-x-full"
              overlay={(close) => (
                <ProfileDropdown
                  onActionButtonClicked={() => {}}
                  onCloseDropdown={close}
                  user={{ username: "di" }}
                />
              )}
            >
              <UserAvatar src={avatar} size="sm" />
            </DropdownController> */}
            <UserAvatar src={""} size="sm" />
          </div>
        </div>
      )}
    </div>
  );
};
