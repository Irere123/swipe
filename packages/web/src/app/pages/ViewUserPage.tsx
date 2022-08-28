import React from "react";
import { MainLayout } from "../components/MainLayout";
import { WaitForWsConnect } from "../modules/auth/WaitForWsConnect";
import { UserProfileController } from "../modules/user/UserProfileController";

export const ViewUserPage: React.FC = () => {
  return (
    <WaitForWsConnect>
      <MainLayout>
        <UserProfileController />
      </MainLayout>
    </WaitForWsConnect>
  );
};
