import React from "react";
import { format } from "date-fns";
import { Tag } from "./Tag";

interface BoardUserCardProps {
  user: any;
}

export const BoardUserCard: React.FC<BoardUserCardProps> = ({ user }) => {
  return (
    <div className="flex w-full bg-primary-dark-2 p-3 rounded-md">
      <div>
        <img
          className="rounded-md"
          width={100}
          height={100}
          src={user.avatarUrl}
          alt={user.username}
        />
      </div>
      <div>
        <p>{user.displayName}</p>
        <p>{user.bio}</p>
        <div className="flex">
          <Tag>{user.numLikes} Likes</Tag>
          {user.gender && <Tag>{user.gender}</Tag>}
        </div>
      </div>
    </div>
  );
};
