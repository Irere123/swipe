import React, { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import { Head } from "../../components/Head";

interface Props extends PropsWithChildren {}

export const UserProfileController: React.FC<Props> = ({}) => {
  const { username } = useParams();

  return (
    <div>
      <Head title={username} />
      <p>Hello this {username}</p>
    </div>
  );
};
