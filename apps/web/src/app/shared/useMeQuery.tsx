import { useQuery } from "react-query";
import { User } from "../../@types/types";

export const useMeQuery = () => {
  const { data } = useQuery<{ user: User }>("/me", {
    enabled: true,
  });

  return {
    me: data?.user,
  };
};
