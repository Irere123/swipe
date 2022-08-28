import React, { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import { Head } from "../../components/Head";
import { useConn } from "../../shared-hooks/useConn";
import { useTypeSafeQuery } from "../../shared-hooks/useTypeSafeQuery";
import { UserProfile } from "./UserProfile";

interface Props extends PropsWithChildren {}

export const UserProfileController: React.FC<Props> = ({}) => {
  const me = useConn().user;
  const { username } = useParams() as any;
  const { data, isLoading } = useTypeSafeQuery(
    ["getUserProfile", username],
    {},
    [username]
  );

  if (isLoading) {
    return null;
  }
  const { user } = data as any;

  return (
    <>
      <Head title={user.username} />
      <UserProfile user={user} isCurrentUser={user.id === me.id} />
    </>
  );
};
