import React from "react";
import { BodyWrapper } from "../components/BodyWrapper";
import { CenterLayout } from "../components/CenterLayout";
import { Head } from "../components/Head";
import { MainLayout } from "../components/MainLayout";
import { UserAvatar } from "../components/UserAvatar";
import { WaitForWsConnect } from "../modules/auth/WaitForWsConnect";

interface FeedPageProps {}

export const FeedPage: React.FC<FeedPageProps> = () => {
  return (
    <WaitForWsConnect>
      <CenterLayout>
        <Head title="Home" />
        <MainLayout>
          <div>
            <p>Hello world</p>
          </div>
        </MainLayout>
      </CenterLayout>
    </WaitForWsConnect>
  );
};
