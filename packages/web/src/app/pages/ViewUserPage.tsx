import React from "react";
import { MainLayout } from "../components/MainLayout";
import { UserProfileController } from "../modules/user/UserProfileController";

export const ViewUserPage: React.FC = () => {
  return (
    <MainLayout>
      <UserProfileController />
    </MainLayout>
  );
};
