import React from "react";
import { Button } from "../../components/Button";
import { User } from "../ws/types";

interface Props {
  user: User;
  isCurrentUser: boolean;
}

export const UserProfile: React.FC<Props> = ({ user, isCurrentUser }) => {
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
              <Button>Edit profile</Button>
              <Button color="secondary">Logout</Button>
            </>
          )}
        </div>
        <div>
          <p className="text-primary-100 text-xl">{user.displayName}</p>
          <p className="text-primary-100">{user.schoolName}</p>
          <p className="text-primary-200">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};
