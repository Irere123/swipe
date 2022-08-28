import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { modalConfirm } from "../../components/ConfirmModal";
import { useTokenStore } from "../auth/useTokenStore";
import { User } from "../ws/types";
import { EditProfileModal } from "./EditProfileModal";

interface Props {
  user: User;
  isCurrentUser: boolean;
}

export const UserProfile: React.FC<Props> = ({ user, isCurrentUser }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col w-full h-full">
      <div className="sm:w-2/4 m-auto mt-3 flex flex-col gap-2">
        <img
          className="rounded-lg shadow-lg"
          width={300}
          height={220}
          src={user.avatarUrl}
        />
        <div className="flex gap-2">
          {isCurrentUser && (
            <>
              <Button onClick={() => setOpenEditModal(!openEditModal)}>
                Edit profile
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  modalConfirm("Are you sure you want to logout", () => {
                    useTokenStore
                      .getState()
                      .setTokens({ accessToken: "", refreshToken: "" });

                    navigate("/logout");
                  });
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
        <div>
          <p className="text-primary-100 text-xl">{user.displayName}</p>
          <p className="text-primary-100">{user.schoolName}</p>
          <p className="text-primary-200">{user.bio}</p>
        </div>
      </div>
      {openEditModal && (
        <EditProfileModal
          isOpen={openEditModal}
          onRequestClose={() => setOpenEditModal(!openEditModal)}
        />
      )}
    </div>
  );
};
